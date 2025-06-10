"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "姓名至少需要2个字符" })
    .max(50, { message: "姓名不能超过50个字符" }),

  email: z.string().email({ message: "邮箱格式无效" }),

  password: z
    .string()
    .min(8, { message: "密码至少需要8个字符" })
    .regex(/[A-Z]/, {
      message: "密码必须包含至少一个大写字母",
    })
    .regex(/\d/, { message: "密码必须包含至少一个数字" })
    .regex(/[\W_]/, {
      message: "密码必须包含至少一个特殊字符",
    }),
});

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    startTransition(async () => {
      try {
        const { error } = await authClient.signUp.email({
          email: values.email,
          password: values.password,
          name: values.name,
        });

        if (error) {
          toast.error("注册失败：" + error.message);
          return;
        }

        toast.success("注册成功！请检查您的邮箱以验证账户。");
        router.push("/login");
      } catch {
        toast.error("注册时发生错误，请稍后重试。");
      }
    });
  }

  async function handleSocialSignup(provider: "google" | "github") {
    startTransition(async () => {
      try {
        await authClient.signIn.social({
          provider,
        });
      } catch {
        toast.error(`${provider} 注册失败`);
      }
    });
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            type="button" 
            disabled={isPending}
            onClick={() => handleSocialSignup("google")}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Google 注册
          </Button>
          <Button 
            variant="outline" 
            type="button" 
            disabled={isPending}
            onClick={() => handleSocialSignup("github")}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            GitHub 注册
          </Button>
        </div>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>姓名</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="请输入您的姓名"
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
                        placeholder="请输入密码"
                        type="password"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="mt-8 w-full" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center justify-center gap-1">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  <span>注册中...</span>
                </div>
              ) : (
                "创建账户"
              )}
            </Button>
          </form>
        </Form>
      </div>
      <div className="text-center">
        <Link href="/login" className="w-full">
          <Button variant="outline" className="w-full">
            返回登录
          </Button>
        </Link>
      </div>
    </div>
  );
}
