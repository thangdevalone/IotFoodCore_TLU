import { Box, Paper, Stack, Typography } from "@mui/material"
import * as React from "react"
import classes from "./styles.module.css"
import { InputField } from "@/components/FormControls"

import classNames from "classnames"
import { CustomButton } from "@/components/Custom/CustomButon"
export interface SearchFoodProps {}

export function SearchFood(props: SearchFoodProps) {
  return (
    <Box
      className={classNames({
        [classes.mainSearch]: true,
        "container-base": false,
      })}
    >
      <Paper elevation={2} className={classes.container}>
        <Stack
          direction={"column"}
          sx={{ height: "100%" }}
          justifyContent="space-between"
        >
          <Box>
            <p className={classes["tx-sm"]}>Good morning</p>
            <p className={classes["tx-1"]}>Bạn muốn ăn gì bây giờ?</p>
          </Box>

          <Box sx={{ mb: 1, mt: 1, postion: "relative" }}>
            <img
              className="absolute"
              style={{ top: "105px", right: "25px", width: "150px" }}
              src="/assets/cook.gif"
            />
            <input
              className=" appearance-none border-2  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="search-food"
              style={{
                height: "50px",
                borderRadius: "6px",
                border: "1px solid var(--color-df-1)",
              }}
              type="text"
              placeholder="Tìm kiếm món ăn"
            />
            <CustomButton
              fullWidth
              sx={{
                background: "var(--color-df-1)",
                color: "white",
                mt: "10px",
                borderRadius: "6px",
                fontSize: "15px",
                height: "50px",
                fontWeight: "600",
                textTransform: "unset",

                "&:hover": {
                  background: "var(--color-df-1)",
                  color: "white",
                },
              }}
            >
              Tìm kiếm
            </CustomButton>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}
