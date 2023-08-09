import { RegisterForm, RegisterFormApi } from '../models/RegisterForm';
import { LoginForm } from '../models/LoginForm';
import axiosClient from './axiosClient';



const authApi={
    login(data:LoginForm){
        const url="auth/login"
        return axiosClient.post(url,data)
    },
    register(data:RegisterForm){
        const url="auth/register"
        const form:RegisterFormApi={accountName:data.name,password:data.password,username:data.username,sdt:data.phoneNumber}
        return axiosClient.post(url,form)
    }
}
export default authApi