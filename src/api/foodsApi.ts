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
}

export default foodsApis
