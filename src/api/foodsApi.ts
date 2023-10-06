import axiosClient from "./axiosClient"
import { PageConfig } from "@/models"

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
  getDetailStore(id: number) {
    const url = `auth/get-detail-res?id=${id}`
    return axiosClient.post(url)
  },
  getDetailFood(id: number) {
    const url = `auth/get-detail-food?id=${id}`
    return axiosClient.post(url)
  },
  getDetailType(id: number) {
    const url = `auth/get-detail-type?id=${id}`
    return axiosClient.post(url)
  },
  searchFoods(search: string) {
    const url = `auth/search-food?searchString=${search}`
    return axiosClient.post(url)
  },
  pagingFood(page: PageConfig) {
    const url = `auth/paging-food-admin?pageSize=${page.pageSize}&pageIndex=${page.pageIndex}`
    return axiosClient.post(url)
  },
  pagingRes(page: PageConfig) {
    const url = `auth/paging-res?pageSize=${page.pageSize}&pageIndex=${page.pageIndex}`
    return axiosClient.post(url)
  },
}

export default foodsApis
