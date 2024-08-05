import React from "react";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <main className="container py-10">{children}</main>;
}

export default Wrapper;
