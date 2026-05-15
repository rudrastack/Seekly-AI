import userModel from '../models/user.model.js';
import { sendEmail } from '../services/mail.service.js';

export async function register(req, res) {
    const { email, username, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ $or: [{ email }, { username }] });

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: 'User with this email or username already exists',
            success: false,
            err: "User already exists"
        });
    }

    const user = await userModel.create({ email, username, password });

    // await sendEmail({
    //     to: email,
    //     subject: 'Welcome to Seekly AI',
    //     text: `Hi ${username},\n\nThank you for registering at Seekly AI! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out.\n\nBest regards,\nThe Seekly AI Team`,
    //     html: `<p>Hi ${username},</p><p>Thank you for registering at Seekly AI! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out.</p><p>Best regards,<br>The Seekly AI Team</p>`
    // });

    await sendEmail({
        to: email,
        subject: "Welcome to SeeklyAI 🚀",

        text: `Hi ${username},

    Thanks for joining SeeklyAI.

    We're excited to have you here and can't wait for you to start exploring and saving ideas that matter to you.

    If you ever have questions or feedback, just reply to this email.

    — Team SeeklyAI`,

        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; color: #333;">

            <p>Hi <strong>${username}</strong>,</p>

            <p>
                Thanks for joining <strong>SeeklyAI</strong>.
            </p>

            <p>
                We're excited to have you here and can't wait for you to start exploring and saving ideas that matter to you.
            </p>

            <p>
                If you ever have questions or feedback, just reply to this email.
            </p>

            <p style="margin-top: 24px;">
                - Team SeeklyAI
            </p>

        </div>
    `

    });



    return res.status(201).json({
        message: 'User registered successfully',
        success: true,
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
        }
    });



}

