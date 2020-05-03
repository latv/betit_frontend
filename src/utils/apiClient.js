import axios from 'axios';
import jwt from './jwt';
import {message} from 'antd';
const request = async (url, data, method,isAuthorized=true) => {

  const requestConfig = {
    url: url,
    method: method,
    baseURL: process.env.REACT_APP_BACKEND_URL,
    responseType: 'json',
    // headers: {'Authorization': jwt.getHeader()},
  };
  if (jwt.isAuthorized())
  {
    requestConfig.headers = {'Authorization': jwt.getHeader()};
  }
  if (isAuthorized===false){
    requestConfig.headers = {'Authorization': jwt.getHeader()};
    console.log("not authorizet");
  }

  if (method === 'GET') {
    requestConfig.params = data;
  } else {
    requestConfig.data = data;
  }

  try {
    const response = await axios.request(requestConfig);

  // if (url=== '/api/auth/refresh'){
  //   console.log('jwt stuff',response.data.token);
  //   jwt.deleteToken();
  //   jwt.saveToken(response.data.token,response.data.expiresIn);
  // }
    return response.data;
  } catch (e) {
    console.log('error: ',e.response.status);
    if(e.response.status === 401 && isAuthorized === true){
      try{
      let response = await request('/api/auth/refresh',{},"GET",false);
      jwt.deleteToken();
      jwt.saveToken(response.token, response.expiresIn);
      console.log("response: ",response);
try{
      let response_2 = await request(url, data, method,isAuthorized=true);
      return response_2;} catch(e2){
        console.log(e);
        jwt.deleteToken();
        document.location.reload(true);
        // jwt.deleteToken();
      }

    }
      catch(e){
        console.log(e);
        jwt.deleteToken();
        document.location.reload(true);
        // jwt.deleteToken();

      }

    }
    throw e;




  }
}


export default { request };
