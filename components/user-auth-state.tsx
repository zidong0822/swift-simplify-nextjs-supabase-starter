"use client";

import { useAuth } from "@/lib/auth-context";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Icons } from "@/components/ui/icons";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function UserAuthState() {
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  async function removeUser() {
    startTransition(async () => {
      try {
        await authClient.signOut();
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success("您已成功登出！");
      } catch (error) {
        console.error("登出失败:", error);
        toast.error("登出时发生错误！");
      }
    });
  }

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger disabled={isPending}>
            <Avatar className="relative">
              {isPending && (
                <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center bg-slate-400">
                  <Icons.spinner className="h-4 w-4 animate-spin" />
                </div>
              )}
              <AvatarImage
                src={user?.image || ""}
                alt="User Avatar"
              />
              <AvatarFallback>
                {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>我的账户</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/dashboard"}>仪表板</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={removeUser} disabled={isPending}>
                {isPending ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "登出"
                )}
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={"/login"}>
          <Button disabled={isPending}>
            {isPending ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "登录"
            )}
          </Button>
        </Link>
      )}
    </div>
  );
}
