import api from "../config/axios";

export const fetchData = async () =>{
  try {
    const response = await api.get('/danh-muc-san-pham');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error); 
  }
};
export const fetchSingleCategory = async (slug) =>{
  try {
    const response = await api.get('/danh-muc-san-pham/'.concat(slug));
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error); 
  }
};
export const fetchMoreProductByCategory = async (slug) =>{
  try {
    const response = await api.get(slug);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error); 
  }
};
