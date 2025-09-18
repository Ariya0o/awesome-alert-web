import { getDataSource } from "../../api/dataSource"; // 使用相对路径/dataSource"; // 确保路径指向具体文件
import React, { useRef, useState, useEffect } from "react";
import { Button, Input, Tag, message } from "antd";
import { ProTable } from "@ant-design/pro-components";
import  Create  from './create';

export default function DataSource() {
  const { Search } = Input;
  const [visible, setVisible] = useState(false);
  const actionRef = useRef();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = (value) => {
    console.log(value);
  };

  const handleClose = () => {
    setVisible(false)
  };

  const handleList = async () => {
    try {
        const response = await getDataSource()
        setData(response)
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getDataSource();
        setData(response);
      } catch (error) {
        message.error("获取数据失败，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "数据源类型",
      dataIndex: "type",
      key: "type",
      ellipsis: true,
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "启用" : "禁用"}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <Search
            allowClear
            placeholder="输入搜索关键字"
            onSearch={onSearch}
            style={{ width: 300 }}
          />
        </div>
        <div>
          <Button
            type="primary"
            style={{ backgroundColor: "#000000" }}
            onClick={() => setVisible(true)}
          >
            创 建
          </Button>
        </div>
      </div>

      <Create visible={visible} onClose={handleClose} type='create' handleList={handleList}  />

      <ProTable
        actionRef={actionRef}
        columns={columns}
        dataSource={data}
        rowKey="key"
        loading={loading}
        search={false} // 禁用 ProTable 自带的搜索框
        pagination={{
          pageSize: 5,
        }}
        toolBarRender={false} // 隐藏工具栏
      />
    </div>
  );
}
