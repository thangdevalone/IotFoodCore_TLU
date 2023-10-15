import axiosClientAI from "./axiosClientAI"

export const checkSv=(data:FormData)=>{
  return axiosClientAI.post("/check_msv", data, {
    headers: {
      "Content-Type": "multipart/form-data", // Thêm đoạn này để đảm bảo dữ liệu được gửi dưới dạng FormData
    },
  })
}