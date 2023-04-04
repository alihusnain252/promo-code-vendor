import axios from 'axios';

const baseUrl = 'https://backend.buddysaver.net/';

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
    headers: { Authorization: AuthStr },
  });
  return res;
};


export const CreateAdRequest = async (token, data) => {
  try {
    let config = {
      method: 'post',
      url: 'api/vendor/promotion/create',
      baseURL: 'https://backend.buddysaver.net',
      headers: {
        'Authorization': 'Bearer '+ token.token,
        'Accept': '*/*',
        'Content-Type': 'multipart/form-data'
      },
      data: data
    };
    return await axios.request(config)

    // const res = await axios({
    //   method: 'post',
    //   url: baseUrl + 'api/vendor/promotion/create',
    //   // baseURL: baseUrl,
    //   headers: headers,
    //   data: data,
    // });
    // return res;
  } catch (error) {
    console.log('error', error)
    console.log('error2', JSON.stringify(error))
  }
};
