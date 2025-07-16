import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { Resend } from "resend";
import { nextCookies } from "better-auth/next-js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000/api/auth",
  secret: process.env.BETTER_AUTH_SECRET || "",
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
        subject: "Verify Your Email Address",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Verify Your Email Address</h1>
            <p style="color: #666; font-size: 16px;">
              Thank you for registering with our service. Please click the button below to verify your email address:
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
              Verify Email Address
            </a>
            <p style="color: #999; font-size: 14px;">
              If you cannot click the button, please copy the following link to your browser's address bar:<br>
              <span style="word-break: break-all;">${url}</span>
            </p>
            <p style="color: #999; font-size: 14px;">
              If you did not create an account, please ignore this email.
            </p>
          </div>
        `,
      });

      if (error) {
        console.error("Email sending failed:", error);
        throw new Error("Email sending failed");
      }
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    github: {
      clientId: process.env.CLIENT_ID_GITHUB as string,
      clientSecret: process.env.CLIENT_SECRET_GITHUB as string,
    },
    google: {
      clientId: process.env.CLIENT_ID_GOOGLE as string,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE as string,
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
          subject: "Confirm Email Address Change",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #333;">Confirm Email Address Change</h1>
              <p style="color: #666; font-size: 16px;">
                You have requested to change your email address to ${newEmail}. Please click the button below to confirm this change:
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
                Confirm Email Change
              </a>
              <p style="color: #999; font-size: 14px;">
                If you did not request this change, please ignore this email.
              </p>
            </div>
          `,
        });

        if (error) {
          console.error("Email sending failed:", error);
          throw new Error("Email sending failed");
        }
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(), // 使用 crypto.randomUUID() 生成 ID
    },
  },
  plugins: [nextCookies()],
});
