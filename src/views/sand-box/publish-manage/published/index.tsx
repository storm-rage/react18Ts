import React, { memo } from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";

import PubilshTable from "../common/pubilsh-table";
import { patchNewsStateAction } from "../../news-manage/store/actions";

const Published = memo(() => {
  const dispatch: any = useDispatch();
  const handleSunset = (id: number) => {
    dispatch(
      patchNewsStateAction({ publishState: 3, id }, "[发布管理/已下线]")
    );
  };
  return (
    <div>
      <PubilshTable
        type={2}
        button={(id: number) => (
          <Button danger onClick={() => handleSunset(id)}>
            下线
          </Button>
        )}
      />
    </div>
  );
});

export default Published;
