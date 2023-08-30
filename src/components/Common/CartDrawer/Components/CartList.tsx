import * as React from 'react'
import { CartItemData } from '@/models'
import { Stack, Typography } from "@mui/material"
import CartItem from './CartItem';

export interface propsData {
  items: CartItemData[];
}

const CartList = (props: propsData) => {

  const { items } = props;

  return (
    <Stack spacing={3} className='w-full p-[20px] overflow-y-scroll pr-2 custom-scroll-y'>
    
      <Stack alignItems="center" spacing={5} className='w-full'>
        {items.map((item,index) => <CartItem key={index} item={item } />)}
      </Stack>
    </Stack>
  )
}

export default CartList