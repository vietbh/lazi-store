import api from '../config/axios'; // Đường dẫn đến file chứa cấu hình API

export const fetchSearchData = async (search) =>{
  try {
    const response = await api.get(('/search?search=').concat(search));
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error); 
  }
};

export const fetchHotProduct = async () =>{
  try {
    const response = await api.get('/san-pham-hot');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error); 
  }
};
export const fetchNewProduct = async () =>{
  try {
    const response = await api.get('/san-pham-moi');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error); 
  }
};
export const fetchLaptopProduct = async () =>{
  try {
    const response = await api.get('/san-pham-laptop');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error); 
  }
};
export const fetchPCProduct = async () =>{
  try {
    const response = await api.get('/san-pham-pc');
    // console.log(response);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error); 
  }
};
export const fetchTabletProduct = async () =>{
  try {
    const response = await api.get('/san-pham-tablet');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error); 
  }
};
export const fetchWatchProduct = async () =>{
  try {
    const response = await api.get('/san-pham-dong-ho');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error); 
  }
};
export const fetchAudioProduct = async () =>{
  try {
    const response = await api.get('/san-pham-am-thanh');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error); 
  }
};
