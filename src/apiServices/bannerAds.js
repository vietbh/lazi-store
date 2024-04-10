import api from "@/config/axios"

const bannerAds = async () =>{
    try {
        const res = await api.get('/slide-ads');
        if(res.status == 200)
        return res.data;
    } catch(error) {
        console.log(error);
        return error
    }
}
export {bannerAds}