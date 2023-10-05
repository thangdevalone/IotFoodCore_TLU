import { BillConfig, PageConfig } from './../models/Config';
import axiosClient from "./axiosClient"


const userApi = {
    getAllVoucher(page: PageConfig){
        const url = `user/paging-voucher?pageSize=${page.pageSize}&pageIndex=${page.pageIndex}`
        return axiosClient.post(url)
    },
    addOrder(data: BillConfig){
        const url = `user/add-bill`
        return axiosClient.post(url,data)
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
