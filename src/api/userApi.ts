import axiosClient from './axiosClient';



const userApi = {
    getAllUser(pageSize: number, pageIndex: number) {
        const url = `user/paging-user?pageSize=${pageSize}&pageIndex=${pageIndex}`
        return axiosClient.post(url)
    },

}
export default userApi