import { useState, useEffect } from 'react';

export function useScroll() {
  const [scrollY, setScrollY] = useState(window.scrollY);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    // Thêm sự kiện lắng nghe cuộn trang khi hook được sử dụng
    window.addEventListener('scroll', handleScroll);

    // Xóa sự kiện khi hook bị hủy
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Mảng rỗng để chỉ chạy một lần sau khi hook được tạo

  return scrollY;
}


