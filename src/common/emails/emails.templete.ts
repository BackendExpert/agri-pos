
const PROJECT_NAME = process.env.PROJECT_NAME!;

export interface LoginSuccessData {
    name: string;
    email: string;
    loginTime: string;
}

export const loginSuccessTemplate = (data: LoginSuccessData): string => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:35px 15px;background:#edf2ef;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:620px;margin:auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 15px 45px rgba(16,47,43,.1);">
    <div style="padding:40px;background:linear-gradient(135deg,#092e29,#17634f);">
        <div style="color:#a7f3d0;font-size:12px;font-weight:bold;letter-spacing:3px;">${PROJECT_NAME.toUpperCase()}</div>
        <div style="color:#fff;font-size:29px;font-weight:bold;margin-top:25px;">Login Successful</div>
        <div style="color:#c2ded4;font-size:14px;margin-top:10px;">Your account has been accessed successfully.</div>
    </div>
    <div style="padding:40px;">
        <div style="font-size:48px;">✅</div>
        <h2 style="color:#173b34;font-size:23px;margin:20px 0 10px;">Welcome back, ${data.name}!</h2>
        <p style="color:#64748b;font-size:14px;line-height:1.8;">You have successfully signed in to your account. Here are your login details.</p>
        <div style="margin-top:28px;padding:22px;background:#f4f8f6;border:1px solid #e3eee8;border-radius:14px;">
            <div style="color:#16836a;font-size:11px;font-weight:bold;letter-spacing:2px;margin-bottom:20px;">LOGIN INFORMATION</div>
            <div style="padding-bottom:17px;border-bottom:1px solid #e1eae5;">
                <div style="color:#94a3b8;font-size:12px;margin-bottom:7px;">📧 EMAIL ADDRESS</div>
                <div style="color:#173b34;font-size:14px;font-weight:bold;">${data.email}</div>
            </div>
            <div style="padding-top:17px;">
                <div style="color:#94a3b8;font-size:12px;margin-bottom:7px;">🕒 LOGIN TIME</div>
                <div style="color:#173b34;font-size:14px;font-weight:bold;">${data.loginTime}</div>
            </div>
        </div>
        <div style="margin-top:25px;padding:18px;background:#fff8eb;border-radius:12px;">
            <div style="color:#92400e;font-size:14px;font-weight:bold;">🛡️ Security Alert</div>
            <p style="color:#92400e;font-size:13px;line-height:1.7;margin-bottom:0;">If you don't recognize this login activity, please change your password immediately.</p>
        </div>
    </div>
    <div style="padding:25px;text-align:center;background:#f4f8f6;">
        <div style="color:#173b34;font-size:14px;font-weight:bold;">${PROJECT_NAME}</div>
        <div style="color:#94a3b8;font-size:11px;margin-top:10px;">© ${new Date().getFullYear()} All rights reserved.</div>
        <div style="color:#94a3b8;font-size:11px;margin-top:6px;">Automated email. Please do not reply.</div>
    </div>
</div>
</body>
</html>
`;

export interface NotificationData {
    name: string;
    title: string;
    message: string;
    date: string;
}

export const notificationTemplate = (data: NotificationData): string => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:35px 15px;background:#edf2ef;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:620px;margin:auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 15px 45px rgba(16,47,43,.1);">
    <div style="padding:40px;background:linear-gradient(135deg,#092e29,#17634f);">
        <div style="color:#a7f3d0;font-size:12px;font-weight:bold;letter-spacing:3px;">${PROJECT_NAME.toUpperCase()}</div>
        <div style="color:#fff;font-size:29px;font-weight:bold;margin-top:25px;">New Notification</div>
        <div style="color:#c2ded4;font-size:14px;margin-top:10px;">You have an important update.</div>
    </div>
    <div style="padding:40px;">
        <div style="font-size:48px;">🔔</div>
        <h2 style="color:#173b34;font-size:23px;margin:20px 0 10px;">Hello, ${data.name}!</h2>
        <p style="color:#64748b;font-size:14px;line-height:1.8;">We have a new notification for you.</p>
        <div style="margin-top:28px;padding:25px;background:#f4f8f6;border:1px solid #e3eee8;border-radius:14px;">
            <div style="color:#16836a;font-size:11px;font-weight:bold;letter-spacing:2px;margin-bottom:15px;">📢 NOTIFICATION</div>
            <h2 style="color:#173b34;font-size:21px;margin:0 0 15px;">${data.title}</h2>
            <p style="color:#64748b;font-size:14px;line-height:1.9;margin:0;">${data.message}</p>
        </div>
        <div style="margin-top:22px;color:#94a3b8;font-size:12px;">🕒 ${data.date}</div>
    </div>
    <div style="padding:25px;text-align:center;background:#f4f8f6;">
        <div style="color:#173b34;font-size:14px;font-weight:bold;">${PROJECT_NAME}</div>
        <div style="color:#94a3b8;font-size:11px;margin-top:10px;">© ${new Date().getFullYear()} All rights reserved.</div>
        <div style="color:#94a3b8;font-size:11px;margin-top:6px;">Automated email. Please do not reply.</div>
    </div>
</div>
</body>
</html>
`;

export interface OtpData {
    name: string;
    otp: string;
    expiresIn: string;
}

export const otpTemplate = (data: OtpData): string => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:35px 15px;background:#edf2ef;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:620px;margin:auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 15px 45px rgba(16,47,43,.1);">
    <div style="padding:40px;background:linear-gradient(135deg,#092e29,#17634f);">
        <div style="color:#a7f3d0;font-size:12px;font-weight:bold;letter-spacing:3px;">${PROJECT_NAME.toUpperCase()}</div>
        <div style="color:#fff;font-size:29px;font-weight:bold;margin-top:25px;">Email Verification</div>
        <div style="color:#c2ded4;font-size:14px;margin-top:10px;">Your security code is ready.</div>
    </div>
    <div style="padding:40px;">
        <div style="font-size:48px;">🔐</div>
        <h2 style="color:#173b34;font-size:23px;margin:20px 0 10px;">Hello, ${data.name}!</h2>
        <p style="color:#64748b;font-size:14px;line-height:1.8;">Use the verification code below to continue. This code is private and should never be shared.</p>
        <div style="margin:30px 0;padding:32px 15px;text-align:center;background:#f0f8f4;border:1px solid #d5e9df;border-radius:16px;">
            <div style="color:#16836a;font-size:11px;font-weight:bold;letter-spacing:3px;">YOUR ONE-TIME PASSWORD</div>
            <div style="color:#123b35;font-size:38px;font-weight:bold;letter-spacing:10px;margin:22px 0;">${data.otp}</div>
            <div style="color:#64748b;font-size:13px;">⏳ Expires in <strong>${data.expiresIn}</strong></div>
        </div>
        <div style="padding:20px;background:#fff8eb;border-radius:12px;">
            <div style="color:#92400e;font-size:14px;font-weight:bold;">⚠️ Important Security Notice</div>
            <p style="color:#92400e;font-size:13px;line-height:1.8;margin-bottom:0;">Never share your verification code with anyone. Our team will never ask you for this code. If you did not request it, you can safely ignore this email.</p>
        </div>
    </div>
    <div style="padding:25px;text-align:center;background:#f4f8f6;">
        <div style="color:#173b34;font-size:14px;font-weight:bold;">${PROJECT_NAME}</div>
        <div style="color:#94a3b8;font-size:11px;margin-top:10px;">© ${new Date().getFullYear()} All rights reserved.</div>
        <div style="color:#94a3b8;font-size:11px;margin-top:6px;">Automated email. Please do not reply.</div>
    </div>
</div>
</body>
</html>
`;
