import React, { memo, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Table, Modal, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { patchNewsStateAction } from "../../news-manage/store/actions";
import { getAuditNewsAction } from "../store/actions";

const { confirm } = Modal;
interface DataType {
  key: React.ReactNode;
  label: string;
  children?: DataType[];
  id: number;
}

const AuditList = memo(() => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { aduits } = useSelector(
    (state: any) => ({ aduits: state.audit.get("aduits") }),
    shallowEqual
  );

  const columns: ColumnsType<DataType> = [
    {
      title: "新闻标题",
      dataIndex: "title",
      render: (title, item) => {
        return <Link to={`/news-manage/preview/${item.id}`}>{title}</Link>;
      },
    },
    {
      title: "作者",
      dataIndex: "author",
    },
    {
      title: "新闻分类",
      dataIndex: "category",
      render: (category) => {
        return <div>{category.title}</div>;
      },
    },
    {
      title: "审核状态",
      dataIndex: "auditState",
      render: (auditState) => {
        const colorList = ["", "orange", "green", "red"];
        const auditList = ["草稿箱", "审核中", "已通过", "未通过"];
        return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>;
      },
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            {item.auditState === 1 && (
              <Button onClick={() => confirmMethod(item)}>撤销</Button>
            )}
            {item.auditState === 2 && (
              <Button danger onClick={() => confirmMethod(item)}>
                发布
              </Button>
            )}
            {item.auditState === 3 && (
              <Button type="primary" onClick={() => confirmMethod(item)}>
                更新
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  const confirmMethod = (item: any) => {
    const { auditState } = item;
    const mes = ["", "撤销", "发布", "更新"];
    confirm({
      title: `你确定要${mes[auditState]}吗?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        switch (auditState) {
          case 1:
            handleRervert(item);
            break;
          case 2:
            handlePublish(item);
            break;
          default:
            handleUpdate(item);
            break;
        }
      },
    });
  };
  const handleRervert = (item: any) => {
    dispatch(patchNewsStateAction({ id: item.id, auditState: 0 }, "[草稿箱]"));
  };
  const handlePublish = (item: any) => {
    dispatch(
      patchNewsStateAction(
        {
          id: item.id,
          publishState: 2,
          publishTime: Date.now(),
        },
        "[发布管理/已经发布]"
      )
    );
  };
  const handleUpdate = (item: any) => {
    navigate(`/news-manage/update/${item.id}`);
  };

  useEffect(() => {
    dispatch(getAuditNewsAction());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={aduits.length && aduits}
        pagination={{ pageSize: 20 }}
        scroll={{ y: 700 }}
        rowKey={(item: any) => item.id}
      />
    </div>
  );
});

export default AuditList;
