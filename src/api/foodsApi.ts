import axiosClient from "./axiosClient";

const foodsApis = {
    getRecommendFood() {
        const url = "auth/get-recommend-food";
        return axiosClient.get(url);
    },
    getTypeFoods() {
        const url = "auth/get-all-type";
          return axiosClient.get(url);
    }
};

export default foodsApis