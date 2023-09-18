import { useRef, useState } from "react"
import { Paper, TextField, Button, Container, Box, Divider, Avatar } from "@mui/material"
import { AccountCircle, Lock, Assignment } from "@mui/icons-material";
import { useInforUser, useScroll, useWindowDimensions } from "@/hooks"
import { Menu } from "./Menu";
export interface ProfileProps {

}
type ExtendedFile = File & { preview: string };
export function Profile(props: ProfileProps) {
    const user = useInforUser()
    let imageRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        accountName: user?.accountName || '',
        msv: user?.msv || '',
        sdt: user?.sdt || '',
        imgUser: user?.imgUser || '',
    });
    const handleImageChange = (e: any) => {
        const file = e.target.files[0] as ExtendedFile;
        if (file) {
            file.preview = URL.createObjectURL(file);
            setFormData(prev => {
                return {
                    ...prev,
                    imgUser: file.preview
                }
            })
        }

    }
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Do something with the form data, like registration
        console.log('Form data:', formData);
    };
    return (
        <>
            <div className="mb-5">
                <h1 className="text-18-500">Hồ Sơ Của Tôi</h1>
                <p className="text-[#999798]">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            <Divider />
            <div className="flex mt-5">
                <Container className="!pl-0">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Tên"
                            name="accountName"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.accountName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Mã sinh viên"
                            name="msv"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.msv}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Số điện thoại"
                            name="sdt"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.sdt}
                            onChange={handleInputChange}
                        />

                        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: "20px" }}>
                            Lưu
                        </Button>
                    </form>
                </Container>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box className="flex items-center justify-center flex-col w-[250px]">
                    <input type="file" style={{ display: "none" }} ref={imageRef} onChange={handleImageChange} />
                    <Avatar
                        variant="circular"
                        alt="avatar"
                        sx={{ width: "100px", height: "100px", mr: 1, mb: 3 }}
                        src={formData.imgUser ? formData.imgUser : "https://www.hardiagedcare.com.au/wp-content/uploads/2019/02/default-avatar-profile-icon-vector-18942381.jpg"}
                        onClick={() => { imageRef.current?.click() }}
                    />
                    <Button variant="outlined" color="primary" onClick={() => { imageRef.current?.click() }}>
                        Chọn ảnh
                    </Button>
                </Box>
            </div>
        </>
    )
}