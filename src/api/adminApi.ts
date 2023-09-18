import { ToppingAdd } from "./../features/Admin/components/NewProduct"
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
    distance: string,
    detail: string,
    phoneNumber: string,
    imgRes: File,
  ) {
    const data = new FormData()
    data.append("restaurantName", restaurantName)
    data.append("address", address)
    data.append("quantitySold", String(quantitySold))
    data.append("distance", distance)
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
  addFood(
    name: string,
    price: number,
    detail: string,
    imgFood: File,
    typeFoodEntityId: number,
    restaurantEntityId: number,
    toppingList: ToppingAdd[] | [],
  ) {
    const data = new FormData()
    data.append("foodName", name)
    data.append("price", price.toString())
    data.append("detail", detail)
    data.append("imgFood", imgFood)
    data.append("typeFoodEntityId", typeFoodEntityId.toString())
    data.append("restaurantEntityId", restaurantEntityId.toString())
    data.append(
      "toppingRequest",
      JSON.stringify(
        toppingList.map((item: ToppingAdd) => ({
          name: item.name,
          price: item.price,
        })),
      ),
    )
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
    const url = "ADMIN/MANAGER/add-employee"
    return axiosClient.post(url, {
      "username": accountName,
      "password": password,
      "sdt": sdt,
      "accountName": username,
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
  updateSupplier(
    id: number,
    restaurantName: string,
    address: string,
    distance: number,
    detail: string,
    phoneNumber: string,
    imgRes: File | null,
  ) {
    const data = new FormData()
    data.append("id", String(id))
    data.append("restaurantName", restaurantName)
    data.append("address", address)
    data.append("distance", String(distance))
    data.append("detail", detail)
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
