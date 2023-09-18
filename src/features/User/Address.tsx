import { Divider } from "@mui/material"


export interface AddressProps {

}

export function Address(props: AddressProps) {

    return (
        <>
            <div className="mb-5">
                <h1 className="text-18-500">Địa chỉ của tôi</h1>

            </div>
            <Divider />
        </>
    )
}