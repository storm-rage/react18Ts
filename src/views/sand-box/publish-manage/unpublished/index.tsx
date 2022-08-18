import React, { memo } from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";

import PubilshTable from "../common/pubilsh-table";
import { patchNewsStateAction } from "../../news-manage/store/actions";

const Unpublished = memo(() => {
  const dispatch: any = useDispatch();
  const handlePublish = (id: number) => {
    dispatch(
      patchNewsStateAction(
        { publishState: 2, publishTime: Date.now(), id },
        "[发布管理/已经发布]"
      )
    );
  };
  return (
    <div>
      <PubilshTable
        type={1}
        button={(id: number) => (
          <Button type="primary" onClick={() => handlePublish(id)}>
            发布
          </Button>
        )}
      />
    </div>
  );
});

export default Unpublished;
