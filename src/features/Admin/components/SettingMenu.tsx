import {
  FileDownloadOutlined,
  FileUploadOutlined,
  GetAppOutlined,
} from "@mui/icons-material"
import { ListItemIcon } from "@mui/material"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import * as React from "react"

interface SettingMenuProps {
  anchorRef: React.RefObject<HTMLButtonElement>
  open: boolean
  setOpen: (newVal: boolean) => void
  setIsOpenImport?: (newVal: boolean) => void
}

export default function SettingMenu(props: SettingMenuProps) {
  const { anchorRef, open, setOpen, setIsOpenImport } = props
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === "Escape") {
      setOpen(false)
    }
  }

  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <Popper
      open={open}
      sx={{
        zIndex: 10,
        position: "fixed",
        "& .MuiPaper-root": {
          borderRadius: "0.375rem",
          border: "1px solid rgb(156, 163, 175)",
        },
      }}
      anchorEl={anchorRef.current}
      role={undefined}
      placement="bottom-start"
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom-start" ? "left top" : "left bottom",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={handleListKeyDown}
              >
                <MenuItem
                  onClick={(e: Event | React.SyntheticEvent) => {
                    handleClose(e)
                    if (setIsOpenImport) setIsOpenImport(true)
                  }}
                >
                  <ListItemIcon>
                    <FileDownloadOutlined fontSize="small" htmlColor="black" />
                  </ListItemIcon>
                  Nhập dữ liệu
                </MenuItem>
                <MenuItem
                  onClick={(e: Event | React.SyntheticEvent) => {
                    handleClose(e)
                  }}
                >
                  <ListItemIcon>
                    <FileUploadOutlined fontSize="small" htmlColor="black" />
                  </ListItemIcon>
                  Xuất dữ liệu
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}
