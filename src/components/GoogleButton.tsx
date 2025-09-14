"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export const GoogleButton = () => {
  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: "/dashboard",
    });
  };
  return (
    <div className="flex items-center w-full container ">
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-full gap-x-4 py-5 "
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-5 h-5" />

        <span className="ml-2 text-slate-500">Continue with Google</span>
      </Button>
    </div>
  );
};
