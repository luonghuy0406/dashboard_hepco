import { Sync } from '@mui/icons-material';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

const api = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // baseURL: 'http://localhost:3001'
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
          url: `${process.env.REACT_APP_HOST}/refresh`,
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
//user---

export const checkPass = async (pw) => {
  try {
    const id = localStorage.getItem('user')
    const data = { id_user: id, pw : pw }
    const response = await api.post('/user/login', data)
    return response.data.status
  } catch (error) {
    return false;
  }
}

export const updateUser = async (pw) => {
  try {
    const id = localStorage.getItem('user')
    const name = localStorage.getItem('name')
    let data = {
      "id_user": id,
      "name": name,
      "pw": pw
    }
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put('/user/update',data);
      return response.data;
    }else{
      const response = await api.put('/user/update',data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
}



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
      'Đã có lỗi xảy ra',
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
      data.append('content_1', content1);
      data.append('content_1_en', content1EN);
      data.append('content_2', content2);
      data.append('content_2_en', content2EN);
      try {
        data.append('image', image, Date.now())
      } catch (error) {
        data.append('image', image)
      }
      
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
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
}

//---------archieve------------


export const addNewAchieve= async (name,name_en, content, content_en, image,type='achieve') => {
  try {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('name', name);
    data.append('name_en', name_en);
    data.append('content', content);
    data.append('content_en', content_en);
    data.append('type', type);
    try {
      data.append('image', image, Date.now())
    } catch (error) {
      data.append('image', image)
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
      'Đã có lỗi xảy ra',
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
}

export const getCertificate = async () => {
  try {
    const response = await api.get(`/certificate/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateAchieve = async (id,content,contentEN,name,nameEN,image,type='achieve') => {
  try {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('id_achieve', id);
    data.append('name', name);
    data.append('name_en', nameEN);
    data.append('content', content);
    data.append('content_en', contentEN);
    data.append('type', type);
    try {
      data.append('image', image, Date.now())
    } catch (error) {
      data.append('image', image)
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
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
}
export const deleteAchieve = async (id)=>{
  try {
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.delete(`/achieve/delete/${id}`);
      return response.data;
    }else{
      const response = await api.delete(`/achieve/delete/${id}`);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
}
//------company info-----
export const getCompanyInfo = async () => {
  try {
    const response = await api.get(`/company_data/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateWebinf = async (info) => {
  try {
    const FormData = require('form-data');
    let data = new FormData();
    Object.entries(info).forEach((dt)=>{
      data.append(dt[0], dt[1])
    })
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put('/company_data/update',data);
      return response.data;
    }else{
      const response = await api.put('/company_data/update',data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
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
    try {
      data.append('logo', image, Date.now())
    } catch (error) {
      data.append('logo', image)
    }
    data.append('name_en', '');
    data.append('content', '');
    data.append('content_en', '');
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
      'Đã có lỗi xảy ra',
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
    try {
      data.append('logo', image, Date.now())
    } catch (error) {
      data.append('logo', image)
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
      'Đã có lỗi xảy ra',
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
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
}

//-----post--------
export const getPosts = async (type,itemsPerPage=12,type_id=0, keyword='',page=1) => {
  try {
    const response = await api.get(`/${type}/list?c=${itemsPerPage}&type_id=${type_id}&title=${keyword}&p=${page-1}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getPostsHighlight = async () => {
  try {
    const response = await api.get(`/post/highlight`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getPostById = async (type,id) => {
  try {
    const response = await api.get(`${type}/detail/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addNewPost = async (type,type_id, name,name_en, content, content_en, image, key_post=0) => {
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
    data.append(`key_${type}`, key_post);
    try {
      data.append('image', image, Date.now())
    } catch (error) {
      data.append('image', image)
    }
    data.append('author', author);
    data.append('id_user', id_user);
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.post(`/${type}/add`,data);
      return response.data;
    }else{
      const response = await api.post(`/${type}/add`,data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
};
export const updatePost =  async (type,id,type_id,name,name_en,content,content_en, image,key_post=0) => {
  try {
    const id_user = localStorage.getItem('user')
    const author = localStorage.getItem('name')
    const FormData = require('form-data');
    let data = new FormData();
    data.append(`id_${type}`, id);
    data.append('type_id', type_id);
    data.append(`key_${type}`,key_post)
    try {
      data.append('image', image, Date.now())
    } catch (error) {
      data.append('image', image)
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
      const response = await api.put(`/${type}/update`,data);
      return response.data;
    }else{
      const response = await api.put(`/${type}/update`,data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
} 
export const deletePost = async (type,id)=>{
  try {
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.delete(`/${type}/delete/${id}`);
      return response.data;
    }else{
      const response = await api.delete(`/${type}/delete/${id}`);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
}

//--------service-----------

export const getDetailService = async (id) =>{
  try {
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.get(`/service/detail/${id}`);
      return response.data;
    }else{
      const response = await api.get(`/service/detail/${id}`);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
}

export const updateService = async (id_service,name,name_en,content,content_en, image) => {
  try {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('id_service', id_service);
    try {
      data.append('image', image, Date.now())
    } catch (error) {
      data.append('image', image)
    }
    data.append('name', name);
    data.append('name_en', name_en);
    data.append('content', content);
    data.append('content_en', content_en);
    data.append('review', content);
    data.append('review_en', content_en);
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put('/service/update',data);
      return response.data;
    }else{
      const response = await api.put('/service/update',data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
} 

//------qna-------------
export const getQuestion = async (itemsPerPage=12,page=1) => {
  try {
    const response = await api.get(`/qna/list?c=${itemsPerPage}&p=${page-1}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const deleteQuestion = async (id) => {
  try {
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.delete(`/qna/delete/${id}`);
      return response.data;
    }else{
      const response = await api.delete(`/qna/delete/${id}`);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
}
export const updateQuestion = async (id_qna,question,question_en,answer,answer_en, key_qna) => {
  try {
    let data = new FormData();
    data.append('question', question);
    data.append('question_en', question_en);
    data.append('answer',answer)
    data.append('answer_en',answer_en)
    data.append('key_qna',key_qna)
    data.append('id_qna',id_qna)
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put('/qna/update',data);
      return response.data;
    }else{
      const response = await api.put('/qna/update',data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
} 
export const addQuestion = async (question,question_en,answer,answer_en) => {
  try {
    let data = new FormData();
    data.append('question', question);
    data.append('question_en', question_en);
    data.append('answer',answer)
    data.append('answer_en',answer_en)
    data.append('key_qna','0')
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.post('/qna/add',data);
      return response.data;
    }else{
      const response = await api.post('/qna/add',data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
} 


//--------gallery------

export const getListImages = async (itemsPerPage=20,page=1,id_album) => {
  try {
    const response = await api.get(`/library/list?c=${itemsPerPage}&p=${page-1}&id_album=${id_album}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateImage = async (id_image, des, des_en) => {
  try {
    let data = new FormData();
    data.append('id_image', id_image);
    data.append('des', des);
    data.append('des_en',des_en)
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put('/library/update',data);
      return response.data;
    }else{
      const response = await api.put('/library/update',data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
}

export const deleteImage = async (id) => {
  try {
    const response = await api.delete(`/library/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const addListImages = async (images=[],id_album="1", des=" ", des_en=" ") => {
  try {
    let data = new FormData();
    data.append('id_album', id_album);
    data.append('des', des);
    data.append('des_en',des_en)
    Object.values(images).forEach((image,index)=>{
      data.append('image', image, Date.now()+'.'+index)
    })
    const author = localStorage.getItem('name')
    data.append('author', author);
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.post('/library/addmulti',data);
      return response.data;
    }else{
      const response = await api.post('/library/addmulti',data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
}

export const getListAlbums = async (itemsPerPage=20,page=1) => {
  try {
    const response = await api.get(`album/list?p=${page-1}&c=${itemsPerPage}&name=`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const deleteAlbum = async (id) => {
  try {
    if(id == "1"){
      return {
        "result": {
            "status": "error",
            "msg": "Không thể xoá album này"
        }
    }
    }
    const response = await api.delete(`/album/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateAlbum = async (id_album,name,name_en, des, des_en) => {
  try {
    let data = new FormData();
    data.append('id_album', id_album);
    data.append('des', des);
    data.append('des_en',des_en)
    data.append('name', name);
    data.append('name_en',name_en)
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put('/album/update',data);
      return response.data;
    }else{
      const response = await api.put('/album/update',data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
}
export const addAlbum = async (name,name_en ,des, des_en) => {
  try {
    let data = new FormData();
    data.append('des', des);
    data.append('des_en',des_en)
    data.append('name', name);
    data.append('name_en',name_en)
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.post('/album/add',data);
      return response.data;
    }else{
      const response = await api.post('/album/add',data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
}

//-------------vision-mission---------
export const getSharedtable = async (id) => {
  try {
    const response = await api.get(`/sharedtable/detail/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getListSharedtable = async (id) => {
  try {
    const response = await api.get(`/sharedtable/father/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const updateSharedtable = async (value) => {
  try {
    let data = new FormData();
    Object.entries(value).forEach((dt)=>{
      if(dt[0] == 'image' && typeof dt[1] == 'string'){
        dt[1] = []
        data.append(dt[0], dt[1])
      }else if(dt[0] == 'image'){
        try {
          data.append('image', dt[1], Date.now())
        } catch (error) {
          data.append('image', dt[1])
        }
      }else{
        data.append(dt[0], dt[1] || " ")
      }
    })
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put('/sharedtable/update',data);
      return response.data;
    }else{
      const response = await api.put('/sharedtable/update',data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
}

export const getVideoLink = async () => {
  try {
    const response = await api.get(`/company_data/detail/15`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteImageSharetable = async (id) => {
  try {
    const response = await api.put(`/sharedtable/removeimage/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
//---------history-----------

export const getListHistory = async (id) => {
  try {
    const response = await api.get(`/history/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const updateHistory = async (value) => {
  try {
    let data = new FormData();
    Object.entries(value).forEach((dt)=>{
      data.append(dt[0], dt[1])
    })
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.put('/history/update',data);
      return response.data;
    }else{
      const response = await api.put('/history/update',data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
}

export const addHistory = async (value) => {
  try {
    let data = new FormData();
    Object.entries(value).forEach((dt)=>{
      data.append(dt[0], dt[1])
    })
    if(checkTokenExpiration()){
      const new_token = await refreshToken()
      api.defaults.headers.common['Authorization'] = `${new_token}`;
      const response = await api.post('/history/add',data);
      return response.data;
    }else{
      const response = await api.post('/history/add',data);
      return response.data;
    }
  } catch (error) {
    Swal.fire(
      'Error',
      'Đã có lỗi xảy ra',
      'error'
    )
    throw error;
  }
}
export const deleteHistory = async (id) => {
  try {
    const response = await api.delete(`/history/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}