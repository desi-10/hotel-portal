import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default AuthLayout;
