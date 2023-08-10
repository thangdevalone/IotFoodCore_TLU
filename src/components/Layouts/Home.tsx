import { Box } from "@mui/material"
import * as React from "react"
import { Header } from "../Common"
import { Banner } from "@/features/Banner"
import { SearchFood } from "@/features/SearchFood"
import "./styles_home.css"
export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <Box className="relative">
      <Header />
      <Banner />
      <section className="container-base search-food">
        <SearchFood />
      </section>
      <Box
        sx={{
          marginTop: "80px",
          marginBottom: "16px",
          border: "1px solid #e5e9f0",
        }}
      ></Box>
     
      <section className="container-base  recommend-food"></section>
      <section className="container-base type-food"></section>
    </Box>
  )
}
