import * as React from 'react'
import foodsApis from "@/api/foodsApi"
import { RestaurantData } from '@/models';
import { Box, Grid } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import  BreadcrumbsCommon  from '@/components/Common/Breadcrumbs';

export interface propsData {}

const GetAllStore = (props: propsData) => {
    const [data, setData] = React.useState<RestaurantData[]>([])
    const navigate = useNavigate();

    const handleDetail = (id:number) => {
        // console.log(id);
        navigate(`/store/detail-store/${id}`)
    }

    React.useEffect(() => { 
        const fetchData = async () => {
            const response = await foodsApis.getRecommendRestaurants();
            if (response?.status) {
                setData(response?.data)
            }
            window.scrollTo(0, 0);
        }
        fetchData();
    }, []);

    const breadcrumbItems = [
        { name: "Cửa hàng"},
    ];

    // console.log(data)

    return (
        <Box className="flex flex-col gap-5 container-base base-pd" >
            <BreadcrumbsCommon items={breadcrumbItems} />
            <Grid
                className=""
                container
                spacing={4}
                columnSpacing={{ xs: 1, sm: 3, md: 4 }}
            >
                {data?.map((item) => (
                    <Grid onClick={()=>handleDetail(item.id)} item xs={12} sm={6} md={3} key={item.id}>
                        <Box
                            className="h-[150px] rounded-md cursor-pointer object-cover"
                            sx={{
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundImage: `url(${item.imgRes})`,
                            }}
                        ></Box>
                        <span className="text-xl font-semibold flex justify-start lg:ml-0 ml-[44px]">
                            {item.restaurantName}
                        </span>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default GetAllStore