import React, { memo, useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import type { ColumnsType } from "antd/es/table";

import { getAuthorPubilshNewsAction } from "../store/actions";

interface DataType {
  key: React.ReactNode;
  label: string;
  id: number;
  children?: DataType[];
}
interface TProps {
  type: number;
  button: any;
}

const PubilshTable = memo((props: TProps) => {
  const dataMsg = ["", "unpublishs", "publishs", "deletes"];
  const dispacth: any = useDispatch();
  const { datas } = useSelector(
    (state: any) => ({ datas: state.publish.get(dataMsg[props.type]) }),
    shallowEqual
  );
  useEffect(() => {
    if (datas.size === 0 || datas.length === 0) {
      dispacth(getAuthorPubilshNewsAction(props.type));
    }
    // eslint-disable-next-line
  }, []);
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
      title: "操作",
      render: (item) => {
        return <div>{props.button(item.id)}</div>;
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={datas.length && datas}
        pagination={{ pageSize: 20 }}
        scroll={{ y: 700 }}
        rowKey={(item: any) => item.id}
      />
    </div>
  );
});

export default PubilshTable;
