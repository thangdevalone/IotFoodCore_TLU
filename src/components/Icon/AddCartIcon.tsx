import { SvgIcon } from "@mui/material"

export interface AddCartIconProps {
  fontSize?: "small" | "inherit" | "medium" | "large"
}

export function AddCartIcon(props: AddCartIconProps) {
  const {fontSize = "medium" } = props
  return (
    <SvgIcon fontSize={fontSize}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="512"
        height="512"
        x="0"
        y="0"
        viewBox="0 0 58 58"
        xmlSpace="preserve"
      >
        <g>
          <g fill="none" fill-rule="nonzero">
            <path
              fill="#ffa000"
              d="M43.83 22H56a2.006 2.006 0 0 1 2 2v4a2.006 2.006 0 0 1-2 2H2a2.006 2.006 0 0 1-2-2v-4a2.006 2.006 0 0 1 2-2z"
              data-original="#f0c419"
              opacity="1"
            ></path>
            <g fill="#f29c1f">
              <path
                d="M36.75 30H55l-4.26 23.88A5.009 5.009 0 0 1 45.81 58H12.19a5.009 5.009 0 0 1-4.93-4.12L3 30z"
                fill="#ffd699"
                data-original="#f29c1f"
                opacity="1"
              ></path>
              <circle
                cx="6"
                cy="26"
                r="1"
                fill="#ffd699"
                data-original="#f29c1f"
                opacity="1"
              ></circle>
              <circle
                cx="12"
                cy="26"
                r="1"
                fill="#ffd699"
                data-original="#f29c1f"
                opacity="1"
              ></circle>
              <circle
                cx="46"
                cy="26"
                r="1"
                fill="#ffd699"
                data-original="#f29c1f"
                opacity="1"
              ></circle>
              <circle
                cx="52"
                cy="26"
                r="1"
                fill="#ffd699"
                data-original="#f29c1f"
                opacity="1"
              ></circle>
            </g>
            <rect
              width="4"
              height="18"
              x="27"
              y="35"
              fill="#000000"
              rx="2"
              data-original="#d25627"
              opacity="1"
            ></rect>
            <rect
              width="4"
              height="18"
              x="39"
              y="35"
              fill="#000000"
              rx="2"
              data-original="#d25627"
              opacity="1"
            ></rect>
            <rect
              width="4"
              height="18"
              x="15"
              y="35"
              fill="#000000"
              rx="2"
              data-original="#d25627"
              opacity="1"
            ></rect>
            <circle
              cx="29"
              cy="16"
              r="16"
              fill="#ff0000"
              data-original="#4fba6f"
              opacity="1"
            ></circle>
            <path
              fill="#ffffff"
              d="M37 14h-6V8a2 2 0 1 0-4 0v6h-6a2 2 0 1 0 0 4h6v6a2 2 0 1 0 4 0v-6h6a2 2 0 1 0 0-4z"
              data-original="#ecf0f1"
              opacity="1"
            ></path>
          </g>
        </g>
      </svg>
    </SvgIcon>
  )
}
