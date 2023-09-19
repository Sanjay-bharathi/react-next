import React, { PropsWithChildren } from "react";

const MobileView = ({ children }: PropsWithChildren) => {
  return (
    <section className="mobile-view">
      <section className="mobile-wrapper">{children}</section>
    </section>
  );
};

export default MobileView;
