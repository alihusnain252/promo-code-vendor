import axios from 'axios';

const baseUrl = 'https://backend.buddysaver.net';

export const LoginPostRequest = async (data, url) => {
  console.log('signUInData :', data.password);
  console.log('signIn URl :', url);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const res = await axios({
    method: 'post',
    url: url,
    baseURL: baseUrl,
    data: data,
    headers: headers,
  });
  return res;
};
export const GetRequest = async (token, url) => {
  const AuthStr = 'Bearer '.concat(token);
  const res = await axios({
    method: 'get',
    url: url,
    baseURL: baseUrl,
    headers: {Authorization: AuthStr},
  });
  return res;
};
export const CreateAdRequest = async (token, data, url) => {
  console.log('signUInData :', data);
  console.log('signIn URl :', url);
  const AuthStr = 'Bearer '.concat(token);

  const res = await axios({
    method: 'post',
    url: url,
    baseURL: baseUrl,
    data: data,
    headers: {Authorization: AuthStr, 'Content-Type': 'multipart/form-data'},
  });
  return res;
};
export const PostRequest = async (userToken, data, url) => {
  try {
    console.log('postData :', data);
    console.log('post URl :', url);
    const AuthStr = 'Bearer '.concat(userToken);
    // console.log(AuthStr);
  
    const res = await axios({
      method: 'post',
      url: url,
      baseURL: baseUrl,
      data: data,
      headers: {Authorization: AuthStr, 'Content-Type': 'application/x-www-form-urlencoded'},
    });
    return res;
  } catch (error) {
    console.log("Post request Error :",error);
  }
};
