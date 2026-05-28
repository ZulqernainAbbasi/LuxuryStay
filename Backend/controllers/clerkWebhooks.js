import User from "../models/user.js";
import connectDB from "../configs/db.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {

    try {

        // CONNECT DATABASE
        await connectDB();

        // CREATE WEBHOOK
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // HEADERS
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        // VERIFY WEBHOOK
        await whook.verify(JSON.stringify(req.body), headers);

        // GET DATA
        const { data, type } = req.body;

        // USER DATA
        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: `${data.first_name || ""} ${data.last_name || ""}`,
            image: data.image_url
        };

        // EVENTS
        switch (type) {

            case "user.created":
                await User.create(userData);
                console.log("User Created");
                break;

            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData);
                console.log("User Updated");
                break;

            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                console.log("User Deleted");
                break;

            default:
                console.log("Unhandled Event");
                break;
        }

        return res.status(200).json({
            success: true,
            message: "Webhook Received"
        });

    } catch (error) {

        console.log("CLERK WEBHOOK ERROR:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export default clerkWebhooks;