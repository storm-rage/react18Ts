import React, { memo, useEffect } from "react";
import { Button, Table, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import {
  getAuthorNewsAction,
  deleteNewsAction,
  getCategoriesAction,
  patchNewsStateAction,
} from "../store/actions";

const { confirm } = Modal;

interface DataType {
  key: React.ReactNode;
  label: string;
  id: number;
  children?: DataType[];
}

const NewsDraft = memo(() => {
  const navigate = useNavigate();
  const dispacth: any = useDispatch();
  const { authorNews, categories } = useSelector(
    (state: any) => ({
      authorNews: state.news.get("authorNews"),
      categories: state.news.get("categories"),
    }),
    shallowEqual
  );
  useEffect(() => {
    if (authorNews.size === 0 || authorNews.length === 0) {
      dispacth(getAuthorNewsAction());
    }
    if (categories.size === 0 || categories.length === 0) {
      dispacth(getCategoriesAction());
    }
    // eslint-disable-next-line
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: number) => {
        return <b>{id}</b>;
      },
    },
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
      title: "分类",
      dataIndex: "categoryId",
      render: (categoryId) => {
        const obj = categories.find((item: any) => item.id === categoryId);
        return obj && obj.value;
      },
    },
    {
      title: "操作",
      render: (item: any) => {
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
              style={{ marginRight: "8px" }}
              onClick={() => {
                navigate(`/news-manage/update/${item.id}`);
              }}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<UploadOutlined />}
              onClick={() => {
                handleCheck(item);
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
        dispacth(deleteNewsAction(item.id));
      },
    });
  };
  const handleCheck = (item: any) => {
    dispacth(
      patchNewsStateAction({ id: item.id, auditState: 1 }, "[审核列表]")
    );
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={authorNews.length && authorNews}
        pagination={{ pageSize: 20 }}
        scroll={{ y: 700 }}
        rowKey={(item: any) => item.id}
      />
    </div>
  );
});

export default NewsDraft;
