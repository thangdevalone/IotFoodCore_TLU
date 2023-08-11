import { Button, ButtonProps } from "@mui/material"

interface CustomButtonProps extends ButtonProps {
  // Thêm các props tùy chỉnh khác nếu cần
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  sx,
  variant = "outlined",
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      sx={{
        color: "var(--color-tx-1)",
        border: "1px solid #c8c8c8",
        fontSize: "12px",
        background: "white",
        "&:hover": {
          color: "var(--color-tx-1)",
          border: "1px solid #c8c8c8",
          background: "white",
        },
        ...sx, // Sử dụng spread operator để chèn các style tùy chỉnh
      }}
      {...rest} // Chuyển tất cả các prop khác vào Button
    >
      {children}
    </Button>
  )
}


