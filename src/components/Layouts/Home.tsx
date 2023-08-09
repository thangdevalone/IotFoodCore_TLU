import { Box } from "@mui/material"
import * as React from "react"
import { Header } from "../Common"
import { Banner } from "@/features/Banner"
import { SearchFood } from "@/features/SearchFood"

export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <Box className="relative">
      <Header />
      <Banner />
      <Box
          sx={{
            marginTop: "80px",
            marginBottom: "16px",
            border: "1px solid #e5e9f0",
          }}
        ></Box>
        <SearchFood />
      <section className="recommend-food"></section>
      <section className="type-food"></section>
    </Box>
  )
}
