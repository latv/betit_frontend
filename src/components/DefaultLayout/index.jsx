import React, { useState, useEffect } from 'react';
import Router from 'components/Router';
import { Layout, Row, Col, Spin, Menu, Dropdown } from 'antd';
import { WalletOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import APIClient from 'utils/apiClient';
import numberFormatter from 'utils/numberFormatter';
import AddMoneyModal from 'components/AddMoneyModal';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import './styles.scss';
import TakeAmountModal from 'components/TakeAmountModal';
import { LoadingOutlined } from '@ant-design/icons';


const { Header, Content, Footer } = Layout;
const xsWidth = 22;
const mdWidth = 18;
const lgWidth = 16;

const DefaultLayout = () => {
  const [walletAmount, setWalletAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
  const [isTakeMoneyModalOpen, setIsTakeMoneyModalOpen] = useState(false);


  useEffect(() => {


    getWalletAmount();
  }, []);


  const getWalletAmount = async () => {
    let response = await APIClient.request(
      '/api/wallet/get-amount',
      {},
      'GET'
    );

    setWalletAmount(response);
    setIsLoading(false);
  }

  const logOut = async () => {
    try {
      let response = await APIClient.request(
        '/api/auth/logout',
        {},
        'POST'
      );

      console.log(response);
    } catch (err) {
      console.log(err)
    }

    Cookies.remove('jwt_token');
    document.location.reload(true);
  }

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={() => {
          setIsAddMoneyModalOpen(true)
        }}>Add money</div>
      </Menu.Item>
      <Menu.Item key="1">
        <div onClick={() => {
          setIsTakeMoneyModalOpen(true)
        }}
        >Withdraw money</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="min-h-100">
      <Header className="app-header">
        <Row justify="center" >
          <Col xs={xsWidth} md={mdWidth} lg={lgWidth}>
            <NavLink to="/">
              <img src="betit-logo-light.svg" alt="betit logo" height={40}
              className="brand-logo" />
            </NavLink>
            <div className="app-header-content">
              <div className="wallet-amount">
              <NavLink to="/wallet">
                <WalletOutlined />
                </NavLink>
                <p>My wallet</p>
                <Spin spinning={isLoading} className="amount-spinner" indicator={antIcon}>
                  <Dropdown overlay={menu} trigger={['click']}>
                      <p className="amount-with-currency">
                        {numberFormatter.formatMoney(walletAmount)}&euro;
                      </p>
                  </Dropdown>
                </Spin>
              </div>
              <NavLink to="/profile">
                <UserOutlined />
              </NavLink>
              <LogoutOutlined onClick={logOut} />
            </div>
          </Col>
        </Row>
      </Header>
      <Content className="app-content">
        <Row justify="center" >
          <Col xs={xsWidth} md={mdWidth} lg={lgWidth}>
            <div className="app-container">
              <Router walletAmount={walletAmount} getWalletAmount={getWalletAmount}/>

            </div>
          </Col>
        </Row>
      </Content>
      <Footer className="app-footer">
        <Row justify="center">
          <Col xs={xsWidth} md={mdWidth} lg={lgWidth}>
            @Copyright 2020, GetIT school
          </Col>
        </Row>
      </Footer>
      <AddMoneyModal
        visible={isAddMoneyModalOpen}
        setIsAddMoneyModalOpen={setIsAddMoneyModalOpen}
        setWalletAmount={setWalletAmount}
      />
            <TakeAmountModal
        visible={isTakeMoneyModalOpen}
        setIsTakeMoneyModalOpen={setIsTakeMoneyModalOpen}
        setWalletAmount={setWalletAmount}
      />
    </Layout>
  )
}

export default DefaultLayout;
