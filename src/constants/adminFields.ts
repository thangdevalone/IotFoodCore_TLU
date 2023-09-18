export const SupplierFields= [
  {
    // Visible in table header and when matching columns.
    label: "Tên nhà cung cấp",
    // This is the key used for this field when we call onSubmit.
    key: "restaurantName",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },
    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "Cửa hàng abc",
    // Can have multiple validations that are visible in Validation Step table.
    validations: [
      {
        // Can be "required" / "unique" / "regex"
        rule: "required",
        errorMessage: "Name is required",
        // There can be "info" / "warning" / "error" levels. Optional. Default "error".
        level: "error",
      },
    ],
    
  },
  {
    // Visible in table header and when matching columns.
    label: "Tên nhà cung cấp",
    // This is the key used for this field when we call onSubmit.
    key: "imgRes",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },
    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "Cửa hàng abc",
    // Can have multiple validations that are visible in Validation Step table.
    validations: [
      {
        // Can be "required" / "unique" / "regex"
        rule: "required",
        errorMessage: "Name is required",
        // There can be "info" / "warning" / "error" levels. Optional. Default "error".
        level: "error",
      },
    ],
    
  },
  {
    // Visible in table header and when matching columns.
    label: "Giờ mở cửa",
    // This is the key used for this field when we call onSubmit.
    key: "timeStart",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },
    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "8:00",
  },
  {
    // Visible in table header and when matching columns.
    label: "Giờ đóng cửa",
    // This is the key used for this field when we call onSubmit.
    key: "timeClose",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },
    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "22:00",
  },
  {
    // Visible in table header and when matching columns.
    label: "Khoảng cách",
    // This is the key used for this field when we call onSubmit.
    key: "distance",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },
    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "1.1 km",
  },
  {
    // Visible in table header and when matching columns.
    label: "Số điện thoại",
    // This is the key used for this field when we call onSubmit.
    key: "phoneNumber",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },
    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "09xxxxxxx",
  },
  {
    // Visible in table header and when matching columns.
    label: "Địa chỉ",
    // This is the key used for this field when we call onSubmit.
    key: "address",
    // Used when editing and validating information.
    fieldType: {
      // There are 3 types - "input" / "checkbox" / "select".
      type: "input",
    },
    // Used in the first step to provide an example of what data is expected in this field. Optional.
    example: "Đường abc, ngõ xyz, TP.Hà Nội",
  },
] as const