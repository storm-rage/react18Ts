// 映射菜单表图标
import { UserOutlined } from "@ant-design/icons";
export const iconList: any = {
  "/home": <UserOutlined />,
  "/user-manage": <UserOutlined />,
  "/user-manage/list": <UserOutlined />,
  "/right-manage": <UserOutlined />,
  "/right-manage/role/list": <UserOutlined />,
  "/right-manage/right/list": <UserOutlined />,
};

// 模拟菜单数据
export const menuList = [
  {
    key: "/home",
    label: "首页",
    icon: <UserOutlined />,
  },
  {
    key: "/user-manage",
    label: "用户管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/user-manage/list",
        label: "用户列表",
        icon: <UserOutlined />,
      },
    ],
  },
  {
    key: "/right-manage",
    label: "权限管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/right-manage/role/list",
        label: "角色列表",
        icon: <UserOutlined />,
      },
      {
        key: "/right-manage/right/list",
        label: "权限列表",
        icon: <UserOutlined />,
      },
    ],
  },
];
