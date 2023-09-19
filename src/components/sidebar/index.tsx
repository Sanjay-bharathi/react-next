import React from "react";
import Image from "next/image";
import Logo from "../../assets/logo.png";
import { Nav, Profile } from "./utils";

const Sidebar = () => {
  return (
    <section className="sidebar-container">
      <Image src={Logo} alt="logo" className="logo" />
      <Profile />
      <Nav />
    </section>
  );
};

export default Sidebar;
