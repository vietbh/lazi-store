import api from '../config/axios';

export const detailProduct = async(slug) => {
    try {
        const response = await api.get('/san-pham/'.concat(slug));
        if (response.status === 200) {
          return response.data;         
        }
      } catch (error) {
        console.log(error); 
      }
}