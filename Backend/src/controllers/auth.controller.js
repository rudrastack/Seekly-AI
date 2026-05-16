import express from 'express';
import userModel from '../models/user.model.js';
import { sendEmail } from '../services/mail.service.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { compare } from 'bcrypt';

dotenv.config();



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
    const verifyEmailToken = jwt.sign({
        email: user.email
    },
        process.env.JWT_SECRET);

    await sendEmail({
        to: email,
        subject: "Welcome to SeeklyAI 🚀",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; color: #333;">

            <p>Hi <strong>${username}</strong>,</p>

            <p>Thanks for joining <strong>SeeklyAI</strong>.</p>

            <p> We're excited to have you here and can't wait for you to start exploring and saving ideas that matter to you.</p>

           <p>Please verify your email by clicking the link below:</p>
            <a href="http://localhost:3000/api/auth/verify-email?token=${verifyEmailToken}">Verify Email</a>

            <p style="margin-top: 24px;">
                  Best regards,
                  Team SeeklyAI
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

export async function login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: 'User not found',
            success: false,
            err: "User not found"
        });
    }
    const isPasswordMatch = await user.comparePassword(password);


    if (!isPasswordMatch) {
        return res.status(400).json({
            message: 'Invalid password',
            success: false,
            err: "Invalid password"
        });
    }

    if (!user.verified) {
        return res.status(400).json({
            message: 'Email not verified',
            success: false,
            err: "Email not verified"
        });
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token);

    return res.status(200).json({
        message: 'User logged in successfully',
        success: true,
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
        }
    })

}

export async function getMe(req, res) {
   
    const userId = req.user.id;

    const user = await userModel.findById(req.user.id).select('-password');

    if (!user) {
        return res.status(404).json({
            message: 'User not found',
            success: false,
            err: "User not found"
        });
    }

    return res.status(200).json({
        message: 'User fetched successfully',
        success: true,
        user
    });
}

export async function verifyEmail(req, res) {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid token',
                success: false,
                err: "Invalid token"
            });
        }

        user.verified = true;
        await user.save();

        const html = `
    <h1>Email Verified Successfully</h1>
    <p>Hi <strong>${user.username}</strong>,</p>
    <p>Your email has been verified successfully. You can now log in to your account and start using SeeklyAI.</p>
    <a href="http://localhost:3000/login">Go to Login</a>
    `;
        res.send(html);
    }
    catch (err) {
        return res.status(400).json({
            message: 'Invalid or expired token',
            success: false,
            err: "Invalid or expired token"
        });
    }
}
