import { Drawer, Row, Col, Card, Typography, Button, Form, Input, Divider, Checkbox } from "antd";
import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import PrometheusImage from "../../assets/prometheus.png";
import ElasticSearchImage from "../../assets/elasticsearch.svg";

const { Title } = Typography;
const { TextArea } = Input;

export default function Create({ visible, onClose }) {
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const handleSelectType = (type) => {
    if (type === selectedType) {
      setSelectedType(null);
      setSelectedDetails(null);
      form.resetFields(); // 清空表单
    } else {
      setSelectedType(type);
      const selectedDatasource = datasourceTypes.find((ds) => ds.value === type);
      setSelectedDetails(selectedDatasource);
      form.resetFields(); // 切换类型时清空表单
    }
  };

  const datasourceTypes = [
    {
      value: "Prometheus",
      label: "Prometheus",
      image: PrometheusImage,
      form: (
        <Form form={form} layout="vertical" onFinish={(values) => console.log("提交数据:", values)}>
          <Form.Item
            label="数据源名称"
            name="name"
            rules={[{ required: true, message: "请输入数据源名称" }]}
          >
            <Input placeholder="请输入数据源名称" />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <TextArea rows={4} placeholder="请输入备注" />
          </Form.Item>
          <Divider />
          <Form.Item
            label="Prometheus URL"
            name="url"
            rules={[{ required: true, message: "请输入 Prometheus URL" }]}
          >
            <Input placeholder="请输入 Prometheus URL" />
          </Form.Item>
          <Divider />
          <Form.List name="headers">
            {(fields, { add, remove }) => (
              <>
                <label style={{ fontWeight: "500" }}>Headers</label>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                    <Form.Item
                      {...restField}
                      name={[name, "key"]}
                      rules={[{ required: true, message: "请输入 Key" }]}
                      style={{ flex: 1, marginRight: 8 }}
                    >
                      <Input placeholder="Key" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[{ required: true, message: "请输入 Value" }]}
                      style={{ flex: 1, marginRight: 8 }}
                    >
                      <Input placeholder="Value" />
                    </Form.Item>
                    <MinusCircleOutlined
                      style={{ fontSize: "16px", color: "#ff4d4f", cursor: "pointer" }}
                      onClick={() => remove(name)}
                    />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加 Header
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Divider />
          <Form.Item
            name="authentication"
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <Checkbox>启用认证</Checkbox>
          </Form.Item>
          <Form.Item noStyle shouldUpdate={(prev, curr) => prev.authentication !== curr.authentication}>
            {({ getFieldValue }) =>
              getFieldValue("authentication") ? (
                <div style={{ marginTop: 10 }}>
                  <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: "请输入用户名" }]}
                  >
                    <Input placeholder="请输入用户名" />
                  </Form.Item>
                  <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: "请输入密码" }]}
                  >
                    <Input.Password placeholder="请输入密码" />
                  </Form.Item>
                </div>
              ) : null
            }
          </Form.Item>
          <Divider />
          <Form.Item name="skip_tls" valuePropName="checked">
            <Checkbox>跳过 TLS 证书验证</Checkbox>
          </Form.Item>
          <Divider />
          <Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
              <Button type="primary" htmlType="submit">
                测试并保存
              </Button>
              <Button type="default" onClick={() => console.log("取消")}>
                取消
              </Button>
            </div>
          </Form.Item>
        </Form>
      ),
    },
    {
      value: "ElasticSearch",
      label: "ElasticSearch",
      image: ElasticSearchImage,
      form: (
        <Form form={form} layout="vertical">
        </Form>
      ),
    },
  ];

  const renderDatasourceTypeCards = () => {
    return (
      <div style={{ padding: "20px 0" }}>
        <Row gutter={[16, 16]}>
          {datasourceTypes.map((dsType) => (
            <Col xs={24} sm={12} md={8} key={dsType.value}>
              <Card
                hoverable
                onClick={() => handleSelectType(dsType.value)}
                bodyStyle={{ padding: "0px" }}
                style={{
                  padding: "3px",
                  textAlign: "center",
                  position: "relative",
                  borderColor:
                    selectedType === dsType.value ? "#1890ff" : undefined,
                  boxShadow:
                    selectedType === dsType.value
                      ? "0 0 0 2px rgba(24,144,255,0.2)"
                      : undefined,
                }}
              >
                {selectedType === dsType.value && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      width: "0",
                      height: "0",
                      borderStyle: "solid",
                      borderWidth: "0 15px 15px 0",
                      borderColor: "transparent #1890ff transparent transparent",
                      zIndex: 1,
                      borderTopRightRadius: "4px",
                      overflow: "hidden",
                    }}
                  />
                )}
                {dsType.image && (
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "40%",
                    }}
                  >
                    <img
                      src={dsType.image}
                      alt={dsType.label}
                      style={{
                        width: "60%",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}
                <div>
                  <Title
                    level={5}
                    style={{ margin: "3px 0", textAlign: "center" }}
                  >
                    {dsType.label}
                  </Title>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  return (
    <Drawer title="添加数据源" open={visible} onClose={onClose} width="800px">
      {renderDatasourceTypeCards()}
      {selectedDetails && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Title level={5}>{selectedDetails.label}</Title>
          {selectedDetails.form}
        </div>
      )}
    </Drawer>
  );
}
