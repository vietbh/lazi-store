import api from "@/config/axios"

const fetchPostLogin = async (formData) => {
    try {
      const res = await api.post('/login',formData);
      if(res.status == 200){
        return res.data;
      }
    } catch (error) {
        console.log(error);
    }
  }
export {fetchPostLogin}