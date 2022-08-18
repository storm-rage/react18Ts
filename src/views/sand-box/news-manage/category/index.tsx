import React, { memo, useState, useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Button, Form, Input, Table, Modal } from "antd";
import type { FormInstance } from "antd/es/form";
import type { InputRef } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import {
  getCategoriesAction,
  patchCategoriesAction,
  deleteCategoriesAction,
} from "../store/actions";

const { confirm } = Modal;
const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}
interface EditableRowProps {
  index: number;
}

const NewsCategory = memo(() => {
  const dispatch: any = useDispatch();
  const { categories } = useSelector(
    (state: any) => ({ categories: state.news.get("categories") }),
    shallowEqual
  );
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id: number) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "栏目名称",
      dataIndex: "title",
      onCell: (record: any) => ({
        record,
        editable: true,
        dataIndex: "title",
        title: "栏目名称",
        handleSave: handleSave,
      }),
    },
    {
      title: "操作",
      render: (item: any) => {
        return (
          <div>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => confirmMethod(item)}
            />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getCategoriesAction());
    // eslint-disable-next-line
  }, []);

  const handleSave = (record: any) => {
    if (record.title !== record.value) {
      dispatch(patchCategoriesAction({ ...record, value: record.title }));
    }
  };
  // 配置可编辑行 start
  const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
  }

  const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
      if (editing) {
        inputRef.current!.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();

        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  //end

  const confirmMethod = (item: any) => {
    confirm({
      title: "你确定要删除?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMethod(item.id);
      },
    });
  };
  const deleteMethod = (id: number) => {
    dispatch(deleteCategoriesAction(id));
  };
  return (
    <div>
      <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        columns={columns}
        dataSource={categories.length && categories}
        pagination={{ pageSize: 20 }}
        scroll={{ y: 700 }}
        rowKey={(item: any) => item.id}
      />
    </div>
  );
});

export default NewsCategory;
