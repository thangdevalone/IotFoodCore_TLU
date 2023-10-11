import { useAppSelector } from "@/app/hooks"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import * as React from "react"
import { NavLink } from "react-router-dom"

interface BreadcrumbItem {
  name: string
  link: string | ""
}

interface BreadcrumbsCommonProps {
  items: BreadcrumbItem[]
}

const BreadcrumbsCommon: React.FC<BreadcrumbsCommonProps> = ({ items }) => {
  const defaultBreadcrumb = (
    <NavLink key="home" color="inherit" to="/">
      <span className={`${"text-base"} hover:text-blue-500 capitalize`}>
        Trang chủ
      </span>
    </NavLink>
  )

  const breadcrumbs = [
    defaultBreadcrumb,
    ...items.map((item, index) => {
      if (index === items.length - 1) {
        return (
          <span
            key={index}
            className={` text-blue-500 capitalize`}
          >
            {item.name}
          </span>
        )
      } else {
        return (
          <NavLink key={index} color="inherit" to={item.link}>
            <span className={`${"text-base"} hover:text-blue-500 capitalize`}>
              {item.name}
            </span>
          </NavLink>
        )
      }
    }),
  ]

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{mt:2,mb:1}}
      aria-label="breadcrumbs"
    >
      {breadcrumbs}
    </Breadcrumbs>
  )
}

export default BreadcrumbsCommon
