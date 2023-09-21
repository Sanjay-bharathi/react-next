import React from "react";
import { Dropdown, Image, Space, Typography } from "antd";
import type { MenuProps } from "antd";
import {
  AppstoreAddOutlined,
  CaretDownOutlined,
  CreditCardOutlined,
  LinkOutlined,
  PieChartOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../assets/logo.png";

const { Text } = Typography;

interface Routes {
  key: string;
  label: string;
  link: string;
  icon: React.JSX.Element;
}

const items: MenuProps["items"] = [
  { key: "1", label: "Profile" },
  { key: "2", label: "Settings" },
  { key: "3", label: "Logout" },
];

export const Profile = (): React.ReactElement => {
  const profile =
    "https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg?w=740";
  return (
    <div className="profile-section">
      <Image loading="lazy" preview width={100} height={100} src={profile} />
      <Dropdown
        menu={{
          items,
          selectable: true,
        }}
        trigger={["click"]}
      >
        <Text>
          <Space color="white">
            Sanjay Bharathi
            <CaretDownOutlined />
          </Space>
        </Text>
      </Dropdown>
      <Text className="light-secondary">
        <small>sanjaybharathi.p@gmail.com</small>
      </Text>
    </div>
  );
};

export const Nav = (): React.ReactElement => {
  const routes: Routes[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      link: "/",
      icon: <PieChartOutlined />,
    },
    {
      key: "Employee",
      label: "Employee",
      link: "/employee",
      icon: <UsergroupAddOutlined />,
    },
    {
      key: "start-app",
      label: "Start App",
      link: "/start-app",
      icon: <AppstoreAddOutlined />,
    },
    {
      key: "app-list",
      label: "App List",
      link: "/app-list",
      icon: <CreditCardOutlined />,
    },
    {
      key: "create-link",
      label: "Create Link",
      link: "/create-link",
      icon: <LinkOutlined />,
    },
  ];

  const pathname = usePathname();
  return (
    <nav className="nav">
      {routes.map((route) => (
        <li key={route.key} className={pathname == route.link ? "active" : ""}>
          <Link href={route.link}>
            {route.icon}
            {route.label}
          </Link>
        </li>
      ))}
    </nav>
  );
};
