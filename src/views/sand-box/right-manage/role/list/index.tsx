import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Button, Table, Modal, Tree } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  getRolesAction,
  updateRoleAction,
  deleteRoleAction,
} from "../store/actions";

const { confirm } = Modal;
interface DataType {
  key: React.ReactNode;
  label: string;
  children?: DataType[];
}

const RoleLise = memo(() => {
  const dispatch: any = useDispatch();

  const [trees, settrees] = useState([]);
  const [id, setid] = useState(0);

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
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

            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                settrees(item.rights);
                setid(item.id);
                setisModal(true);
              }}
            />
          </div>
        );
      },
    },
  ];
  const confirmMethod = (item: any) => {
    confirm({
      title: "你确定要删除?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMethod(item);
      },
    });
  };
  const deleteMethod = (item: any) => {
    dispatch(deleteRoleAction(item.id));
  };

  // menus
  const { menus } = useSelector(
    (state: any) => ({ menus: state.login.menus }),
    shallowEqual
  );

  const { role } = useSelector(
    (state: any) => ({ role: state.role.get("roles") }),
    shallowEqual
  );

  useEffect(() => {
    if (role.size === 0 || role.length === 0) {
      dispatch(getRolesAction());
    }
    // eslint-disable-next-line
  }, []);

  // 控制弹出框
  const [isModal, setisModal] = useState(false);

  // 弹出框确认回调
  const handleOk = () => {
    const obj = { id, rights: trees };
    dispatch(updateRoleAction(obj));
    setisModal(false);
  };
  // 取消回调
  const handleCancel = () => {
    setisModal(false);
  };

  // 树形控件选择回调
  const onCheck = (rights: any) => {
    settrees(rights.checked);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={role.length && role}
        pagination={{ pageSize: 20 }}
        scroll={{ y: 700 }}
        rowKey={(item: any) => item.id}
      />
      <Modal
        title="权限分配"
        visible={isModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          checkedKeys={trees}
          checkStrictly={true}
          onCheck={onCheck}
          treeData={menus}
          fieldNames={{ title: "label" }}
          height={433}
        />
      </Modal>
    </div>
  );
});

export default RoleLise;
