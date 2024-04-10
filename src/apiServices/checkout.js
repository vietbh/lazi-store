import api from "@/config/axios"

const checkoutOrder = async (formData) =>{
    const user = JSON.parse(sessionStorage.getItem('userInfo'));

    if (!user) {
      console.log('Người dùng chưa được xác thực.');
      return new Response().json(401);
    }

    try {
        const res = await api.post('/thanh-toan',{data:formData,user});
        if(res.status == 200)
        return res;
    } catch(error) {
        console.log(error);
        return {errors:error}
    }
}
export {checkoutOrder}