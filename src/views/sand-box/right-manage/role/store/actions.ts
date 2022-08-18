import { GETROLES, CLEARALL } from "./contant";
import { getRoles, patchRights, deleteRights } from "services/role-list";

export const getRolesAction = () => {
  return (dispatch: any) => {
    getRoles().then((res: any) => {
      dispatch({ type: GETROLES, roles: res });
    });
  };
};

export const updateRoleAction = (item: any) => {
  return (dispatch: any) => {
    patchRights(item).then((res: any) => {
      dispatch(getRolesAction());
    });
  };
};

export const deleteRoleAction = (id: any) => {
  return (dispatch: any) => {
    deleteRights(id).then((res: any) => {
      dispatch(getRolesAction());
    });
  };
};

export const clearAllAction = () => ({ type: CLEARALL });
