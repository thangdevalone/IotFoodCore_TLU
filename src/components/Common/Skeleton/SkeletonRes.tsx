import { Box, Skeleton } from "@mui/material"

export const SkeletonRes = () => {
  return (
    <Box className="w-full">
      <Skeleton
        variant="rectangular"
        className="!w-full rounded-lg"
        height={50}
      />
      <Skeleton className="!w-[85%] !mt-2" height={35} />
      <Skeleton className="!w-[65%] " height={25} />
      <Skeleton className="!w-[55%]" height={25} />
      <Skeleton className="!w-[50%]" height={25} />
      <Skeleton className="!w-[44%]" height={25} />
    </Box>
  )
}
