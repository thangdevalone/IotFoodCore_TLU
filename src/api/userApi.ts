import { BillConfig, PageConfig } from "./../models/Config"
import { ForgotPassword, ChangePassword } from "@/models/ForgotForm"
import { UpdateInformationUser } from "@/models"
import axiosClient from "./axiosClient"

const userApi = {
  getAllVoucher() {
    const url = `user/get-all-voucher`
    return axiosClient.post(url)
  },
  addOrder(data: BillConfig) {
    const url = `user/add-bill`
    return axiosClient.post(url, data)
  },
  getBill(page: PageConfig, status: string | null) {
    if (status) {
      const url = `user/get-bill?pageIndex=${page.pageIndex}&pageSize=${page.pageSize}&orderStatus=${status}`
      return axiosClient.post(url)
    }
    const url = `user/get-bill?pageIndex=${page.pageIndex}&pageSize=${page.pageSize}`
    return axiosClient.post(url)
  },
  forgotPassword(name: string) {
    // gửi otp quên mk
    const url = `auth/forgot-pass?username=${name}`
    return axiosClient.post(url)
  },
  verifyEmail(email: string) {
    // gửi otp để xác thực gmail
    const url = `user/verify-email?email=${email}`
    return axiosClient.post(url)
  },
  validate(otp: string) {
    // kiểm tra otp xác thực gmail
    const url = `user/validate-otp?otp=${otp}`
    return axiosClient.post(url)
  },
  finalOtpForgot(otp: string) {
    const url = "auth/validate-otp-forgot-pass"
    return axiosClient.post(url, { otp: otp })
  },
  finalPassword(data: ChangePassword) {
    const url = "auth/change-password"
    return axiosClient.post(url, data)
  },
  updateUserInformation(data: UpdateInformationUser) {
    const formData = new FormData()
    formData.append("password", data.password)
    formData.append("newPassword", data.newPassword || "")
    formData.append("img", data.img || "")
    formData.append("sdt", data.sdt || "")
    formData.append("accountName", data.accountName || "")
    const url = "user/update-user-info"
    return axiosClient.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  getUserInfo() {
    const url = "user/get-user-info"
    return axiosClient.get(url)
  },
}
export default userApi
