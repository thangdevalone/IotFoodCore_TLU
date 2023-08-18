import * as React from 'react'
import { CartItemData } from '@/models'
import { Box, Stack, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { handlePrice } from '@/utils';
import { useAppDispatch } from '@/app/hooks';
import { cartActions } from '../CartSlice';

export interface propsData {
    item: CartItemData;
}

const CartItem = (props: propsData) => {

    const { item } = props;
    const [quantity, setQuantity] = React.useState<number>(item.quantity);
    const dispatch = useAppDispatch();
    const handleAdd = () => { 
        setQuantity(prev => +prev + 1);
        dispatch(cartActions.addToCart(item));
    };

    const handleRemove = () => {
        if (quantity === 1 ) {
            dispatch(cartActions.removerCart(item));
        } else {
            setQuantity(prev => +prev - 1);
            dispatch(cartActions.deleteToCart(item));
        }
    }

    const handleOnChangeInput = (value: number) => {
        setQuantity(value);
    }

    const handleSetQuantity = (value: number) => {
        if (value === 0) {
            dispatch(cartActions.removerCart(item));
        } else {
            const data = { ...item, type: true }
            data.quantity = value;
            dispatch(cartActions.addToCart(data));
        }
    }

    return (
        <Stack direction="row" spacing={2} className="border-b w-full pb-5">
            <Box className="flex items-center gap-2 flex-1">
                <Box onClick={()=>handleRemove()} className="cursor-pointer rounded-full bg-gray-200 p-1 hover:opacity-70">
                    <RemoveIcon />
                </Box>
                <input type="number" onBlur={(e)=>handleSetQuantity(+e.target.value)} onChange={(e) =>handleOnChangeInput(+e.target.value)} value={quantity} className='w-12 text-center text-xl' />
                 <Box onClick={()=>handleAdd()} className="cursor-pointer rounded-full bg-gray-200 p-1 hover:opacity-70">
                    <AddIcon />
                </Box>
            </Box>
            <Stack direction="row" spacing={2} className='flex-5'>
                <Box
                    className="h-14 w-14 rounded-md cursor-pointer object-cover"
                    sx={{
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundImage: `url(${item.imgFood})`,
                    }}
                ></Box>
                <Typography variant='h6'>{item.name}</Typography>
            </Stack>
            <Typography className='flex-2'>{handlePrice(item.price)} VND</Typography>
        </Stack>
    )
}

export default React.memo(CartItem)