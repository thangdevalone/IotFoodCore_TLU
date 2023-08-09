export interface User {
  role: Role[]
  token: string
  std: string
  accountName: string
  imgUser: string
  msv: string
}

export interface Role {
  id: number
  authority: string
}
