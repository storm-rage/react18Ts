import React, { memo, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Col, Row, List, Avatar, Drawer, Tag } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  FundViewOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import * as Echarts from "echarts";
import _ from "lodash";

import { getViewList, getStarList, getBarList } from "services/home";

const { Meta } = Card;

const Home = memo(() => {
  const barRef = useRef<HTMLDivElement>(null);
  const pieRef = useRef<HTMLDivElement>(null);
  const [viewList, setviewList] = useState([]);
  const [starList, setstarList] = useState([]);
  const [barList, setbarList] = useState([]);
  const [visible, setvisible] = useState(false);
  const [pieChart, setpieChart] = useState<any>(null);
  const { users } = useSelector((state: any) => ({ users: state.login.users }));
  useEffect(() => {
    getViewList().then((res: any) => {
      setviewList(res);
    });
    getStarList().then((res: any) => {
      setstarList(res);
    });
    getBarList().then((res: any) => {
      renderBarView(_.groupBy(res, (item) => item.category.title));
      setbarList(res);
    });
    return () => {
      window.onresize = null;
    };
  }, []);

  const renderBarView = (obj: any) => {
    var myChart = Echarts.init(barRef.current as HTMLDivElement);

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "新闻分类图示",
      },
      tooltip: {},
      legend: {
        data: ["数量"],
      },
      xAxis: {
        data: Object.keys(obj),
        axisLabel: {
          rotate: "45",
          interval: 0,
        },
      },
      yAxis: {
        minInterval: 1,
      },
      series: [
        {
          name: "数量",
          type: "bar",
          data: Object.values(obj).map((item: any) => item.length),
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    window.onresize = () => {
      myChart.resize();
    };
  };

  const renderPieView = () => {
    //数据处理工作
    var currentList = barList.filter(
      (item: any) => item.author === users.username
    );
    var groupObj = _.groupBy(currentList, (item: any) => item.category.title);
    var list = [];
    for (var i in groupObj) {
      list.push({
        name: i,
        value: groupObj[i].length,
      });
    }
    var myChart;
    if (!pieChart) {
      myChart = Echarts.init(pieRef.current as HTMLDivElement);
      setpieChart(myChart);
    } else {
      myChart = pieChart;
    }
    var option;

    option = {
      title: {
        text: "当前用户新闻分类图示",
        subtext: "最新数据",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "发布数量",
          type: "pie",
          radius: "50%",
          data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    option && myChart.setOption(option);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered={true}>
            <List
              size="small"
              dataSource={viewList}
              renderItem={(item: any) => (
                <List.Item>
                  <Tag icon={<FundViewOutlined />} color="#55acee">
                    <Link
                      to={`/news-manage/preview/${item.id}`}
                      style={{ fontSize: "16px" }}
                    >
                      {item.title}
                    </Link>
                  </Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered={true}>
            <List
              size="small"
              dataSource={starList}
              renderItem={(item: any) => (
                <List.Item>
                  <Tag icon={<HeartOutlined />} color="#cd201f">
                    <Link
                      to={`/news-manage/preview/${item.id}`}
                      style={{ fontSize: "16px" }}
                    >
                      {item.title}
                    </Link>
                  </Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242332225H9-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663464464&t=d0e75d669ec371071353bdf488b1e6fe"
              />
            }
            actions={[
              <SettingOutlined
                key="setting"
                onClick={() => {
                  setvisible(true);
                  setTimeout(() => {
                    // init初始化
                    renderPieView();
                  }, 0);
                }}
              />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={
                <Avatar
                  size={60}
                  src="https://p6-passport.byteacctimg.com/img/user-avatar/8b5376a456e1d629e1d67bce335ddd9a~60x60.image"
                />
              }
              title={users.username}
              description={
                <div>
                  <b>{users.region ? users.region : "全球管理员"}</b>
                  <span
                    style={{
                      paddingLeft: "30px",
                    }}
                  >
                    {users.role.roleName}
                  </span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
      <Drawer
        width="500px"
        title="个人新闻分类"
        placement="right"
        closable={true}
        onClose={() => {
          setvisible(false);
        }}
        visible={visible}
      >
        <div
          ref={pieRef}
          style={{
            width: "100%",
            height: "400px",
            marginTop: "30px",
          }}
        ></div>
      </Drawer>
      <div
        ref={barRef}
        style={{
          width: "70%",
          height: "500px",
          margin: "0 auto",
          marginTop: "30px",
        }}
      ></div>
    </div>
  );
});

export default Home;
