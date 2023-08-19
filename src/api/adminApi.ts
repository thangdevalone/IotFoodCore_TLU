import { PageConfig } from './../models/Config';
import axiosClient from './axiosClient';
const adminApi={
  getAllProducts(page:PageConfig){
    const url=`ADMIN/paging-food-admin?pageSize=${page.pageSize}&pageIndex=${page.pageIndex-1}`
    return axiosClient.post(url)
  }
}

export default adminApi