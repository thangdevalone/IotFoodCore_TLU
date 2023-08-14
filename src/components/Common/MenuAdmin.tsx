import React, { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

export interface MenuAdminProps {
  open: boolean
  setOpen: (newValue: boolean) => void
  items: Array<{ label: string; nav: string }>
}

export function MenuAdmin(props: MenuAdminProps) {
  const { open, items, setOpen } = props
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false)
    }
  }
  const navigate = useNavigate()
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  return (
    <div
      id="dropdown"
      ref={dropdownRef}
      className={`z-20 absolute border top-[35px] border-gray-400  bg-white divide-gray-100 rounded-md shadow min-w-[10rem] w-max max-w-[13rem]  dark:bg-gray-700 ${
        open ? "" : "hidden"
      }`}
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        {items.map((item) => (
          <li>
            <span
              onClick={() => navigate(item.nav)}
              className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
