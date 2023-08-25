import { useEffect, useState } from "react"
import { Header } from "@/components/Common"
import { Paper, MenuList, MenuItem, ListItemIcon, ListItemText, Typography, Divider, Avatar } from "@mui/material"
import { PermIdentityOutlined, Home, Lock, Assignment, Edit } from "@mui/icons-material";
import { useInforUser, useScroll, useWindowDimensions } from "@/hooks"
import { useNavigate } from 'react-router-dom'
export interface MenuProps {

}

export function Menu(props: MenuProps) {
    const user = useInforUser()
    const navigate = useNavigate();
    return (
        <div>
            <Paper sx={{ width: 220, background: "#f5f5f5", mr: 4, py: 4 }} elevation={0} >
                <MenuList>
                    <MenuItem onClick={() => { navigate("profile") }}>
                        <Avatar
                            sx={{
                                cursor: "pointer",
                                width: 45,
                                height: 45,
                                border: "1px solid #f0efef",
                            }}
                            src={user?.imgUser}
                        />
                        <div className="ml-3">
                            <h1 className="text-[14px] font-[600]">{user?.accountName}</h1>
                            <ListItemIcon>
                                <Edit fontSize="small" sx={{ color: "var(--color-df-1)" }} /> Sửa hồ sơ
                            </ListItemIcon>
                        </div>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => { navigate("profile") }}>
                        <ListItemIcon>
                            <PermIdentityOutlined fontSize="small" sx={{ color: "var(--color-df-1)" }} />
                        </ListItemIcon>
                        <ListItemText>Tài khoản của tôi</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => { navigate("address") }}>
                        <ListItemIcon>
                            <Home fontSize="small" sx={{ color: "var(--color-df-1)" }} />
                        </ListItemIcon>
                        <ListItemText>Địa chỉ</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => { navigate("changePassword") }}>
                        <ListItemIcon>
                            <Lock fontSize="small" sx={{ color: "var(--color-df-1)" }} />
                        </ListItemIcon>
                        <ListItemText>Đổi mật khẩu</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => { navigate("orders") }}>
                        <ListItemIcon>
                            <Assignment fontSize="small" sx={{ color: "var(--color-df-1)" }} />
                        </ListItemIcon>
                        <ListItemText>Đơn mua</ListItemText>
                    </MenuItem>

                </MenuList>
            </Paper>
        </div>
    )
}