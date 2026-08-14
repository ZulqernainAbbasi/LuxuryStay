import { Webhook } from "svix";
import User from "../models/user.js";
import connectDB from "../configs/db.js";

const clerkWebhooks = async (req, res) => {
    console.log("🔥 CLERK WEBHOOK RECEIVED");

    try {
        // ---------------------------------------
        // 1. CHECK WEBHOOK SECRET
        // ---------------------------------------
        if (!process.env.CLERK_WEBHOOK_SECRET) {
            throw new Error(
                "CLERK_WEBHOOK_SECRET is not configured"
            );
        }

        // ---------------------------------------
        // 2. CONNECT TO MONGODB
        // ---------------------------------------
        await connectDB();

        console.log("✅ MongoDB connected");

        // ---------------------------------------
        // 3. GET SVIX HEADERS
        // ---------------------------------------
        const svixId = req.headers["svix-id"];
        const svixTimestamp = req.headers["svix-timestamp"];
        const svixSignature = req.headers["svix-signature"];

        if (!svixId || !svixTimestamp || !svixSignature) {
            throw new Error(
                "Missing required Svix headers"
            );
        }

        console.log("✅ Svix headers received");

        // ---------------------------------------
        // 4. VERIFY CLERK WEBHOOK
        // ---------------------------------------
        const whook = new Webhook(
            process.env.CLERK_WEBHOOK_SECRET
        );

        const payload = whook.verify(
            req.body,
            {
                "svix-id": svixId,
                "svix-timestamp": svixTimestamp,
                "svix-signature": svixSignature
            }
        );

        console.log("✅ Webhook signature verified");

        // ---------------------------------------
        // 5. GET EVENT DATA
        // ---------------------------------------
        const { data, type } = payload;

        console.log("📩 EVENT TYPE:", type);
        console.log("👤 CLERK USER ID:", data?.id);

        if (!data?.id) {
            throw new Error(
                "Clerk user ID is missing"
            );
        }

        // ---------------------------------------
        // 6. CREATE USER DATA
        // ---------------------------------------

        const firstName = data.first_name || "";
        const lastName = data.last_name || "";

        const username =
            `${firstName} ${lastName}`.trim() ||
            data.username ||
            "Unknown User";

        const email =
            data.email_addresses?.find(
                (email) =>
                    email.id === data.primary_email_address_id
            )?.email_address ||
            data.email_addresses?.[0]?.email_address ||
            "";

        const userData = {
            _id: data.id,

            username,

            email,

            image:
                data.image_url ||
                data.profile_image_url ||
                "",

            recentSearchCities: []
        };

        console.log("👤 USER DATA:", userData);

        // ---------------------------------------
        // 7. HANDLE EVENTS
        // ---------------------------------------

        switch (type) {

            // -----------------------------------
            // USER CREATED
            // -----------------------------------
            case "user.created": {

                console.log("🟡 Creating user...");

                // Prevent duplicate webhook issues
                const existingUser = await User.findById(
                    data.id
                );

                if (existingUser) {
                    console.log(
                        "⚠️ User already exists:",
                        data.id
                    );

                    return res.status(200).json({
                        success: true,
                        message: "User already exists"
                    });
                }

                const newUser = await User.create(
                    userData
                );

                console.log(
                    "✅ USER CREATED:",
                    newUser._id
                );

                break;
            }

            // -----------------------------------
            // USER UPDATED
            // -----------------------------------
            case "user.updated": {

                console.log("🟡 Updating user...");

                const updatedUser =
                    await User.findByIdAndUpdate(
                        data.id,
                        {
                            username: userData.username,
                            email: userData.email,
                            image: userData.image
                        },
                        {
                            new: true,
                            runValidators: true
                        }
                    );

                if (!updatedUser) {

                    console.log(
                        "⚠️ User not found. Creating user..."
                    );

                    await User.create(userData);

                    console.log(
                        "✅ User created from update event"
                    );

                } else {

                    console.log(
                        "✅ USER UPDATED:",
                        updatedUser._id
                    );
                }

                break;
            }

            // -----------------------------------
            // USER DELETED
            // -----------------------------------
            case "user.deleted": {

                console.log("🟡 Deleting user...");

                const deletedUser =
                    await User.findByIdAndDelete(
                        data.id
                    );

                if (deletedUser) {

                    console.log(
                        "✅ USER DELETED:",
                        data.id
                    );

                } else {

                    console.log(
                        "⚠️ User was not found:",
                        data.id
                    );
                }

                break;
            }

            // -----------------------------------
            // OTHER EVENTS
            // -----------------------------------
            default:

                console.log(
                    "ℹ️ Unhandled Clerk event:",
                    type
                );

                break;
        }

        // ---------------------------------------
        // 8. SUCCESS RESPONSE
        // ---------------------------------------

        return res.status(200).json({
            success: true,
            message: "Webhook processed successfully"
        });

    } catch (error) {

        // ---------------------------------------
        // 9. DETAILED ERROR LOGGING
        // ---------------------------------------

        console.error(
            "❌ CLERK WEBHOOK ERROR"
        );

        console.error(
            "Error name:",
            error.name
        );

        console.error(
            "Error message:",
            error.message
        );

        console.error(
            "Error stack:",
            error.stack
        );

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export default clerkWebhooks;