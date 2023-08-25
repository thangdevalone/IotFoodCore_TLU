import * as React from 'react'
import { Outlet } from "react-router-dom"
import {
  Avatar,
  Box,
  Stack,
} from "@mui/material"
import { Header } from '../Common'

export interface propsData {}

export function Store(props: propsData) {

  return (
    <Box className="tx-df-sz">
      <Header isHeaderColorRed={true}/>
      <Box className="mt-24">
        <Outlet/>
      </Box>
      {/* <div className="h-[1000px]"></div> */}
    </Box>
  )
}
