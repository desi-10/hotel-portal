import React from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type OTP = {
  value: string;
  onChange: (value: string) => void;
};

export default function InputOTPWithSeparator({ value, onChange }: OTP) {
  return (
    <InputOTP
      maxLength={6}
      value={value}
      onChange={onChange}
      className="w-full"
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} className="border border-gray-400" />
        <InputOTPSlot index={1} className="border border-gray-400" />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} className="border border-gray-400" />
        <InputOTPSlot index={3} className="border border-gray-400" />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} className="border border-gray-400" />
        <InputOTPSlot index={5} className="border border-gray-400" />
      </InputOTPGroup>
    </InputOTP>
  );
}
