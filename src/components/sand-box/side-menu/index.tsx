import React, { memo, useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { Layout, Menu } from "antd";
import { SildeMenuWrapper } from "./style";
import { mapIconMenus, deepCopy } from "@/utils/devUtils";
const { Sider } = Layout;

const SideMenu = memo((props: any) => {
  const location = useLocation();
  // 路由路径
  const path = location.pathname;
  // 默认展开的父节点菜单路径
  const selectOpen = "/" + (path && path.split("/")[1]);
  // 用于监听 props.collapsed 改变 在改变前处理 二级菜单选中回闪的bug
  const [collapsed, setcollapsed] = useState(props.collapsed);
  //  动态改变openKeys的值
  const [menuProps, setmenuProps] = useState({});

  const { menus } = useSelector(
    (state: any) => ({
      menus: state.login.menus,
    }),
    shallowEqual
  );
  // 拿到处理后的菜单数据 先深拷贝再处理 不然会影响到redux中的值
  const endMenus = useMemo(() => mapIconMenus(deepCopy(menus)), [menus]);
  const navigate = useNavigate();
  // 选中菜单的回调
  const selectMenu = ({ key, domEvent }: any) => {
    navigate(key);
  };
  // 展开菜单的回调
  const openMenu = (opens: any) => {
    setmenuProps({ openKeys: opens });
  };
  // 用于监听 props.collapsed 改变 收缩前先关闭所有展开项 打开前先展开当前选中项
  useEffect(() => {
    if (!props.collapsed) {
      setcollapsed(props.collapsed);
      setTimeout(() => {
        setmenuProps({ openKeys: [selectOpen] });
      }, 0);
    } else {
      setmenuProps({ openKeys: [] });
      setcollapsed(props.collapsed);
    }
  }, [props.collapsed, selectOpen]);

  return (
    <SildeMenuWrapper>
      <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
        <div className="all-menus">
          <div
            className="logo"
            style={{ display: collapsed ? "none" : "block" }}
          >
            全球新闻发布管理系统
          </div>
          <div className="menus">
            <Menu
              mode="inline"
              theme="dark"
              selectedKeys={[path]}
              defaultOpenKeys={[selectOpen]}
              {...menuProps}
              items={endMenus}
              onSelect={selectMenu}
              onOpenChange={openMenu}
            />
          </div>
        </div>
      </Sider>
    </SildeMenuWrapper>
  );
});

export default SideMenu;
