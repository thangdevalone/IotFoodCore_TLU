import axiosClient from "./axiosClient"

const chatApi={
  getRooms(){
    const url="user/get-list-room"
    return axiosClient.get(url)
  }
}
export default chatApi