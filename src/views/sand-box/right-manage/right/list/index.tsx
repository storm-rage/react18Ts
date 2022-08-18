import React, { memo } from "react";
import { Button, Table, Tag, Modal, Popover, Switch } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { deleteRights } from "services/right-list";
import {
  getSideMenusAction,
  updateMenusAction,
} from "views/login/store/action";

const { confirm } = Modal;

interface DataType {
  key: React.ReactNode;
  label: string;
  children?: DataType[];
}

const RightList = memo(() => {
  const dispatch = useDispatch();
  const { data } = useSelector(
    (state: any) => ({ data: state.login.menus }),
    shallowEqual
  );
  // 触发删除弹窗
  const confirmMethod = (item: any) => {
    confirm({
      title: "你确定要删除?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMethod(item);
      },
    });
  };
  // 删除
  const deleteMethod = (item: any) => {
    deleteRights(item).then((res) => {
      dispatch(getSideMenusAction());
    });
  };
  // 配置开关
  const switchMethod = (item: any) => {
    item.pagepermisson = item.pagepermisson ? 0 : 1;
    dispatch(updateMenusAction(item));
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "权限名称",
      dataIndex: "label",
    },
    {
      title: "权限路径",
      dataIndex: "key",
      render: (key) => {
        return <Tag color="orange">{key}</Tag>;
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
              onClick={() => confirmMethod(item)}
              style={{ marginRight: "8px" }}
            />

            <Popover
              content={
                <div style={{ textAlign: "center" }}>
                  <Switch
                    checked={item.pagepermisson}
                    onChange={() => switchMethod(item)}
                  ></Switch>
                </div>
              }
              title="页面配置项"
              trigger={item.pagepermisson === undefined ? "" : "click"}
            >
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                disabled={item.pagepermisson === undefined}
              />
            </Popover>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data.length && data}
        pagination={{ pageSize: 20 }}
        scroll={{ y: 700 }}
      />
    </div>
  );
});

export default RightList;
