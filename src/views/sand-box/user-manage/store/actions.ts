import { GETUSERS, GETREGIONS, CLEARALL } from "./contant";
import {
  getUsers,
  getRegions,
  patchUsers,
  deleteUsers,
  postUsers,
} from "services/user-manage";

export const getUsersAction = () => {
  return (dispatch: any, state: any) => {
    getUsers().then((res: any) => {
      const mine = state().login.users;
      if (mine.roleId !== 1) {
        res = res.filter(
          (re: any) => re.roleId >= mine.roleId && re.region === mine.region
        );
      }
      dispatch({ type: GETUSERS, users: res });
    });
  };
};

export const getRegionsAction = () => {
  return (dispatch: any) => {
    getRegions().then((res: any) => {
      dispatch({ type: GETREGIONS, regions: res });
    });
  };
};

export const updateUserAction = (id: number, item: any) => {
  return (dispatch: any) => {
    patchUsers(id, item).then((res: any) => {
      dispatch(getUsersAction());
    });
  };
};

export const deleteUserAction = (id: any) => {
  return (dispatch: any) => {
    deleteUsers(id).then((res: any) => {
      dispatch(getUsersAction());
    });
  };
};

export const postUserAction = (item: any) => {
  return (dispatch: any) => {
    postUsers(item).then((res: any) => {
      dispatch(getUsersAction());
    });
  };
};

export const clearAllAction = () => ({ type: CLEARALL });
