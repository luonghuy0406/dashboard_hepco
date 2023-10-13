import axios from 'axios';
import jwtDecode from 'jwt-decode';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_HOST}/refresh`,
        headers: { 
          'Authorization': refreshToken
        }
    };
      
    axios.request(config)
    const response = await axios.request(config)
    const { token } = response.data.new_access_token;
    setAuthToken(token);
    return token;
  } catch (error) {
    throw error;
  }
};

export const login = async (id_user, pw) => {
  try {
    const response = await api.post('/account/login', { id_user, pw });
    if(response.data.token){
      const { token, refreshToken } = {token: response.data.token, refreshToken: response.data.refresh_token};
      setAuthToken(token);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('refreshToken', refreshToken);
      return { token, refreshToken };
    }
    return response.data
  } catch (error) {
    return error;
  }
};

export const checkTokenExpiration = (token) => {
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      
      return true;
    }
  }
  return false;
};

//----------GET DATA------------
//banner----------
export const getBanner = async () => {
  try {
    const response = await api.get(`/banner/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const replaceBanner = async (id, file) => {
  try {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('id_bn', id);
    data.append('image', file);
    const response = await api.put('/banner/update',data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
//-----------about us-----
export const getAboutUs = async () => {
  try {
    const response = await api.get(`/about-us`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//------company info-----
export const getCompanyInfo = async () => {
  try {
    const response = await api.get(`/webinf/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//Product--------------
export const getListProducts = async () => {
  try {
    const response = await api.get(`/product/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/product/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//-----post--------
export const getPosts = async () => {
  try {
    const response = await api.get(`/post/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addNewPost = async (name,name_en, content, content_en, image) => {
  try {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('name', name);
    data.append('name_en', name_en);
    data.append('content', content);
    data.append('content_en', content_en);
    data.append('image', image);
    data.append('author', '');
    data.append('id_user', '');

    const response = await api.post('/post/add',data);
    return response.data;
  } catch (error) {
    throw error;
  }
};