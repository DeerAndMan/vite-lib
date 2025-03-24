import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { toast } from "react-toastify";
import { encryptPassword } from "@/utils";
import { useAppDispatch } from "@/store/store";
import { userSlice } from "@/store/slices";
import { userApi } from "@/api";

import type { FormProps } from "antd";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export const Login = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  const login = (data: FieldType) => {
    if (!data.username || !data.password) return;
    // 密码加密
    const encryptedPassword = encryptPassword(data.password.trim(), 21);

    userApi
      .login(
        { username: data.username.trim(), password: encryptedPassword },
        { saltLength: 21 }
      )
      .then((res) => {
        if (res.code === 200 && res.data) {
          window.localStorage.setItem("token", res.data);
          dispatch(userSlice.setToken(res.data));
          navigator("/", { replace: true });
        } else {
          toast.error(res.msg);
        }
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
    <div className="flex h-screen w-full bg-gray-100">
      {/* 左侧部分 */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-r from-blue-500 to-blue-700 items-center justify-center">
        <div className="text-center text-white p-8">
          <h1 className="text-4xl font-bold mb-4">欢迎使用系统</h1>
          <p className="text-xl opacity-90">高效、安全的管理平台</p>
        </div>
      </div>

      {/* 右侧登录表单 */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl  font-bold text-center text-gray-800 mb-4">
            用户登录
          </h2>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              username: "test_name",
              password: "112233TT__TT",
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="w-full"
          >
            <Form.Item<FieldType>
              label="用户名"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input className="rounded" />
            </Form.Item>

            <Form.Item<FieldType>
              label="密码"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password className="rounded" />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
