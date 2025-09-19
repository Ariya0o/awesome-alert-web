import {
  Drawer,
  Row,
  Col,
  Card,
  Typography,
  Form,
  Button,
  Space,
  Divider,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import PrometheusImage from "../../assets/prometheus.png";
import ElasticSearchImage from "../../assets/elasticsearch.svg";
import { PrometheusForm, ElasticSearchForm } from "./forms";
import { testDataSource } from "../../api/dataSource";

const { Title } = Typography;

const DATASOURCE_TYPES = {
  Prometheus: {
    label: "Prometheus",
    image: PrometheusImage,
    Component: PrometheusForm,
  },
  ElasticSearch: {
    label: "ElasticSearch",
    image: ElasticSearchImage,
    Component: ElasticSearchForm,
  },
};

export default function Create({ visible, onClose }) {
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(false);
  // 在Drawer内触发时，静态的message会挂载到document.body，容易被抽屉的遮罩层覆盖
  const [messageApi, contextHolder] = message.useMessage();

  // 抽屉关闭时重置状态
  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setSelectedType(null);
    }
  }, [visible, form]);

  const handleSelectType = (type) => {
    const newType = selectedType === type ? null : type;
    setSelectedType(newType);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    if (loading) return; // 防止重复提交

    try {
      setLoading(true);
      const testData = {
        type: selectedType,
        config: values,
      };
      // 调用测试接口
      messageApi.info("正在测试连接...");
      const result = await testDataSource(testData);

      if (result?.success) {
        messageApi.success("测试成功！");

        // 成功后关闭抽屉
        onClose();
      } else {
        messageApi.error(result?.message || "测试失败");
      }
    } catch (error) {
      messageApi.error("测试过程中发生错误");
    } finally {
      setLoading(false);
    }
  };

  const SelectedFormComponent = selectedType
    ? DATASOURCE_TYPES[selectedType]?.Component
    : null;

  return (
    <Drawer title="添加数据源" open={visible} onClose={onClose} width="800px">
      {contextHolder}
      {/* 类型选择卡片 */}
      <div style={{ padding: "20px 0" }}>
        <Row gutter={[16, 16]}>
          {Object.entries(DATASOURCE_TYPES).map(([key, config]) => (
            <Col xs={24} sm={12} md={8} key={key}>
              <Card
                hoverable
                onClick={() => handleSelectType(key)}
                styles={{ body: { padding: "0px" } }}
                style={{
                  padding: "3px",
                  textAlign: "center",
                  borderColor: selectedType === key ? "#1890ff" : undefined,
                  boxShadow:
                    selectedType === key
                      ? "0 0 0 2px rgba(24,144,255,0.2)"
                      : undefined,
                }}
              >
                {config.image && (
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "80px",
                    }}
                  >
                    <img
                      src={config.image}
                      alt={config.label}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}
                <Title
                  level={5}
                  style={{ margin: "3px 0", textAlign: "center" }}
                >
                  {config.label}
                </Title>
                {/* div绘制三角形高亮标识无意义，要么你找个图标要么就用简单的文字符号(tips for jimingyu) */}
                {selectedType === key && (
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      color: "#1890ff",
                      fontSize: "20px",
                    }}
                  >
                    ✓
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 选中的表单 */}
      {SelectedFormComponent && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Title level={5}>{DATASOURCE_TYPES[selectedType].label}</Title>
          <SelectedFormComponent form={form} onSubmit={handleSubmit} />

          <Divider />

          <Space>
            <Button
              type="primary"
              onClick={() => form.submit()}
              loading={loading}
            >
              测试并保存
            </Button>
            <Button onClick={onClose} disabled={loading}>
              取消
            </Button>
          </Space>
        </div>
      )}
    </Drawer>
  );
}
