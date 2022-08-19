import React, { memo, useEffect } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";

import { patchNewsStateAction } from "../../news-manage/store/actions";
import { getAuditListNewsAction } from "../store/actions";

const Audit = memo(() => {
  const dispatch: any = useDispatch();
  const { aduitList } = useSelector(
    (state: any) => ({ aduitList: state.audit.get("aduitList") }),
    shallowEqual
  );
  const columns = [
    {
      title: "新闻标题",
      dataIndex: "title",
      render: (title: string, item: any) => {
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
      render: (category: any) => {
        return <div>{category.title}</div>;
      },
    },
    {
      title: "操作",
      render: (item: any) => {
        return (
          <div>
            <Button
              type="primary"
              onClick={() => handleAudit(item, 2, 1)}
              style={{ marginRight: "8px" }}
            >
              通过
            </Button>
            <Button danger onClick={() => handleAudit(item, 3, 0)}>
              驳回
            </Button>
          </div>
        );
      },
    },
  ];
  const handleAudit = (item: any, auditState: number, publishState: number) => {
    dispatch(
      patchNewsStateAction(
        { id: item.id, auditState, publishState },
        "[审核管理/审核列表]"
      )
    );
  };

  useEffect(() => {
    dispatch(getAuditListNewsAction());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={aduitList.length && aduitList}
        pagination={{ pageSize: 20 }}
        scroll={{ y: 700 }}
        rowKey={(item: any) => item.id}
      />
    </div>
  );
});

export default Audit;
