import * as React from "react"
import { RegisterGV } from "./RegisterGV"
import { RegisterPage } from "./RegisterPage"
import { Button, Container, Stack } from "@mui/material"
import "./styles.css"
export interface RedirectRoleProps {}

export default function RedirectRole(props: RedirectRoleProps) {
  const [haveRole, setHaveRole] = React.useState(false)
  const [role, setRole] = React.useState<"GV" | "SV" | "">("")
  return (
    <>
      {haveRole ? (
        role === "GV" ? (
          <RegisterGV />
        ) :(
          <RegisterPage />
        )
      ) : (
        <div
          className="w-screen h-screen dot-backg"
          style={{
            
          }}
        >
          <Container   sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <p className="font-semibold mb-3 text-2xl pt-[20vh] text-center">Bạn là ai ở trường đại học Thăng Long?</p>
          <Stack flexDirection={{xs:"column",sm:"row"}} sx={{mt:4}} gap={3}>
            <Button onClick={()=>{setRole("GV");setHaveRole(true)}} variant="outlined">Giảng viên</Button>
            <Button onClick={()=>{setRole("SV");setHaveRole(true)}}  variant="contained">Sinh viên</Button>
          </Stack> 
          </Container>
        </div>
      )}
    </>
  )
}
