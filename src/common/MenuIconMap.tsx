// 映射菜单表图标
import { UserOutlined, HomeOutlined, ContactsOutlined, FormOutlined } from "@ant-design/icons";
export const iconList: any = {
  "/home": <HomeOutlined />,
  "/user-manage": <UserOutlined />,
  // "/user-manage/list": <UserOutlined />,
  "/right-manage": <ContactsOutlined />,
  "/right-news": <FormOutlined />,
  // "/right-manage/role/list": <ContactsOutlined />,
  // "/right-manage/right/list": <ContactsOutlined />,
};

// 模拟菜单数据
export const menuList = [
  {
    key: "/home",
    label: "首页",
    icon: <HomeOutlined />,
  },
  {
    key: "/user-manage",
    label: "用户管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/user-manage/list",
        label: "用户列表",
      },
    ],
  },
  {
    key: "/right-manage",
    label: "权限管理",
    icon: <ContactsOutlined />,
    children: [
      {
        key: "/right-manage/role/list",
        label: "角色列表",
      },
      {
        key: "/right-manage/right/list",
        label: "权限列表",
      },
    ],
  },
];
