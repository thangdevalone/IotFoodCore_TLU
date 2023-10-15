import { Maybe } from "yup"

export interface InfoForm {
  sdt: string
  accountName: string
  imgUser?: string
  msv: string
  email?: Maybe<string | undefined>
}
