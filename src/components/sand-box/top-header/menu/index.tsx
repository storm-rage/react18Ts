import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Menu } from "antd";

import { loginOutAction } from "views/login/store/action";
import { clearAllAction as clearUser } from "views/sand-box/user-manage/store/actions";
import { clearAllAction as clearRole } from "views/sand-box/right-manage/role/store/actions";

const MenuCustom = memo((props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useClick: MenuProps["onClick"] = ({ key }) => {
    if (Number(key) === 2) {
      localStorage.removeItem("token");
      navigate("/login");
      dispatch(loginOutAction());
      dispatch(clearUser());
      dispatch(clearRole());
    }
  };
  return (
    <Menu
      onClick={useClick}
      items={[
        {
          key: "1",
          label: <h3>{props.roleName}</h3>,
        },
        {
          key: "2",
          danger: true,
          label: "退出",
        },
      ]}
    />
  );
});

export default MenuCustom;
