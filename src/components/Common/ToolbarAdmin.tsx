import { useAppSelector } from "@/app/hooks"
import { FilterAlt, Search, ViewList } from "@mui/icons-material"
import { Box, Button, Stack } from "@mui/material"
import { EnhancedTableToolbar } from "."

export function ToolbarAdmin() {
  const isSelected = useAppSelector((state) => state.admin.isSelected)
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      className="p-[10px] border-b border-gray-300"
    >
      <Stack direction="row" alignItems="center">
        <Button
          sx={{ marginRight: "10px", textTransform: "capitalize" }}
          variant="contained"
        >
          Mới
        </Button>
        {/* <IconButton >
          <CloudUpload fontSize="small" htmlColor="black" />
        </IconButton> */}
      </Stack>
      {isSelected ? (
        <EnhancedTableToolbar />
      ) : (
        <Box className="flex items-center max-w-[500px] min-w-[300px] w-[100%]">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search />
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tìm kiếm..."
            />
            <button className="absolute top-0 right-0 h-full p-2 text-sm font-medium text-white bg-gray-500 rounded-r-lg border border-gray-500 hover:bg-gray-600 focus:outline-none  ">
              <FilterAlt fontSize="small" />
            </button>
          </div>
        </Box>
      )}
      <Stack direction="row">
        <button
          type="button"
          className=" bg-gray-200 hover:bg-gray-300  focus:outline-none font-medium rounded-md text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <ViewList fontSize="small" />
        </button>
        <button
          type="button"
          className=" bg-gray-200 hover:bg-gray-300  focus:outline-none font-medium rounded-md text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1H7V0H0V1Z" fill="#000000" />
            <path d="M8 1H15V0H8V1Z" fill="#000000" />
            <path
              d="M0.5 3C0.223858 3 0 3.22386 0 3.5V14.5C0 14.7761 0.223858 15 0.5 15H6.5C6.77614 15 7 14.7761 7 14.5V3.5C7 3.22386 6.77614 3 6.5 3H0.5Z"
              fill="#000000"
            />
            <path
              d="M8.5 3C8.22386 3 8 3.22386 8 3.5V9.5C8 9.77614 8.22386 10 8.5 10H14.5C14.7761 10 15 9.77614 15 9.5V3.5C15 3.22386 14.7761 3 14.5 3H8.5Z"
              fill="#000000"
            />
          </svg>
        </button>
      </Stack>
    </Stack>
  )
}
