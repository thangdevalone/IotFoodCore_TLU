export interface ForgotForm {
  username: string
  otp?: string
  newPassword?: string
}

export interface ForgotPassword {
  otp: string
  username: string
}

export interface ChangePassword {
  otp: string
  newPassword: string
}
