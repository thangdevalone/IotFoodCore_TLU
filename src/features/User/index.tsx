import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import { useInforUser, useScroll, useWindowDimensions } from "@/hooks"
import { Menu } from "./Menu";
import { Profile } from "./Profile";
import { Header } from "@/components/Common";
import { Address } from './Address'
export interface UserProps {

}

export function User(props: UserProps) {
    const user = useInforUser()
    console.log({user})
    return (
        <>

            <Header isHeaderColorRed={true} />
            <div className="bg-[#f5f5f5] w-[100%] min-h-[100vh] relative top-[80px]">
                <div className="flex pt-7 pb-12 mx-auto w-[1200px]">
                    <Menu />
                    <div className="mx-auto px-7 py-[38px] bg-[#fff] w-[980px] max-w-[100%]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}