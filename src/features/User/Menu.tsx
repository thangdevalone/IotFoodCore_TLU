import { useInforUser } from "@/hooks"
import {
    Assignment,
    Home,
    Lock,
    Person
} from "@mui/icons-material"
import {
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper
} from "@mui/material"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
export interface MenuProps {}

export function Menu(props: MenuProps) {
  const location=useLocation()
  const path = location.pathname.split('/')[2]; // Lấy địa chỉ URL hiện tạ
  const navigate = useNavigate()
  return (
    <div>
      <Paper
        sx={{ width: 220, background: "transparent", mr: 4, py: 2 }}
        elevation={0}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              navigate("profile")
            }}
            sx={{borderRadius:"10px",padding:"10px 15px",marginBottom:"1px"}}
            selected={path==="profile"}
          >
            <ListItemIcon>
              <Person
                sx={{ color: "var(--color-df-1)" }}
              />
            </ListItemIcon>
            <ListItemText>Tài khoản của tôi</ListItemText>
          </MenuItem>
          
          <MenuItem
            onClick={() => {
              navigate("changePassword")
            }}
            sx={{borderRadius:"10px",padding:"10px 15px",marginBottom:"1px"}}
            selected={path==="changePassword"}

          >
            <ListItemIcon>
              <Lock  sx={{ color: "var(--color-df-1)" }} />
            </ListItemIcon>
            <ListItemText>Đổi mật khẩu</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("orders")
            }}
            sx={{borderRadius:"10px",padding:"10px 15px",marginBottom:"1px"}}
            selected={path==="orders"}
            
          >
            <ListItemIcon>
              <Assignment
            
                sx={{ color: "var(--color-df-1)" }}
              />
            </ListItemIcon>
            <ListItemText>Đơn mua</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  )
}
