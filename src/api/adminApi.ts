import { VoucherItem } from './../models/Admin';
import { ExpandFood } from "./../models/Topping"
import { PageConfig } from "./../models/Config"
import axiosClient from "./axiosClient"
const adminApi = {
  getAllProducts(page: PageConfig) {
    const url = `ADMIN/paging-food-admin?pageSize=${page.pageSize}&pageIndex=${page.pageIndex}`
    return axiosClient.post(url)
  },
  getAllVoucher(page: PageConfig) {
    const url = `ADMIN/paging-voucher?pageSize=${page.pageSize}&pageIndex=${page.pageIndex}`
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
  addTopping(data: ExpandFood) {
    const url = "ADMIN/add-topping"
    return axiosClient.post(url, data)
  },
  addVoucher(data: VoucherItem) {
    const url = "ADMIN/add-voucher"
    return axiosClient.post(url, data)
  },
  addRestaurant(
    restaurantName: string,
    address: string,
    distance: string,
    detail: string,
    phoneNumber: string,
    supOpen: string,
    supClose: string,
    imgRes: File,
  ) {
    const data = new FormData()
    data.append("restaurantName", restaurantName)
    data.append("address", address)
    data.append("distance", distance)
    data.append("detail", detail)
    data.append("phoneNumber", phoneNumber)
    data.append("timeStart", supOpen)
    data.append("timeClose", supClose)
    data.append("imgRes", imgRes)
    const url = "ADMIN/add-res"
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Thêm đoạn này để đảm bảo dữ liệu được gửi dưới dạng FormData
      },
    })
  },
  addFood(
    name: string,
    price: number,
    detail: string,
    imgFood: File,
    typeFoodEntityId: number,
    restaurantEntityId: number,
  ) {
    const data = new FormData()
    data.append("foodName", name)
    data.append("price", price.toString())
    data.append("detail", detail)
    data.append("imgFood", imgFood)
    data.append("typeFoodEntityId", typeFoodEntityId.toString())
    data.append("restaurantEntityId", restaurantEntityId.toString())

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
    imgUser: File,
  ) {
    const url = "ADMIN/MANAGER/add-employee"
    return axiosClient.post(url, {
      username: accountName,
      password: password,
      sdt: sdt,
      accountName: username,
      imgUser: imgUser,
    })
  },
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
  updateSupplier(
    id: number,
    restaurantName: string,
    address: string,
    distance: string,
    detail: string,
    timeStart: string,
    timeClose: string,
    phoneNumber: string,
    imgRes: File | null,
  ) {
    const data = new FormData()
    data.append("id", String(id))
    data.append("restaurantName", restaurantName)
    data.append("address", address)
    data.append("distance", String(distance))
    data.append("detail", detail)
    data.append("timeStart", timeStart)
    data.append("timeClose", timeClose)
    data.append("phoneNumber", phoneNumber)
    if (imgRes !== null) {
      data.append("imgRes", imgRes)
    }
    const url = "ADMIN/update-res"
    return axiosClient.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  updateType(id: number, nameType: string, imgRes: File | null) {
    const data = new FormData()
    data.append("id", String(id))
    data.append("nameType", nameType)
    if (imgRes !== null) {
      data.append("imgType", imgRes)
    }
    const url = "ADMIN/update-type"
    return axiosClient.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  updateProduct(
    id: number,
    foodName: string,
    price: number,
    detail: string,
    imgFood: File | null,
    typeFoodEntityId: number,
    restaurantEntityId: number,
  ) {
    const data = new FormData()
    data.append("id", String(id))
    data.append("foodName", foodName)
    data.append("price", String(price))
    data.append("detail", detail)
    if (imgFood !== null) {
      data.append("imgFood", imgFood)
    }
    data.append("typeFoodEntityId", String(typeFoodEntityId))
    data.append("restaurantEntityId", String(restaurantEntityId))
    const url = "ADMIN/update-food"
    return axiosClient.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  updateVoucher(data: VoucherItem) {
    const url = "ADMIN/update-voucher"
    return axiosClient.put(url, data)
  },
  deleteFood(foodArray: Array<number>) {
    const url = "ADMIN/delete-food"
    return axiosClient.post(url, foodArray)
  },
  deleteVoucher(foodArray: Array<number>) {
    const url = "ADMIN/delete-voucher"
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
  getPagingEmployee(page: PageConfig) {
    const url = `ADMIN/MANAGER/paging-employee?pageSize=${page.pageSize}&pageIndex=${page.pageIndex}`
    return axiosClient.post(url)
  },
  getPagingUser(page: PageConfig) {
    const url = `ADMIN/paging-user?pageSize=${page.pageSize}&pageIndex=${page.pageIndex}`
    return axiosClient.post(url)
  },

  getDetailStore(id: number) {
    const url = `ADMIN/get-detail-res?id=${id}`
    return axiosClient.post(url)
  },

  getBill(page: PageConfig, status: string | null) {
    if (status) {
      const url = `ADMIN/get-bill?pageIndex=${page.pageIndex}&pageSize=${page.pageSize}&orderStatus=${status}`
      return axiosClient.post(url)
    }
    const url = `ADMIN/get-bill?pageIndex=${page.pageIndex}&pageSize=${page.pageSize}`
    return axiosClient.post(url)
  },
  getDetailVoucher(id: number) {
    const url = `ADMIN/get-detail-voucher?id=${id}`
    return axiosClient.post(url)
  },
}

export default adminApi
