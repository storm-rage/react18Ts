import React, { memo, useEffect, useState, useRef, useCallback } from "react";
import { Button, Table, Modal, Switch } from "antd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import type { ColumnsType } from "antd/es/table";
import type { FormInstance } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import {
  getUsersAction,
  getRegionsAction,
  updateUserAction,
  deleteUserAction,
  postUserAction,
} from "../store/actions";
import { getRolesAction } from "../../right-manage/role/store/actions";
import UserForm from "components/user-manage/UserForm";

const { confirm } = Modal;

const UserManageList = memo(() => {
  const dispatch: any = useDispatch();
  const formRef: any = useRef<FormInstance>();

  const { users, regions } = useSelector(
    (state: any) => ({
      users: state.user.get("users"),
      regions: state.user.get("regions"),
    }),
    shallowEqual
  );
  const { roles } = useSelector(
    (state: any) => ({
      roles: state.role.get("roles"),
    }),
    shallowEqual
  );
  const { mine } = useSelector(
    (state: any) => ({
      mine: state.login.users,
    }),
    shallowEqual
  );
  const filterRegion = () => {
    if (regions.length) {
      return [
        ...regions.map((item: any) => ({
          text: item.title,
          value: item.value,
        })),
        {
          text: "全球",
          value: "",
        },
      ];
    }
    return [];
  };
  // 0 添加用户 1 修改用户
  const [formType, setformType] = useState(0);
  const columns: ColumnsType<any> = [
    {
      title: "区域",
      dataIndex: "region",
      render: (region) => {
        return <b>{region === "" ? "全球" : region}</b>;
      },
      filters: filterRegion(),
      onFilter: (value, item) => {
        return item.region === value;
      },
    },
    {
      title: "角色名称",
      dataIndex: "role",
      render: (role) => {
        return role?.roleName;
      },
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "用户状态",
      dataIndex: "roleState",
      render: (roleState, item) => {
        return (
          <Switch
            checked={roleState}
            disabled={item.default || item.id === mine.id}
            onChange={() => handleChange(item)}
          ></Switch>
        );
      },
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              disabled={item.default || item.id === mine.id}
              onClick={() => confirmMethod(item)}
              style={{ marginRight: "8px" }}
            />

            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              disabled={item.default}
              onClick={() => {
                setformType(1);
                setdefaultFroms(item);
                setisAddVisible(true);
              }}
            />
          </div>
        );
      },
    },
  ];
  // 修改初始值
  const [defaultFroms, setdefaultFroms] = useState({});
  // 删除回调
  const confirmMethod = (item: any) => {
    confirm({
      title: "你确定要删除?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(deleteUserAction(item.id));
      },
    });
  };
  // 开关改变
  const handleChange = (item: any) => {
    dispatch(updateUserAction(item.id, { roleState: !item.roleState }));
  };

  const [isAddVisible, setisAddVisible] = useState(false);
  const addFormOK = useCallback(() => {
    formRef.current.validateFields().then((value: any) => {
      if (formType) {
        dispatch(updateUserAction((defaultFroms as any).id, value));
      } else {
        dispatch(postUserAction(value));
      }
      setisAddVisible(false);
      formRef.current.initValue();
    });
  }, [formRef, formType, defaultFroms, dispatch]);

  useEffect(() => {
    if (users.size === 0 || users.length === 0) {
      dispatch(getUsersAction());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (regions.size === 0 || regions.length === 0) {
      dispatch(getRegionsAction());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (roles.size === 0 || roles.length === 0) {
      dispatch(getRolesAction());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setformType(0);
          setdefaultFroms({});
          setisAddVisible(true);
        }}
      >
        添加用户
      </Button>
      <Table
        columns={columns}
        dataSource={users.length && users}
        pagination={{ pageSize: 20 }}
        scroll={{ y: 680 }}
        rowKey={(item: any) => item.id}
      />
      <Modal
        visible={isAddVisible}
        title={formType ? "修改用户" : "添加用户"}
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setisAddVisible(false);
        }}
        onOk={() => addFormOK()}
      >
        <UserForm
          ref={formRef}
          regions={regions.length && regions}
          roles={roles.length && roles}
          defaultFroms={defaultFroms}
        />
      </Modal>
    </div>
  );
});

export default UserManageList;
