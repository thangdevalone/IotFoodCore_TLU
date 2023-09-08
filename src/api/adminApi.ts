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
  getAllResFoods(page: PageConfig) {
    const url = `ADMIN/paging-res?pageSize=${page.pageSize}&pageIndex=${page.pageIndex}`
    return axiosClient.post(url)
  },
  addRestaurant(
    restaurantName: string,
    address: string,
    quantitySold: number,
    distance: number,
    detail: string,
    phoneNumber: string,
    imgRes: File,
  ) {
    const data = new FormData()
    data.append("restaurantName", restaurantName)
    data.append("address", address)
    data.append("quantitySold", String(quantitySold))
    data.append("distance", String(distance))
    data.append("detail", detail)
    data.append("phoneNumber", phoneNumber)
    data.append("imgRes", imgRes)
    const url = "ADMIN/add-res"
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Thêm đoạn này để đảm bảo dữ liệu được gửi dưới dạng FormData
      },
    })
  },
  addFood(name: string, price: number, detail: string, imgFood: File, typeFoodEntityId: number, restaurantEntityId: number) {
    const data = new FormData()
    data.append("foodName", name)
    data.append("price", price.toString())
    data.append("detail", detail)
    data.append("imgFood", imgFood)
    data.append("typeFoodEntityId", typeFoodEntityId.toString())
    data.append("restaurantEntityId", restaurantEntityId.toString())
    console.log({ data })
    const url = "ADMIN/add-food"
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Thêm đoạn này để đảm bảo dữ liệu được gửi dưới dạng FormData
      },
    })
  },
  addEmployee(
    username: string,
    password: string,
    sdt: string,
    accountName: string,
    imgUser: File) {
    console.log({ username, password, sdt, accountName })
    const data = new FormData()
    data.append("username", accountName)
    data.append("id", "0")
    data.append("password", password)
    data.append("sdt", sdt)
    data.append("accountName", username)
    data.append("imgUser", "https://tse4.mm.bing.net/th?id=OIP.tS4o_QzG25ntuI90jWWWXQHaHa&pid=Api&P=0&h=180")
    const url = "ADMIN/MANAGER/add-employee"
    return axiosClient.post(url, {
      "username": "Nguyễn Ngọc Huyền",
      "password": "Huyen1234.",
      "sdt": "0962319014",
      "accountName": "A419662",
      "imgUser": "string"
    })},

  addType(imgType: File, nameType: string) {
    const data = new FormData()
    data.append("imgType", imgType)
    data.append("nameType", nameType)
    const url = "ADMIN/add-type"
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  deleteFood(foodArray: Array<number>) {
    const url = "ADMIN/delete-food"
    return axiosClient.post(url, foodArray)
  },
  deleteType(typeArray: Array<number>) {
    const url = "ADMIN/delete-type"
    return axiosClient.post(url, typeArray)
  },
  deleteStore(storeArray: Array<number>) {
    const url = "ADMIN/delete-res"
    return axiosClient.post(url, storeArray)
  },
}

export default adminApi
