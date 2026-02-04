import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required").email("Invalid email format"),
  password: Yup.string().required("Password is required"),
  password_confirmation: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password") as unknown as string, "Password and Confirm Password doesn't match"]),
});

export const loginSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid email format"),
  password: Yup.string().required("Password is required"),
});

export const resetPasswordLinkSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid email format"),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  password_confirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password") as unknown as string, "Password and Confirm Password doesn't match"]),
});

export const verifyEmailSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid email format"),
  otp: Yup.string().required("OTP is required"),
});

export const changePasswordSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  password_confirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password") as unknown as string, "Password and Confirm Password doesn't match"]),
});


export const itemSchema = Yup.object({
  itemName: Yup.string()
    .required("Item Name is required")
    .min(2, "Item Name must be at least 2 characters")
    .max(50, "Item Name cannot exceed 50 characters"),

  itemVariety: Yup.string()
    .required("Item Variety is required")
    .min(2, "Item Variety must be at least 2 characters")
    .max(50, "Item Variety cannot exceed 50 characters"),

  packingType: Yup.string()
    .required("Packing Type is required")
    .min(2, "Packing Type must be at least 2 characters")
    .max(50, "Packing Type cannot exceed 50 characters"),
});


