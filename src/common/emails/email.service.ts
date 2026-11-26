import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import {
    loginSuccessTemplate,
    notificationTemplate,
    otpTemplate,
    LoginSuccessData,
    NotificationData,
    OtpData,
} from "./emails.templete"

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    private readonly from = `"${process.env.PROJECT_NAME}" <${process.env.EMAIL_USER}>`;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    private async send(
        to: string,
        subject: string,
        html: string,
    ): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: this.from,
                to,
                subject,
                html,
            });
        } catch (err) {
            console.error("Email sending error:", err);
            throw new InternalServerErrorException("Unable to send email");
        }
    }

    async sendLoginSuccessEmail(data: LoginSuccessData): Promise<void> {
        await this.send(
            data.email,
            "Login Successful",
            loginSuccessTemplate(data),
        );
    }

    async sendNotificationEmail(
        to: string,
        data: NotificationData,
    ): Promise<void> {
        await this.send(
            to,
            data.title,
            notificationTemplate(data),
        );
    }

    async sendOtpEmail(
        to: string,
        data: OtpData,
    ): Promise<void> {
        await this.send(
            to,
            "Email Verification Code",
            otpTemplate(data),
        );
    }
}