import { GETCATEGORIES, CLEARALL, GETAUTHORNEWS } from "./contant";
import {
  getCategories,
  patchCategories,
  getAuthorNews,
  deleteNews,
  patchNews,
  deleteCategories,
} from "services/news-manage";
import { message, notification } from "antd";

import { getAuthorPubilshNewsAction } from "../../publish-manage/store/actions";
import {
  getAuditListNewsAction,
  getAuditNewsAction,
} from "../../audit-manage/store/actions";

export const getCategoriesAction = () => {
  return (dispatch: any) => {
    getCategories().then((res: any) => {
      dispatch({ type: GETCATEGORIES, categories: res });
    });
  };
};

export const patchCategoriesAction = (data: any) => {
  return (dispatch: any) => {
    patchCategories(data).then((res: any) => {
      dispatch(getCategoriesAction());
    });
  };
};

export const deleteCategoriesAction = (id: number) => {
  return (dispatch: any) => {
    deleteCategories(id).then(() => {
      message.success("删除成功！");
      dispatch(getCategoriesAction());
    });
  };
};

export const getAuthorNewsAction = () => {
  return (dispatch: any, state: any) => {
    const username = state().login.users.username;
    getAuthorNews(username).then((res: any) => {
      dispatch({ type: GETAUTHORNEWS, authorNews: res });
    });
  };
};

export const deleteNewsAction = (id: number) => {
  return (dispatch: any) => {
    deleteNews(id).then(() => {
      message.success("删除成功！");
      dispatch(getAuthorNewsAction());
      dispatch(getAuthorPubilshNewsAction(3));
    });
  };
};

// 更新新闻信息 需要通知其他地方重新获取数据
export const patchNewsStateAction = (data: any, title: string) => {
  return (dispatch: any) => {
    patchNews(data).then(() => {
      dispatch(getAuthorNewsAction());
      dispatch(getAuditListNewsAction());
      dispatch(getAuditNewsAction());
      if (data.publishState !== 0) {
        dispatch(getAuthorPubilshNewsAction(data.publishState));
        dispatch(getAuthorPubilshNewsAction(data.publishState - 1));
      }
      notification.info({
        message: `通知`,
        description: `您可以到${title}中查看您的新闻审核进度`,
        placement: "bottomRight",
      });
    });
  };
};

export const clearAllAction = () => ({ type: CLEARALL });
