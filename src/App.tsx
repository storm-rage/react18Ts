import routes from "./router";
import { useRoutes } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { handelFilterElement, handelEnd } from "@/utils/routersFilter";
import { deepCopy } from "@/utils/devUtils";

function App() {
  const [rout, setrout] = useState(routes);
  const { routs } = useSelector(
    (state: any) => ({ routs: state.login.routes }),
    shallowEqual
  );

  const element = useRoutes(rout);
  // 监听路由表改变重新渲染
  useEffect(() => {
    // deepCopy 深拷贝state数据 不能影响到store里的数据！
    // handelFilterElement 映射对应组件
    // handelEnd 将路由表嵌入默认路由表得到完整路由表
    const end = handelEnd(handelFilterElement(deepCopy(routs)));
    setrout(end);
  }, [routs]);

  return <div className="height-all">{element}</div>;
}

export default App;
