import React, {useState} from 'react';
import { Form, Row, Col, message,DatePicker } from 'antd';
import { withRouter } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Input from 'components/Input';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import APIClient from 'utils/apiClient';

import { NavLink } from 'react-router-dom';
// import './styles.scss';

const Signin = () => {
  const [loading, setLoading] = useState(false);



  const onFinish = async (values) => {
    // values.preventDefault();
    try {
      // setLoading(true);
      let response = await APIClient.request(
        '/api/auth/register',
        {
            name: values.firstName,
            last_name:values.lastName,
            birthday:moment(values.date).format("YYYY-MM-DD"),
            username: values.username,
            email: values.email,
            password: values.password,
        },
        'POST'
      );
      // message.error(response);
      // setLoading(false);
      message.info("You are sucesfully registered");
    } catch (err) {
      message.error("error not registered!");

      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Row align="middle" justify="center" className="h-100" >
      <Col xs={22} sm={16} md={12} lg={8}>
        <div className="login-card">

          <h3>Registration</h3>
          <Form
          onsubmit="event.preventDefault(); validateMyForm();"
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}

          >
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
          ]}
        >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="FirstName" />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="LastName" />
        </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item   name= "date">
                <DatePicker disabledTime  placeholder="birthday" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button loading={loading}
               block type="primary" htmlType="submit"
            // onClick={onFinish}
               className="login-form-button">
                Sign up
              </Button>
              <NavLink to='/login'>Login in</NavLink>

            </Form.Item>
          </Form>
                  </div>
      </Col>
    </Row>
  );
};

export default withRouter(Signin);