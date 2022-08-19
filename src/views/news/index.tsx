import React, { memo, useEffect, useState } from "react";
import _ from "lodash";
import { PageHeader, Card, Col, Row, List } from "antd";

import { getAllNews } from "services/news";
import { Link } from "react-router-dom";

const NewsView = memo(() => {
  const [list, setlist] = useState<any>([]);
  useEffect(() => {
    getAllNews().then((res: any) => {
      setlist(Object.entries(_.groupBy(res, (item) => item.category.title)));
    });
  }, []);

  return (
    <div
      style={{
        width: "95%",
        margin: "0 auto",
      }}
    >
      <PageHeader
        className="site-page-header"
        title="全球大新闻"
        subTitle="查看新闻"
      />
      <div className="site-card-wrapper">
        <Row gutter={[16, 16]}>
          {list.map((item: any) => (
            <Col span={8} key={item[0]}>
              <Card title={item[0]} bordered={true} hoverable={true}>
                <List
                  size="small"
                  dataSource={item[1]}
                  pagination={{
                    pageSize: 5,
                  }}
                  renderItem={(data: any) => (
                    <List.Item>
                      <Link to={`/news/detail/${data.id}`}>{data.title}</Link>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
});

export default NewsView;
