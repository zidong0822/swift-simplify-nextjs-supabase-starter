"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

//sign up with email and password
export async function signup(formData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
      headers: await headers(),
    });

    return { user: response.user, session: response };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "注册失败";
    return { error: errorMessage };
  }
}

//login with email and password
export async function login(formData: { email: string; password: string }) {
  try {
    const response = await auth.api.signInEmail({
      body: {
        email: formData.email,
        password: formData.password,
      },
      headers: await headers(),
    });

    return { user: response.user, session: response };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "登录失败";
    return { error: errorMessage };
  }
}

//logout and remove user
export async function logOut() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return { success: true };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "登出失败";
    return { error: errorMessage };
  }
}
