import React, { memo } from "react";
import { Spin } from "antd";
import { LoadWrapper } from "./style";

const Loading = memo(() => {
  return (
    <LoadWrapper>
      <Spin size="large" />
    </LoadWrapper>
  );
});

export default Loading;
