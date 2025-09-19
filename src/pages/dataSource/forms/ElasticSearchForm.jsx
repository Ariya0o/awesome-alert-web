import { Form, Input, Divider, Row, Col } from "antd";
import React from "react";

const { TextArea } = Input;

export default function ElasticSearchForm({ form, onSubmit }) {
  const handleFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="数据源名称"
        name="name"
        rules={[{ required: true, message: "请输入数据源名称" }]}
      >
        <Input placeholder="请输入数据源名称" />
      </Form.Item>
      
      <Divider />
      
      <Form.Item
        label="集群名称"
        name="clusterName"
        rules={[{ required: true, message: "请输入集群名称" }]}
      >
        <Input placeholder="请输入集群名称" />
      </Form.Item>
      
      <Divider />
      
      <Form.Item
        label="节点地址"
        name="nodes"
        rules={[{ required: true, message: "请输入节点地址" }]}
      >
        <TextArea 
          rows={3} 
          placeholder="请输入节点地址，多个地址用逗号分隔"
        />
      </Form.Item>
      
      <Divider />
      
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="用户名" name="username">
            <Input placeholder="请输入用户名（可选）" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="密码" name="password">
            <Input.Password placeholder="请输入密码（可选）" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}