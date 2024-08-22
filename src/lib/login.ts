"use server";

import { signIn } from "@/auth";

export const login = async (phonenumber: string, OTPValue: string) => {
  const result = await signIn("credentials", { phonenumber, OTPValue });

  console.log(result);

  return result;
};
