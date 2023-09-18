function getList(labelList: string[], navList: string[]) {
  const list = labelList.map((item, index) => ({
    label: item,
    nav: "/admin" + navList[index],
  }))
  return list
}
export const OrderList = getList(
  ["Báo giá", "Đơn hàng", "Nhân viên", "Khách hàng"],
  ["/quote", "/order", "/employee", "/customer"],
)
export const InvoiceList = getList(
  ["Hóa đơn", "Thống kê hóa đơn"],
  ["/invoice", "/invoice-stat"],
)
export const ProductList = getList(
  ["Sản phẩm", "Loại sản phẩm", "Nhà cung cấp"],
  ["/product", "/type", "/supplier"],
)
export const ConfigList = getList(
  ["Cài đặt","Món kèm", "Nhân viên", "Phương thức thanh toán"],
  ["/setting","/expand-food","/config-emp", "/pay-method"],
)