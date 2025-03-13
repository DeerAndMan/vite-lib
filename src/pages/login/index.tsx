import { Button, Checkbox, Form, Input } from "antd";

import { encryptPassword } from "@/utils";
import { userApi } from "@/api";

import type { FormProps } from "antd";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export const Login = () => {
  const login = (data: FieldType) => {
    if (!data.username || !data.password) return;
    // console.log("data", data);
    // 密码加密
    const encryptedPassword = encryptPassword(data.password, 21);

    userApi
      .login(
        { username: data.username, password: encryptedPassword },
        { saltLength: 21 }
      )
      .then((res) => {
        console.log("登录成功", res);
      });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    login(values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        username: "test_name",
        password: "112233TT__TT",
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="用户名"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="密码"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        label={null}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
