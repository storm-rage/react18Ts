import { lazy } from "react";
import { Navigate } from "react-router-dom";
// 快速导入工具函数
const lazyLoad = (moduleName: string) => {
  const Module = lazy(() => import(`views/${moduleName}`));
  return <Module />;
};
const Appraisal = ({ children }: any) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const defaulyRoutes: any = [
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
    path: "/news",
    element: lazyLoad("news"),
  },
  {
    path: "/news/detail/:id",
    element: lazyLoad("news/detail"),
  },
  {
    path: "*",
    element: lazyLoad("not-found"),
  },
];

// 权限列表 和 导航菜单 得出路由表 element暂用字符串表示 后面渲染前再映射
export const handelFilterRouter = (
  rights: any,
  menus: any,
  routes: any = []
) => {
  for (const menu of menus) {
    if (menu.pagepermisson || menu.routepermisson) {
      let index = rights.findIndex((item: any) => item === menu.key) + 1;
      if (!menu.children) {
        if (index) {
          let element = `sand-box${menu.key}`;
          if (menu.routepermisson) {
            element = element.split("/:")[0];
          }
          const obj = {
            path: menu.key,
            element,
          };
          routes.push(obj);
        }
      } else {
        handelFilterRouter(rights, menu.children, routes);
      }
    }
  }
  return routes;
};

// 返回最终路由表
export const handelEnd = (routes: any) => {
  defaulyRoutes[1].children = [...routes, ...defaulyRoutes[1].children];
  return defaulyRoutes;
};

// 映射element 成对应组件
export const handelFilterElement = (routes: any) => {
  return routes.map((route: any) => {
    route.element = lazyLoad(route.element);
    return route;
  });
};
