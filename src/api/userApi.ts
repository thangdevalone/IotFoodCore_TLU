import axiosClient from "./axiosClient"
import { PageConfig } from "./../models/Config"

const userApi = {
  getAllUser(pageSize: number, pageIndex: number) {
    const url = `user/paging-user?pageSize=${pageSize}&pageIndex=${pageIndex}`
    return axiosClient.post(url)
  },
  getBill(page: PageConfig, status: string | null) {
    if (status) {
      const url = `ADMIN/get-bill?pageIndex=${page.pageIndex}&pageSize=${page.pageSize}&orderStatus=${status}`
      return axiosClient.post(url)
    }
    const url = `user/get-bill?pageIndex=${page.pageIndex}&pageSize=${page.pageSize}`
    return axiosClient.post(url)
  },
}
export default userApi
