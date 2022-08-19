import React, { memo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  PageHeader,
  Steps,
  Button,
  message,
  Form,
  Select,
  Input,
  notification,
} from "antd";
import type { FormInstance } from "antd";

import { AddWrapper } from "./style";
import { getCategoriesAction, getAuthorNewsAction } from "../store/actions";
import DraftCustom from "components/news-manage/draft";
import { postNews, patchNews } from "services/news-manage/index";

const { Step } = Steps;
const { Option } = Select;

interface TProps {
  type?: string;
  updates?: any;
}

const NewsAdd = memo((props: TProps) => {
  const { type, updates } = props;
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const formRef: any = useRef<FormInstance>();
  // 输入框排版
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const [current, setCurrent] = useState(0);
  const [formInfo, setformInfo] = useState({});
  const [content, setContent] = useState("");
  const { categories, users } = useSelector(
    (state: any) => ({
      categories: state.news.get("categories"),
      users: state.login.users,
    }),
    shallowEqual
  );
  // 初始化 若是更新
  useEffect(() => {
    if (type && type === "update") {
      const { title, categoryId, content } = updates;
      formRef.current.setFieldsValue({
        title,
        categoryId,
      });
      setContent(content);
    }
  }, [type, updates]);

  // 获取draft 内容
  const getContent = (content: any) => {
    setContent(content);
  };
  // 下一步
  const next = () => {
    if (current === 0) {
      formRef.current
        .validateFields()
        .then((res: any) => {
          setformInfo(res);
          setCurrent(current + 1);
        })
        .catch((err: any) => message.error(err.errorFields[0].errors[0]));
    } else {
      if (content === "" || content.trim() === "<p></p>") {
        message.error("新闻内容不能为空");
      } else {
        setCurrent(current + 1);
      }
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handelEnd = (type: number) => {
    dispatch(getAuthorNewsAction());
    navigate(type ? "/audit-manage/list" : "/news-manage/draft");
    notification.info({
      message: `通知`,
      description: `您可以到${type ? "审核列表" : "草稿箱"}中查看您的新闻`,
      placement: "bottomRight",
    });
  };

  const handleSave = (type: number) => {
    let data: any = {
      ...formInfo,
      content: content,
      auditState: type,
    };
    if (props.type === "update") {
      patchNews({ ...data, id: updates.id }).then(() => {
        handelEnd(type);
      });
      return;
    }
    data = {
      ...data,
      region: users.region ? users.region : "全球",
      author: users.username,
      roleId: users.roleId,
      publishState: 0,
      createTime: Date.now(),
      star: 0,
      view: 0,
    };
    postNews(data).then((res: any) => {
      handelEnd(type);
    });
  };
  useEffect(() => {
    if (categories.size === 0 || categories.length === 0) {
      dispatch(getCategoriesAction());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AddWrapper current={current}>
      <PageHeader
        onBack={() => navigate(-1)}
        className="site-page-header"
        title={type ? "更新新闻" : "撰写新闻"}
        subTitle={type ? "哪里需要修改呢？" : "完成你的创作吧~"}
      />
      <div className="step-wrapper">
        <Steps current={current}>
          <Step
            title="基本信息"
            description="新闻标题，新闻分类"
            icon={<UserOutlined />}
          />
          <Step
            title="新闻内容"
            description="新闻主体内容"
            icon={<SolutionOutlined />}
          />
          <Step
            title="新闻提交"
            description="保存草稿或者提交审核"
            icon={<SmileOutlined />}
          />
        </Steps>
      </div>
      <div className="steps-common steps-basic">
        <div className="step-from">
          <Form {...layout} name="basic" ref={formRef}>
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: "请输入新闻标题!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[{ required: true, message: "请输入新闻分类!" }]}
            >
              <Select>
                {categories.length &&
                  categories.map((item: any) => (
                    <Option value={item.id} key={item.id}>
                      {item.title}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="steps-common steps-content">
        <DraftCustom getContent={getContent} defaultTxt={updates?.content} />
      </div>
      <div className="steps-common steps-save"></div>
      <div className="steps-action">
        {current < 2 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === 2 && (
          <span>
            <Button type="primary" onClick={() => handleSave(0)}>
              保存草稿箱
            </Button>
            <Button danger onClick={() => handleSave(1)}>
              提交审核
            </Button>
          </span>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            上一步
          </Button>
        )}
      </div>
    </AddWrapper>
  );
});

export default NewsAdd;
