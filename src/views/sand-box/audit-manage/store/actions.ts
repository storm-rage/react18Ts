import { GETAUDITLIST, CLEARALL, GETAUDIT } from "./contant";

import { getAuditListNews, getAuditNews } from "services/audit-manage";

export const getAuditListNewsAction = () => {
  return (dispatch: any, state: any) => {
    const users = state().login.users;
    getAuditListNews().then((res: any) => {
      let arr = res;
      if (users.roleId !== 1) {
        arr = res.filter(
          (re: any) => re.roleId >= users.roleId && re.region === users.region
        );
      }
      dispatch({ type: GETAUDITLIST, aduitList: arr });
    });
  };
};

export const getAuditNewsAction = () => {
  return (dispatch: any, state: any) => {
    const users = state().login.users;
    getAuditNews(users.username).then((res: any) => {
      dispatch({ type: GETAUDIT, aduits: res });
    });
  };
};

export const clearAllAction = () => ({ type: CLEARALL });
