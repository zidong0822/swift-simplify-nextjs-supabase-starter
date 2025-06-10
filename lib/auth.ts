import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { Resend } from "resend";
import { nextCookies } from "better-auth/next-js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000/api/auth",
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "your-secret-key-here-minimum-32-characters-long",
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailVerification: {
    sendVerificationEmail: async (data) => {
      const { user, url } = data;
      console.log(data, process.env.EMAIL_FROM);
      const { error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || "noreply@yourdomain.com",
        to: [user.email],
        subject: "验证您的邮箱地址",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">验证您的邮箱地址</h1>
            <p style="color: #666; font-size: 16px;">
              感谢您注册我们的服务。请点击下面的按钮来验证您的邮箱地址：
            </p>
            <a 
              href="${url}" 
              style="
                display: inline-block;
                background-color: #007bff;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
                margin: 20px 0;
              "
            >
              验证邮箱地址
            </a>
            <p style="color: #999; font-size: 14px;">
              如果您无法点击按钮，请复制以下链接到浏览器地址栏：<br>
              <span style="word-break: break-all;">${url}</span>
            </p>
            <p style="color: #999; font-size: 14px;">
              如果您没有注册账户，请忽略此邮件。
            </p>
          </div>
        `,
      });

      if (error) {
        console.error("邮件发送失败:", error);
        throw new Error("邮件发送失败");
      }
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async (data) => {
        const { newEmail, url } = data;
        console.log(data, process.env.EMAIL_FROM);
        const { error } = await resend.emails.send({
          from: process.env.EMAIL_FROM || "noreply@yourdomain.com",
          to: [newEmail],
          subject: "确认邮箱地址变更",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #333;">确认邮箱地址变更</h1>
              <p style="color: #666; font-size: 16px;">
                您请求将邮箱地址更改为 ${newEmail}。请点击下面的按钮确认此更改：
              </p>
              <a 
                href="${url}" 
                style="
                  display: inline-block;
                  background-color: #28a745;
                  color: white;
                  padding: 12px 24px;
                  text-decoration: none;
                  border-radius: 6px;
                  font-weight: bold;
                  margin: 20px 0;
                "
              >
                确认邮箱变更
              </a>
              <p style="color: #999; font-size: 14px;">
                如果您没有请求此更改，请忽略此邮件。
              </p>
            </div>
          `,
        });

        if (error) {
          console.error("邮件发送失败:", error);
          throw new Error("邮件发送失败");
        }
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7天
    updateAge: 60 * 60 * 24, // 1天
  },
  plugins: [nextCookies()],
});
