"use client";

import { useTransition } from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const loginSchema = z.object({
  email: z
    .string({ required_error: "邮箱是必填项" })
    .email({ message: "邮箱格式无效" })
    .min(5),
  password: z
    .string()
    .min(8, { message: "密码至少需要8个字符" })
    .regex(/\d/, { message: "密码必须包含至少一个数字" }),
});

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectTo = searchParams.get("redirect") || "/";

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      try {
        const { error } = await authClient.signIn.email({
          email: values.email,
          password: values.password,
        });

        if (error) {
          toast.error("登录失败：" + error.message);
          return;
        }

        router.push(redirectTo);
        toast.success("欢迎回来！");
      } catch {
        toast.error("登录时发生错误");
      }
    });
  }

  async function handleSocialLogin(provider: "google" | "github") {
    startTransition(async () => {
      try {
        await authClient.signIn.social({
          provider,
          callbackURL: redirectTo,
        });
      } catch {
        toast.error(`${provider} 登录失败`);
      }
    });
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邮箱</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@mail.com"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密码</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="密码"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full mt-8" disabled={isPending}>
            {isPending ? (
              <div className="flex items-center justify-center gap-1">
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                <span>验证中...</span>
              </div>
            ) : (
              "立即登录"
            )}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">或</span>
        </div>
      </div>
      <Button variant="outline" asChild>
        <Link href="/register">创建账户</Link>
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            社交登录
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Button 
          variant="outline" 
          disabled={isPending}
          onClick={() => handleSocialLogin("google")}
        >
          {isPending ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
        <Button 
          variant="outline" 
          disabled={isPending}
          onClick={() => handleSocialLogin("github")}
        >
          {isPending ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          GitHub
        </Button>
      </div>
    </div>
  );
}
