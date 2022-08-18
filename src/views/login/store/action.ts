import { INITSIDEMENUS, UPDATUSERS, LOGINOUT, UPDATROUTES } from "./contant";
import { getSideMenus } from "services/home";
import { loginUser } from "services/login";
import { patchRights } from "services/right-list";
import { handleSideMenu } from "@/utils/devUtils";
import { handelFilterRouter } from "@/utils/routersFilter";
import { message } from "antd";

// 获取导航菜单列表
export const getSideMenusAction = (): any => {
  return (dispatch: any, state: any) => {
    getSideMenus().then((res: any) => {
      const rights = state().login.users.role.rights;
      const newMenus = handleSideMenu(res, rights);
      dispatch({ type: INITSIDEMENUS, menus: newMenus });
      dispatch(updateRoutesAction());
    });
  };
};

// 退出登录
export const loginOutAction = (): any => ({ type: LOGINOUT });

// 更新导航菜单
export const updateMenusAction = (item: any): any => {
  return (dispatch: any) => {
    patchRights(item).then((res: any) => {
      dispatch(getSideMenusAction());
    });
  };
};

// 路由更新
export const updateRoutesAction = (): any => {
  return (dispatch: any, state: any) => {
    const rights = state().login.users.role.rights;
    const menus = state().login.menus;
    const routes = handelFilterRouter(rights, menus);
    dispatch({ type: UPDATROUTES, routes });
  };
};

// 登录
export const loginUserAction = (item: any, navigate: any): any => {
  return (dispatch: any) => {
    loginUser(item)
      .then((res: any) => {
        if (res.length === 0) {
          message.error("用户名或密码错误");
        } else {
          localStorage.setItem("token", res[0].username);
          dispatch({ type: UPDATUSERS, users: res[0] });
          dispatch(getSideMenusAction());
          navigate("/home");
        }
      })
  };
};
