import { Webhook } from "svix";
import User from "../models/user.js";
import connectDB from "../configs/db.js";

const clerkWebhooks = async (req, res) => {

    console.log("🔥 CLERK WEBHOOK RECEIVED");

    try {

        // ---------------------------------------
        // CHECK SECRET
        // ---------------------------------------

        if (!process.env.CLERK_WEBHOOK_SECRET) {
            throw new Error(
                "CLERK_WEBHOOK_SECRET is missing"
            );
        }

        // ---------------------------------------
        // CONNECT DATABASE
        // ---------------------------------------

        await connectDB();

        console.log("✅ MongoDB connected");

        // ---------------------------------------
        // CHECK RAW BODY
        // ---------------------------------------

        if (!req.rawBody) {
            throw new Error(
                "Raw webhook body is missing"
            );
        }

        console.log(
            "✅ Raw body received:",
            req.rawBody.length,
            "bytes"
        );

        // ---------------------------------------
        // SVIX HEADERS
        // ---------------------------------------

        const svixId = req.headers["svix-id"];
        const svixTimestamp =
            req.headers["svix-timestamp"];
        const svixSignature =
            req.headers["svix-signature"];

        if (
            !svixId ||
            !svixTimestamp ||
            !svixSignature
        ) {
            throw new Error(
                "Missing required Svix headers"
            );
        }

        console.log("✅ Svix headers received");

        // ---------------------------------------
        // VERIFY WEBHOOK
        // ---------------------------------------

        const whook = new Webhook(
            process.env.CLERK_WEBHOOK_SECRET
        );

        const payload = whook.verify(
            req.rawBody,
            {
                "svix-id": svixId,
                "svix-timestamp": svixTimestamp,
                "svix-signature": svixSignature
            }
        );

        console.log(
            "✅ Webhook signature verified"
        );

        // ---------------------------------------
        // EVENT
        // ---------------------------------------

        const { data, type } = payload;

        console.log(
            "📩 EVENT TYPE:",
            type
        );

        console.log(
            "👤 CLERK USER:",
            data.id
        );

        // ---------------------------------------
        // USER DATA
        // ---------------------------------------

        const firstName =
            data.first_name || "";

        const lastName =
            data.last_name || "";

        const username =
            `${firstName} ${lastName}`.trim() ||
            data.username ||
            "Unknown User";

        const email =
            data.email_addresses?.find(
                email =>
                    email.id ===
                    data.primary_email_address_id
            )?.email_address ||
            data.email_addresses?.[0]
                ?.email_address ||
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

        console.log(
            "👤 USER DATA:",
            userData
        );

        // ---------------------------------------
        // HANDLE EVENTS
        // ---------------------------------------

        switch (type) {

            case "user.created": {

                console.log(
                    "🟡 Creating user..."
                );

                const existingUser =
                    await User.findById(data.id);

                if (existingUser) {

                    console.log(
                        "⚠️ User already exists"
                    );

                    break;
                }

                const newUser =
                    await User.create(userData);

                console.log(
                    "✅ USER CREATED:",
                    newUser._id
                );

                break;
            }

            case "user.updated": {

                console.log(
                    "🟡 Updating user..."
                );

                const updatedUser =
                    await User.findByIdAndUpdate(
                        data.id,
                        {
                            username:
                                userData.username,

                            email:
                                userData.email,

                            image:
                                userData.image
                        },
                        {
                            new: true,
                            runValidators: true
                        }
                    );

                if (!updatedUser) {

                    await User.create(
                        userData
                    );

                    console.log(
                        "✅ User created from update"
                    );

                } else {

                    console.log(
                        "✅ USER UPDATED:",
                        updatedUser._id
                    );
                }

                break;
            }

            case "user.deleted": {

                console.log(
                    "🟡 Deleting user..."
                );

                await User.findByIdAndDelete(
                    data.id
                );

                console.log(
                    "✅ USER DELETED"
                );

                break;
            }

            default:

                console.log(
                    "ℹ️ Unhandled event:",
                    type
                );
        }

        return res.status(200).json({
            success: true,
            message:
                "Webhook processed successfully"
        });

    } catch (error) {

        console.error(
            "❌ CLERK WEBHOOK ERROR"
        );

        console.error(
            "Name:",
            error.name
        );

        console.error(
            "Message:",
            error.message
        );

        console.error(
            "Stack:",
            error.stack
        );

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export default clerkWebhooks;