import axiosClient from "./axiosClient"

const foodsApis = {
  getRecommendFoods() {
    const url = "auth/get-recommend-food"
    return axiosClient.get(url)
  },
  getTypeFoods() {
    const url = "auth/get-all-type"
    return axiosClient.get(url)
  },
  getRecommendRestaurants() {
    const url = "auth/get-recommend-res"
    return axiosClient.get(url)
  },
  getDetailStore(id:number) {
    const url = `auth/get-detail-res?id=${id}`;
    return axiosClient.post(url);    
  },
  getDetailFood(id:number) {
    const url = `auth/get-detail-food?id=${id}`;
    return axiosClient.post(url); 
  }
}

export default foodsApis
