import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <section className="main-container">{children}</section>;
};

export default Container;
