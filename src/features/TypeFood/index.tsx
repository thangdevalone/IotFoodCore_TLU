import { Box, IconButton, Stack, Typography, Grid } from "@mui/material";
import * as React from "react";
import foodsApis from "@/api/foodsApi";
import { TypeFoodsData } from "@/models/Foods";
import { useWindowDimensions } from "@/hooks"; 

const TypeFood = () => {

  const [data, setData] = React.useState<TypeFoodsData[]>([]);


  React.useEffect(() => { 
    const fetchData = async () => {
      const response = await foodsApis.getTypeFoods();
      if (response?.status) setData(response?.data);
    } 
    fetchData();
  }, []);
  
  return (
    <Box className="flex items-center justify-center my-5 lg:mx-16">
      <Grid className="" container spacing={4} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
        {data?.map(item =>
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Box className="flex flex-col items-center justify-center">
              <div className="h-[150px] w-[300px] lg:w-[350px] bg-gray-300"></div>
            </Box>
            <span className='text-xl font-semibold flex justify-start lg:ml-3 ml-[44px]'>{item.nameType}</span>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default TypeFood;