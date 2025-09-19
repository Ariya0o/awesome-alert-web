import { Form, Input, Divider, Checkbox, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export default function PrometheusForm({ form, onSubmit }) {
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
              <div
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
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
                <Form.Item>
                  <MinusCircleOutlined
                    style={{
                      fontSize: "16px",
                      color: "#ff4d4f",
                      cursor: "pointer",
                    }}
                    onClick={() => remove(name)}
                  />
                </Form.Item>
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

      <Form.Item name="authentication" valuePropName="checked">
        <Checkbox>启用认证</Checkbox>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prev, curr) =>
          prev.authentication !== curr.authentication
        }
      >
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
    </Form>
  );
}
