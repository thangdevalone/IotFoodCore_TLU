export interface User {
  role: Role[]
  token: string
  id: number
  sdt: string
  accountName: string
  imgUser: string
  msv: string
  email: string
}

export interface Role {
  id: number
  createDate: any
  status: any
  authority: string
}

export interface UpdatePassWord {
  password: string
  newPassword: string
  passwordNewConfirm: string | null
}

export interface UpdateInformationUser {
  password: string
  newPassword: string
  accountName: string | null
  img: File | null
  sdt: string | null
}
