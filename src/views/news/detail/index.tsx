import React, { memo } from "react";
import { useParams } from "react-router-dom";
import NewsPreview from "views/sand-box/news-manage/preview";

const NewsViewDetail = memo(() => {
  const { id }: any = useParams();
  return (
    <div>
      <NewsPreview id={id} type={"view"} />
    </div>
  );
});

export default NewsViewDetail;
