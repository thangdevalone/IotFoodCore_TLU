import { Box, Skeleton } from "@mui/material"

export const SkeletonCustom = () => {
  return (
    <Box className="w-full">
      <Skeleton
        variant="rectangular"
        className="!h-[23vh] !w-full rounded-lg"
      />
      <Skeleton className="!w-full" height={40} />
      <Skeleton className="!w-full" height={25} />
    </Box>
  )
}
