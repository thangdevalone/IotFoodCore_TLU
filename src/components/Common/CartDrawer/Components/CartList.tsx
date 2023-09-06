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
    <Stack  className='w-full'>
      <Stack alignItems="center" className='w-full'>
        {items.map((item,index) => <CartItem key={index} item={item } />)}
      </Stack>
    </Stack>
  )
}

export default CartList