import { BillConfig, PageConfig } from './../models/Config';
import axiosClient from './axiosClient';



const userApi = {
    getAllVoucher(page: PageConfig){
        const url = `user/paging-voucher?pageSize=${page.pageSize}&pageIndex=${page.pageIndex}`
        return axiosClient.post(url)
    },
    addOrder(data: BillConfig){
        const url = `user/add-bill`
        return axiosClient.post(url,data)
    }
}
export default userApi