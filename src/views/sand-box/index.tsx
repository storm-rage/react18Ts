import React, { memo, useState, Suspense } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Outlet } from "react-router-dom";
import { Layout, Spin } from "antd";

import { SandBoxWrapper } from "./style";
import SideMenu from "components/sand-box/side-menu";
import TopHeader from "components/sand-box/top-header";
import Loading from "views/loading";

const { Content } = Layout;

const SandBox = memo(() => {
  // 控制侧边伸缩
  const [collapsed, setCollapsed] = useState(false);
  const collapsedBack = (cop: boolean) => {
    setCollapsed(cop);
  };
  const { isLoading } = useSelector(
    (state: any) => ({ isLoading: state.sand.get("isLoading") }),
    shallowEqual
  );

  return (
    <SandBoxWrapper>
      <Layout>
        <SideMenu collapsed={collapsed} />
        <Layout className="site-layout">
          <TopHeader collapsed={collapsed} collapsedBack={collapsedBack} />
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              height: "100%",
              overflow: "auto",
            }}
          >
            <Suspense fallback={<Loading />}>
              <Spin size="large" spinning={isLoading}>
                <Outlet />
              </Spin>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </SandBoxWrapper>
  );
});

export default SandBox;
