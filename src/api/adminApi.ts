import { PageConfig } from './../models/Config';
import axiosClient from './axiosClient';
const adminApi={
  getAllProducts(page:PageConfig){
    const url=`ADMIN/paging-food-admin?pageSize=${page.pageSize}&pageIndex=${page.pageIndex}`
    return axiosClient.post(url)
  },
  search(param:string|null,apiHandle:string){
    const url_res=param?`ADMIN/search-res?key=${param}`:`ADMIN/search-res`
    const url_type=param?`ADMIN/search-type?key=${param}`:`ADMIN/search-type`
    if(apiHandle==="res"){
      return axiosClient.post(url_res)
    }
    return axiosClient.post(url_type)
  }
}

export default adminApi