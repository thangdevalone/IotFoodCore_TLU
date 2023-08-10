import { Box } from "@mui/material"
import * as React from "react"
import { Header } from "../Common"
import { Banner } from "@/features/Banner"
import { SearchFood } from "@/features/SearchFood"
import { RecommendFood } from "@/features/RecommendFood"
import TypeFood from "@/features/TypeFood"
import "./styles_home.css"
export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <Box className="relative overflow-x-hidden">
      <Header />
      <Banner />
      <section className="container-base search-food">
        <SearchFood />
      </section>
      <Box
        sx={{
          marginTop: "80px",
          marginBottom: "80px",
          border: "1px solid #e5e9f0",
        }}
      ></Box>
      
      <section className="recommend-food my-10">
        <RecommendFood />
      </section>
      <section className="type-food">
        <TypeFood />
      </section>
    </Box>
  )
}
