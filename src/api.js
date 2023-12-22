import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

const api = axios.create({
  // baseURL: http://localhost:3001,
    baseURL: 'http://localhost:3001'
});

export const setAuthToken = (token) => {
  if (token && token != 'undefined') {
    api.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token')
  try {
    if(refresh_token){
        const decodedToken = jwtDecode(refresh_token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          window.location.replace(`/login`)
        }
        const config = {
          method: 'get',
          url: `http://localhost:3001/refresh`,
          headers: { 
            'Authorization': refresh_token
          }
        };
        const response = await axios(config);
        const token = response.data.new_access_token;
        
        if(response.data =="Mã không hợp lệ"){
          window.location.replace(`/login`)
        }
        if(token && token != 'undefined'){
          localStorage.setItem('token', token);
          setAuthToken(token);
        }
        return token;
    }
  } catch (error) {
    window.location.replace(`/login`)
    throw error;
  }
};

export const login = async (id_user, pw) => {
  try {
    const response = await api.post('/user/login', { id_user, pw });
    if(response.data.token){
      const { token, refresh_token } = {token: response.data.token, refresh_token: response.data.refresh_token};
      setAuthToken(token);
      localStorage.setItem("user",response.data.user.id_user)
      localStorage.setItem("name",response.data.user.name)
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
export const deleteBanner = async (id) => {
  try {
    const response = await api.delete(`/banner/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addBanner = async (content1,content1EN,content2,content2EN,image) => {
  try {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('name', content1);
    data.append('name_en', content1EN);
    data.append('quote', content2);
    data.append('quote_en', content2EN);
    data.append('image', image);
    
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put('/banner/add',data);
      return response.data;
    }else{
      const response = await api.post('/banner/add',data);
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

export const updateBanner = async (id,content1,content1EN,content2,content2EN,image) => {
  try {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('id_banner', id);
    data.append('name', content1);
    data.append('name_en', content1EN);
    data.append('quote', content2);
    data.append('quote_en', content2EN);
    if(typeof image == 'object'){
      data.append('image', image, Date.now());
    }else{
      data.append('image', image);
    }
    
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put('/banner/update',data);
      return response.data;
    }else{
      const response = await api.post('/banner/update',data);
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

//---------archieve------------


export const addNewAchieve= async (name,name_en, content, content_en, image) => {
  try {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('name', name);
    data.append('name_en', name_en);
    data.append('content', content);
    data.append('content_en', content_en);
    if(typeof image == 'object'  && image?.name){
      data.append('image', image, Date.now());
    }else{
      data.append('image', image);
    }
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.post('/achieve/add',data);
      return response.data;
    }else{
      const response = await api.post('/achieve/add',data);
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
export const getAchieve = async () => {
  try {
    const response = await api.get(`/achieve/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateAchieve = async (id,content,contentEN,name,nameEN,image) => {
  try {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('id_achieve', id);
    data.append('name', name);
    data.append('name_en', nameEN);
    data.append('content', content);
    data.append('content_en', contentEN);
    if(typeof image == 'object'){
      data.append('image', image, Date.now());
    }else{
      data.append('image', image);
    }
    
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put('/achieve/update',data);
      return response.data;
    }else{
      const response = await api.put('/achieve/update',data);
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
    if(typeof image1 == 'object' && image1?.name){
      data.append('image1', image1, Date.now());
    }else{
      data.append('image1', image1);
    }
    if(typeof image2 == 'object' && image2?.name){
      data.append('image2', image2, Date.now());
    }else{
      data.append('image2', image2);
    }
    if(typeof image3 == 'object' && image3?.name){
      data.append('image3', image3, Date.now());
    }else{
      data.append('image3', image3);
    }
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
//------partner---------
export const getCustomer = async () => {
  try {
    const response = await api.get(`/customer/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addNewCustomer = async (name, image) => {
  try {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('name', name);
    if(typeof image == 'object' && image?.name){
      data.append('image', image, Date.now());
    }else{
      data.append('image', image);
    }
    data.append('name_en', '');
    data.append('detail', '');
    data.append('detail_en', '');
    if(checkTokenExpiration){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.post('/customer/add',data);
      return response.data;
    }else{
      const response = await api.post('/customer/add',data);
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
export const updateCustomer =  async (id,name, image) => {
  try {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('id', id);
    
    data.append('name', name);
    if(typeof image == 'object'  && image?.name){
      data.append('image', image, Date.now());
    }else{
      data.append('image', image);
    }
    data.append('name_en', '');
    data.append('detail', '');
    data.append('detail_en', '');
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put('/customer/update',data);
      return response.data;
    }else{
      const response = await api.put('/customer/update',data);
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
export const deleteCustomer = async (id)=>{
  try {
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.delete(`/customer/delete/${id}`);
      return response.data;
    }else{
      const response = await api.delete(`/customer/delete/${id}`);
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
//Product--------------
export const getListProducts = async () => {
  try {
    const response = await api.get(`/product/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateProduct = async (id_product, name, des, des_en, image, id_group, brochure) => {
  try {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('id_product', id_product);
    data.append('des', des);
    data.append('name', name);
    data.append('des_en', des_en);
    if(typeof image == 'object'  && image?.name){
      data.append('image', image, Date.now());
    }else{
      data.append('image', image);
    }
    data.append('id_group', id_group);
    data.append('brochure', brochure);
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
export const addProduct = async (name, des, des_en, image, id_group, brochure) => {
  try {
    
    let id_user = localStorage.getItem("user")
    const FormData = require('form-data');
    let data = new FormData();
    data.append('id_user', id_user);
    data.append('des', des);
    data.append('name', name);
    data.append('des_en', des_en);
    if(typeof image == 'object'  && image?.name){
      data.append('image', image, Date.now());
    }else{
      data.append('image', image);
    }
    data.append('id_group', id_group);
    data.append('brochure', brochure);
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
    data.append('name', name  && image?.name);
    data.append('content_en', content_en);
    if(typeof image == 'object'){
      data.append('image', image, Date.now());
    }else{
      data.append('image', image);
    }
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
    if(typeof image == 'object'  && image?.name){
      data.append('image', image, Date.now());
    }else{
      data.append('image', image);
    }
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
export const getPosts = async (itemsPerPage=12,type_id=0, keyword='',page=1) => {
  try {
    const response = await api.get(`/post/list?c=${itemsPerPage}&type_id=${type_id}&title=${keyword}&p=${page-1}`);
    return response.data;
  } catch (error) {
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

export const addNewPost = async (type_id, name,name_en, content, content_en, image) => {
  try {
    const id_user = localStorage.getItem('user')
    const author = localStorage.getItem('name')
    const FormData = require('form-data');
    let data = new FormData();
    data.append('type_id',type_id)
    data.append('name', name);
    data.append('name_en', name_en);
    data.append('content', content);
    data.append('content_en', content_en);
    if(typeof image == 'object'  && image?.name){
      data.append('image', image, Date.now());
    }else{
      data.append('image', image);
    }
    data.append('author', author);
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
export const updatePost =  async (id,type_id,name,name_en,content,content_en, image) => {
  try {
    const id_user = localStorage.getItem('user')
    const author = localStorage.getItem('name')
    const FormData = require('form-data');
    let data = new FormData();
    data.append('id_post', id);
    data.append('type_id', type_id);
    if(typeof image == 'object'  && image?.name){
      data.append('image', image, Date.now());
    }else{
      data.append('image', image);
    }
    data.append('name', name);
    data.append('name_en', name_en);
    data.append('content', content);
    data.append('content_en', content_en);
    data.append('author', author);
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