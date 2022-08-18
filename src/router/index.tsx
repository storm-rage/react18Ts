import { lazy } from "react";
import { Navigate } from "react-router-dom";

// React 组件懒加载

// 快速导入工具函数
const lazyLoad = (moduleName: string) => {
  const Module = lazy(() => import(`views/${moduleName}`));
  return <Module />;
};
// 路由鉴权组件
// const AppraisalInit = () => {
//   const token = localStorage.getItem("token");
//   return token ? lazyLoad("sand-box") : <Navigate to="/login" />;
// };
const Appraisal = ({ children }: any) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

interface Router {
  name?: string;
  path: string;
  children?: Array<Router>;
  element: any;
}

const routes: Array<Router> = [
  {
    path: "/login",
    element: lazyLoad("login"),
  },
  {
    path: "/",
    element: <Appraisal>{lazyLoad("sand-box")}</Appraisal>,
    children: [
      {
        path: "",
        element: <Navigate to="home" />,
      },
      {
        path: "*",
        element: lazyLoad("sand-box/nopermission"),
      },
    ],
  },
  {
    path: "*",
    element: lazyLoad("not-found"),
  },
];

// const routes: Array<Router> = [
//   {
//     path: "/login",
//     element: lazyLoad("login"),
//   },
//   {
//     path: "/",
//     element: <Appraisal>{lazyLoad("sand-box")}</Appraisal>,
//     children: [
//       {
//         path: "home",
//         element: lazyLoad("sand-box/home"),
//       },
//       {
//         path: "right-manage/role/list",
//         element: lazyLoad("sand-box/right-manage/role/list"),
//       },
//       {
//         path: "right-manage/right/list",
//         element: lazyLoad("sand-box/right-manage/right/list"),
//       },
//       {
//         path: "user-manage/list",
//         element: lazyLoad("sand-box/user-manage/list"),
//       },
//       {
//         path: "news-manage/add",
//         element: lazyLoad("sand-box/news-manage/add"),
//       },
//       {
//         path: "news-manage/draft",
//         element: lazyLoad("sand-box/news-manage/draft"),
//       },
//       {
//         path: "news-manage/category",
//         element: lazyLoad("sand-box/news-manage/category"),
//       },
//       {
//         path: "news-manage/preview/:id",
//         element: lazyLoad("sand-box/news-manage/preview"),
//       },
//       {
//         path: "news-manage/update/:id",
//         element: lazyLoad("sand-box/news-manage/update"),
//       },
//       {
//         path: "audit-manage/audit",
//         element: lazyLoad("sand-box/audit-manage/audit"),
//       },
//       {
//         path: "audit-manage/list",
//         element: lazyLoad("sand-box/audit-manage/list"),
//       },
//       {
//         path: "publish-manage/unpublished",
//         element: lazyLoad("sand-box/publish-manage/unpublished"),
//       },
//       {
//         path: "publish-manage/published",
//         element: lazyLoad("sand-box/publish-manage/published"),
//       },
//       {
//         path: "publish-manage/sunset",
//         element: lazyLoad("sand-box/publish-manage/sunset"),
//       },
//       {
//         path: "",
//         element: <Navigate to="home" />,
//       },
//       {
//         path: "*",
//         element: lazyLoad("sand-box/nopermission"),
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: lazyLoad("not-found"),
//   },
// ];

export default routes;
