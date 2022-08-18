import React, { memo } from "react";
import { Layout, Avatar, Image, Dropdown } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useSelector, shallowEqual } from "react-redux";
import Menu from "./menu";

import { TopHeaderWrapper } from "./style";

const { Header } = Layout;

const TopHeader = memo((props: any) => {
  const { users } = useSelector(
    (state: any) => ({ users: state.login.users }),
    shallowEqual
  );
  return (
    <TopHeaderWrapper>
      <Header className="site-layout-background" style={{ padding: "0 16px" }}>
        {React.createElement(
          props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: () => props.collapsedBack(!props.collapsed),
          }
        )}
        <div className="right-users">
          <h3>欢迎回来{users.username}</h3>
          <Dropdown overlay={<Menu roleName={users.role.roleName} />}>
            <Avatar
              size={40}
              src={
                <Image
                  src="https://p6-passport.byteacctimg.com/img/user-avatar/8b5376a456e1d629e1d67bce335ddd9a~40x40.image"
                  style={{ width: 40 }}
                />
              }
            />
          </Dropdown>
        </div>
      </Header>
    </TopHeaderWrapper>
  );
});

export default TopHeader;
