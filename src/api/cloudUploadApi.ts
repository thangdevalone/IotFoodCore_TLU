import { CLOUD_HOST, CLOUD_NAME } from './../constants/common';
import axiosClient from './axiosClient';

const cloudUploadApi = {
  uploadImage(data: FormData) {
    const url = `${CLOUD_HOST}${CLOUD_NAME}/image/upload`;
    
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Thêm đoạn này để đảm bảo dữ liệu được gửi dưới dạng FormData
      },
    });
  },
};

export default cloudUploadApi;
