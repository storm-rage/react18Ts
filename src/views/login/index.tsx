import React, { memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message, Tooltip } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

import { LoginWrapper } from "./style";
import { loginUserAction } from "./store/action";
import { options } from "./config-particles";

const Login = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 表单验证的回调
  const onFinish = (values: any) => {
    dispatch(loginUserAction(values, navigate));
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("用户名或密码不能为空");
  };

  // 粒子效果的回调
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {}, []);
  const handelStar = () => {
    window.open("https://gitee.com/kang0916/react18-v6-cms", "_blank");
  };
  return (
    <LoginWrapper>
      <Particles
        height={document.documentElement.clientHeight + ""}
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
      ></Particles>
      <div className="login-window">
        <div className="logintitle">全球新闻发布管理系统</div>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入你的用户名!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入你的密码!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "40px" }}
            >
              登录
            </Button>
            <Tooltip title="点个star吧">
              <Button
                shape="circle"
                onClick={handelStar}
                icon={
                  <HeartTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "18px" }}
                  />
                }
              />
            </Tooltip>
          </Form.Item>
        </Form>
        <div className="view-news">
          <Link to={"/news"} style={{ fontSize: "14px" }}>
            游客登录浏览新闻
          </Link>
        </div>
      </div>
    </LoginWrapper>
  );
});

export default Login;
