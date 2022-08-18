import {
  GETAUTHOUPPUBLISHRNEWS,
  CLEARALL,
  GETAUTHOPUBLISHRNEWS,
  GETAUTHORDELETESNEWS,
} from "./contant";
import { getAuthorPubilshNews } from "services/publish-manage";

export const getAuthorPubilshNewsAction = (type: number) => {
  return (dispatch: any, state: any) => {
    const username = state().login.users.username;
    getAuthorPubilshNews(username, type).then((res: any) => {
      switch (type) {
        case 1:
          dispatch({ type: GETAUTHOUPPUBLISHRNEWS, unpublishs: res });
          break;
        case 2:
          dispatch({ type: GETAUTHOPUBLISHRNEWS, publishs: res });
          break;
        case 3:
          dispatch({ type: GETAUTHORDELETESNEWS, deletes: res });
          break;
        default:
          break;
      }
    });
  };
};

export const clearAllAction = () => ({ type: CLEARALL });
