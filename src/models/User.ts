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
