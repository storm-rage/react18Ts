import React, { memo } from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";

import PubilshTable from "../common/pubilsh-table";
import { deleteNewsAction } from "../../news-manage/store/actions";

const Sunset = memo(() => {
  const dispatch: any = useDispatch();
  const handleDelete = (id: number) => {
    dispatch(deleteNewsAction(id));
  };
  return (
    <div>
      <PubilshTable
        type={3}
        button={(id: number) => (
          <Button danger onClick={() => handleDelete(id)}>
            删除
          </Button>
        )}
      />
    </div>
  );
});

export default Sunset;
