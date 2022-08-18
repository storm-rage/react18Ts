import React, {
  forwardRef,
  memo,
  useState,
  useEffect,
  useImperativeHandle,
  useCallback,
  useRef,
} from "react";
import { Form, Input, Select } from "antd";
import { useSelector, shallowEqual } from "react-redux";
import type { FormInstance } from "antd";

const { Option } = Select;

const UserForm = memo(
  forwardRef<FormInstance, any>((props, ref) => {
    const { regions, roles, defaultFroms } = props;
    const [disable, setdisable] = useState(false);
    const formR: any = useRef<FormInstance>();
    const { mine } = useSelector(
      (state: any) => ({
        mine: state.login.users,
      }),
      shallowEqual
    );
    const initData = useCallback(() => {
      formR.current.setFieldsValue({
        password: "",
        region: mine.region,
        roleId: "",
        username: "",
      });
    }, [formR, mine]);
    useEffect(() => {
      if (defaultFroms.username) {
        const { password, region, roleId, username }: any = defaultFroms;
        if (roleId === 1) {
          setdisable(true);
        } else {
          setdisable(false);
        }
        formR.current.setFieldsValue({
          password,
          region,
          roleId,
          username,
        });
      } else {
        setdisable(false);
        (ref as any).current.initValue();
      }
    }, [defaultFroms, ref]);

    useImperativeHandle(ref as any, () => {
      return {
        initValue: initData,
        validateFields: formR.current.validateFields,
        name: "限制ref功能",
      };
    });
    return (
      <div>
        <Form ref={formR} layout="vertical">
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input placeholder="密码" />
          </Form.Item>
          <Form.Item
            name="region"
            label="区域"
            rules={disable ? [] : [{ required: true, message: "请选择区域!" }]}
          >
            <Select disabled={disable}>
              {regions &&
                regions.map((region: any) => (
                  <Option
                    key={region.id}
                    value={region.value}
                    disabled={
                      mine.region === "" ? false : mine.region !== region.value
                    }
                  >
                    {region.title}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="roleId"
            label="角色"
            rules={[{ required: true, message: "请选择角色职务!" }]}
          >
            <Select
              onChange={(value) => {
                if (value === 1) {
                  setdisable(true);
                  (ref as any).current.setFieldsValue({
                    region: "",
                  });
                } else {
                  setdisable(false);
                }
              }}
            >
              {roles &&
                roles.map((role: any) => (
                  <Option
                    key={role.id}
                    value={role.id}
                    disabled={role.id < mine.roleId}
                  >
                    {role.roleName}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
    );
  })
);

export default UserForm;
