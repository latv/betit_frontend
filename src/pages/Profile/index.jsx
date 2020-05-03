import React, {useEffect,useState}from 'react';
import APIClient from 'utils/apiClient';
import {Spin} from 'antd';
import isAuthorized from 'utils/jwt';
import { LoadingOutlined } from '@ant-design/icons';

const Profile = () => {

  const [profile,setProfile]=useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {getProfile()},[]);

  const getProfile = async () => {
    let response = await APIClient.request(
      '/api/auth/me',
      {},
      'GET'
    );

    setProfile(response);
    setIsLoading(false);
  }

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div>
      <Spin spinning={isLoading} indicator={antIcon}>
        <h1>Username: {profile.username}</h1>
        <h1>Name: {profile.name}</h1>
        <h1>Last name: {profile.last_name}</h1>
        <h1>Birthday: {profile.birthday}</h1>
        <h1>Adress: {profile.address}</h1>
      </Spin>
    </div>
  )
}

export default Profile;