import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

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

export const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token')
  try {
    if(refresh_token){
        const config = {
          method: 'get',
          url: `${process.env.REACT_APP_API_HOST}/refresh`,
          headers: { 
            'Authorization': refresh_token
          }
        };
    
        const response = await axios(config);
        const token = response.data.new_access_token;
        localStorage.setItem('token', token);
        setAuthToken(token);
        return token;
    }
  } catch (error) {
    throw error;
  }
};

export const login = async (id_user, pw) => {
  try {
    const response = await api.post('/account/login', { id_user, pw });
    if(response.data.token){
      localStorage.setItem("user",id_user)
      const { token, refresh_token } = {token: response.data.token, refresh_token: response.data.refresh_token};
      setAuthToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', refresh_token);
      return { token, refreshToken };
    }
    return response.data
  } catch (error) {
    return error;
  }
};

export const checkTokenExpiration = () => {
  const token = localStorage.getItem('token')
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
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put('/banner/update',data);
      return response.data;
    }else{
      const response = await api.put('/banner/update',data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xãy ra',
      'error'
    )
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
export const updateAboutUs = async (content,content_en,image1,image2,image3) => {
  try {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('content', content);
    data.append('content_en', content_en);
    data.append('image1', image1);
    data.append('image2', image2);
    data.append('image3', image3);
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put(`/about/update`,data);
      return response.data;
    }else{
      const response = await api.put(`/about/update`,data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xãy ra',
      'error'
    )
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
export const updateWebinf = async (data) => {
  try {
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put('/webinf/update',data);
      return response.data;
    }else{
      const response = await api.put('/webinf/update',data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xãy ra',
      'error'
    )
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
export const updateProduct = async (id_product, name, des, des_en, image, id_group) => {
  try {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('id_product', id_product);
    data.append('des', des);
    data.append('name', name);
    data.append('des_en', des_en);
    data.append('image', image);
    data.append('id_group', id_group);
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put(`/product/update`,data);
      return response.data;
    }else{
      const response = await api.put(`/product/update`,data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xãy ra',
      'error'
    )
    throw error;
  }
};
export const addProduct = async (name, des, des_en, image, id_group) => {
  try {
    
    let id_user = localStorage.getItem("user")
    const FormData = require('form-data');
    let data = new FormData();
    data.append('id_user', id_user);
    data.append('des', des);
    data.append('name', name);
    data.append('des_en', des_en);
    data.append('image', image);
    data.append('id_group', id_group);
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.post(`/product/add`,data);
      return response.data;
    }else{
      const response = await api.post(`/product/add`,data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xãy ra',
      'error'
    )
    throw error;
  }
};
export const deleteProduct = async (id) => {
  try {
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.delete(`/product/delete/${id}`);
      return response.data;
    }else{
      const response = await api.delete(`/product/delete/${id}`);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xãy ra',
      'error'
    )
    throw error;
  }
};


export const getSubProducts = async () => {
  try {
    const response = await api.get(`/sub/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addSubProduct = async (name, content, content_en, image, id_product) => {
  try {
    let id_user = localStorage.getItem("user")
    const FormData = require('form-data');
    let data = new FormData();
    data.append('id_user', id_user);
    data.append('content', content);
    data.append('name', name);
    data.append('content_en', content_en);
    data.append('image', image);
    data.append('id_product', id_product);
    
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.post(`/sub/add`,data);
      return response.data;
    }else{
      const response = await api.post(`/sub/add`,data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xãy ra',
      'error'
    )
    throw error;
  }
};
export const updateSubProduct = async (id_sub, name, content, content_en, image, id_product) => {
  try {
    let id_user = localStorage.getItem("user")
    const FormData = require('form-data');
    let data = new FormData();
    data.append('id_sub', id_sub);
    data.append('id_user', id_user);
    data.append('content', content);
    data.append('name', name);
    data.append('content_en', content_en);
    data.append('image', image);
    data.append('id_product', id_product);
    
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put(`/sub/update`,data);
      return response.data;
    }else{
      const response = await api.put(`/sub/update`,data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xãy ra',
      'error'
    )
    throw error;
  }
};
export const deleteSubProduct = async (id) => {
  try {
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.delete(`/sub/delete/${id}`);
      return response.data;
    }else{
      const response = await api.delete(`/sub/delete/${id}`);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xãy ra',
      'error'
    )
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
    const id_user = localStorage.getItem('user')
    const FormData = require('form-data');
    let data = new FormData();
    data.append('name', name);
    data.append('name_en', name_en);
    data.append('content', content);
    data.append('content_en', content_en);
    data.append('image', image);
    data.append('author', '');
    data.append('id_user', id_user);
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.post('/post/add',data);
      return response.data;
    }else{
      const response = await api.post('/post/add',data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xãy ra',
      'error'
    )
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await api.get(`post/detail/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePost =  async (id,name,name_en,content,content_en, image) => {
  try {
    const id_user = localStorage.getItem('user')
    const FormData = require('form-data');
    let data = new FormData();
    data.append('id_post', id);
    data.append('image', image);
    data.append('name', name);
    data.append('name_en', name_en);
    data.append('content', content);
    data.append('content_en', content_en);
    data.append('author', '');
    data.append('id_user', id_user);
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put('/post/update',data);
      return response.data;
    }else{
      const response = await api.put('/post/update',data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xãy ra',
      'error'
    )
    throw error;
  }
} 
export const deletePost = async (id)=>{
  try {
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.delete(`/post/delete/${id}`);
      return response.data;
    }else{
      const response = await api.delete(`/post/delete/${id}`);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xãy ra',
      'error'
    )
    throw error;
  }
}