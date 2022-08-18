import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPreview } from "services/news-manage/index";
import NewsAdd from "../add";

const NewsUpdate = memo(() => {
  const [updates, setupdates] = useState({});
  const { id }: any = useParams();
  useEffect(() => {
    id &&
      getPreview(id).then((res: any) => {
        setupdates(res);
      });
  }, [id]);

  return (
    <div>
      <NewsAdd type="update" updates={updates} />
    </div>
  );
});

export default NewsUpdate;
