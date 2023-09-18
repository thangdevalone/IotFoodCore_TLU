import { Divider } from "@mui/material"
import { Orders } from "@/components/Common/Orders"

export interface OrdersUserProps {

}

export function OrdersUser(props: OrdersUserProps) {

    return (
        <>
            <div className="mb-5">
                <Orders />
            </div>
        </>
    )
}