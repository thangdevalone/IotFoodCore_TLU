import { PageConfig } from "./../models/Config"
import axiosClient from "./axiosClient"
const adminApi = {
  getAllProducts(page: PageConfig) {
    const url = `ADMIN/paging-food-admin?pageSize=${page.pageSize}&pageIndex=${page.pageIndex}`
    return axiosClient.post(url)
  },
  search(param: string | null, apiHandle: string) {
    const url_res = param ? `ADMIN/search-res?key=${param}` : `ADMIN/search-res`
    const url_type = param
      ? `ADMIN/search-type?key=${param}`
      : `ADMIN/search-type`
    if (apiHandle === "res") {
      return axiosClient.post(url_res)
    }
    return axiosClient.post(url_type)
  },
  getAllTypeFoods(page: PageConfig) {
    const url = `ADMIN/paging-type-admin?pageSize=${page.pageSize}&pageIndex=${page.pageIndex}`
    return axiosClient.post(url)
  },
  addFood(name:string,price:number,detail:string,imgFood:File,typeFoodEntityId:number,restaurantEntityId:number){
    const data=new FormData()
    data.append("foodName",name)
    data.append("price",price.toString())
    data.append("detail",detail)
    data.append("imgFood",imgFood)
    data.append("typeFoodEntityId",typeFoodEntityId.toString())
    data.append("restaurantEntityId",restaurantEntityId.toString())
    const url="ADMIN/add-food"
    return axiosClient.post(url,data,{
      headers: {
        'Content-Type': 'multipart/form-data', // Thêm đoạn này để đảm bảo dữ liệu được gửi dưới dạng FormData
      },
    })
  }
}

export default adminApi
