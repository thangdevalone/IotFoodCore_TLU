import { useAppDispatch } from "@/app/hooks"
import { authActions } from "@/features/auth/AuthSlice"
import {
    AccountCircleOutlined,
    Logout,
    ReceiptOutlined,
    SettingsOutlined
} from "@mui/icons-material"
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material"

export interface MenuUserProps {
  anchorEl: null | HTMLElement
  handleClose: () => void
}

export function MenuUser(props: MenuUserProps) {
  const { anchorEl, handleClose } = props
  const dispatch = useAppDispatch()

  const handleLogOut = () => {
    handleClose()
    dispatch(authActions.logout())
  }
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={Boolean(anchorEl)}
      onClose={handleClose}
      autoFocus={false}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <AccountCircleOutlined fontSize="small" />
        </ListItemIcon>
        Tài khoản
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <ReceiptOutlined fontSize="small" />
        </ListItemIcon>
        Đơn mua
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <SettingsOutlined fontSize="small" />
        </ListItemIcon>
        Cài đặt
      </MenuItem>
      <MenuItem onClick={handleLogOut}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Đăng xuất
      </MenuItem>
    </Menu>
  )
}
