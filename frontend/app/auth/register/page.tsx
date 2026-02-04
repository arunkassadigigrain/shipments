// "use client";
// import Link from "next/link";
// import { useState } from "react";
// import { useFormik } from "formik";
// import { useCreateUserMutation } from "@/app/admin/services/userApi";
// import { useRouter } from "next/navigation";
// import PhoneInput from "react-phone-number-input";
// // import "react-phone-number-input/style.css";
// import { Eye, EyeOff } from "lucide-react";
// import * as Yup from "yup";

// const initialValues = {
//   name: "",
//   email: "",
//   phoneNumber: "",
//   password: "",
//   password_confirmation: "",
// };

// // Password validation schema
// const registerSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   phoneNumber: Yup.string().required("Phone number is required"),
//   password: Yup.string()
//     .required("Password is required")
//     .matches(
//       /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-[\]{};':"\\|,.<>/?]).{8,}$/,
//       "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character",
//     ),
//   password_confirmation: Yup.string()
//     .oneOf([Yup.ref("password")], "Passwords must match")
//     .required("Confirm your password"),
// });

// const Register = () => {
//   const [serverErrorMessage, setServerErrorMessage] = useState("");
//   const [acceptedTerms, setAcceptedTerms] = useState(false);
//   const [serverSuccessMessage, setServerSuccessMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const router = useRouter();
//   const [createUser] = useCreateUserMutation();

//   const { values, errors, handleChange, handleSubmit, setFieldValue } =
//     useFormik({
//       initialValues,
//       validationSchema: registerSchema,
//       onSubmit: async (values, action) => {
//         setLoading(true);
//         try {
//           const response = await createUser(values);
//           if (response.data && response.data.status === "success") {
//             setServerSuccessMessage(response.data.message);
//             setServerErrorMessage("");
//             action.resetForm();
//             setLoading(false);
//             router.push("/auth/verify-email");
//           }
//           if (response.error && "data" in response.error) {
//             setServerErrorMessage(
//               (response.error.data as { message: string }).message,
//             );
//             setServerSuccessMessage("");
//             setLoading(false);
//           }
//         } catch (error) {
//           setLoading(false);
//           setServerErrorMessage("An unexpected error occurred.");
//         }
//       },
//     });

//   return (
//     <div className="flex h-screen bg-black text-white p-4">
//       {/* Left Gradient Card */}
//       <div className="hidden relative grid-lines lg:flex w-2/3 flex-col items-center justify-center p-12 bg-gradient-to-b from-blue-500 to-black rounded-t-3xl">
//         <h2 className="text-3xl font-bold mb-3">DigiGrain 360</h2>
//         <h1 className="text-xl mb-4">Join Us Today</h1>
//         <p className="text-gray-300 mb-8 text-center">
//           Create your account to start tracking and growing with us.
//         </p>
//       </div>

//       {/* Right Form Section */}
//       <div className="flex w-full lg:w-1/3 flex-col justify-center px-8 md:px-20">
//         <h2 className="text-3xl font-bold mb-2">Register</h2>
//         <p className="text-gray-400 mb-6">Enter your details to continue</p>

//         {serverErrorMessage && (
//           <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
//             {serverErrorMessage}
//           </div>
//         )}
//         {serverSuccessMessage && (
//           <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center">
//             {serverSuccessMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name */}
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter your name"
//             value={values.name}
//             onChange={handleChange}
//             className="w-full px-5 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.name && (
//             <div className="text-red-500 text-sm">{errors.name}</div>
//           )}

//           {/* Email */}
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={values.email}
//             onChange={handleChange}
//             className="w-full px-5 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.email && (
//             <div className="text-red-500 text-sm">{errors.email}</div>
//           )}

//           {/* Phone Number */}
//           <div className="relative">
//             <input
//               type="tel"
//               name="phoneNumber"
//               value={values.phoneNumber}
//               onChange={handleChange}
//               // onBlur={handleBlur}
//               placeholder="Enter your phone number"
//               className="w-full px-5 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {errors.phoneNumber && (
//             <div className="text-red-500 text-sm mt-1">
//               {errors.phoneNumber}
//             </div>
//           )}

//           {/* Password */}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Enter your password"
//               value={values.password}
//               onChange={handleChange}
//               className="w-full px-5 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
//             >
//               {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//             </button>
//           </div>
//           {errors.password && (
//             <div className="text-red-500 text-sm">{errors.password}</div>
//           )}

//           {/* Confirm Password */}
//           <div className="relative">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               name="password_confirmation"
//               placeholder="Confirm your password"
//               value={values.password_confirmation}
//               onChange={handleChange}
//               className="w-full px-5 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword((prev) => !prev)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
//             >
//               {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//             </button>
//           </div>
//           {errors.password_confirmation && (
//             <div className="text-red-500 text-sm">
//               {errors.password_confirmation}
//             </div>
//           )}

//           {/* Terms & Conditions */}
//           <div className="flex items-start mb-4">
//             <input
//               id="terms"
//               type="checkbox"
//               checked={acceptedTerms}
//               onChange={(e) => setAcceptedTerms(e.target.checked)}
//               className="mt-1 mr-2"
//               required
//             />
//             <label htmlFor="terms" className="text-sm text-white">
//               I agree to the{" "}
//               <Link
//                 href="/auth/terms&conditions"
//                 className="text-blue-400 hover:underline"
//               >
//                 Terms and Conditions
//               </Link>{" "}
//               &{" "}
//               <Link
//                 href="/auth/privacypolicy"
//                 className="text-blue-400 hover:underline"
//               >
//                 Privacy Policy
//               </Link>
//             </label>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading || !acceptedTerms}
//             className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <p className="text-sm text-gray-300 mt-4 text-center">
//           Already have an account?{" "}
//           <Link href="/auth/login" className="text-blue-400 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;



"use client";

import Link from "next/link";
import { useState } from "react";
import { useFormik } from "formik";
import { useCreateUserMutation } from "@/app/admin/services/userApi";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import * as Yup from "yup";

/* ------------------ Initial Values ------------------ */
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  password_confirmation: "",
};

/* ------------------ Validation Schema ------------------ */
const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-[\]{};':"\\|,.<>/?]).{8,}$/,
      "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character",
    ),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

/* ------------------ Component ------------------ */
const Register = () => {
  const router = useRouter();
  const [createUser] = useCreateUserMutation();

  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [serverSuccessMessage, setServerSuccessMessage] = useState("");

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, actions) => {
      setLoading(true);
      try {
        const data = await createUser(values).unwrap();

        setServerSuccessMessage(
          data?.message || "Registered successfully",
        );
        setServerErrorMessage("");
        actions.resetForm();

        // ✅ Redirect to login page
        router.replace("/auth/login");
      } catch (error: any) {
        setServerSuccessMessage("");
        setServerErrorMessage(
          error?.data?.message || "Registration failed",
        );
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex h-screen bg-black text-white p-4">
      {/* Left Section */}
      <div className="hidden lg:flex w-2/3 flex-col items-center justify-center p-12 bg-gradient-to-b from-blue-500 to-black rounded-t-3xl">
        <h2 className="text-3xl font-bold mb-3">DigiGrain 360</h2>
        <h1 className="text-xl mb-4">Join Us Today</h1>
        <p className="text-gray-300 mb-8 text-center">
          Create your account to start tracking and growing with us.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex w-full lg:w-1/3 flex-col justify-center px-8 md:px-20">
        <h2 className="text-3xl font-bold mb-2">Register</h2>
        <p className="text-gray-400 mb-6">Enter your details to continue</p>

        {serverErrorMessage && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {serverErrorMessage}
          </div>
        )}

        {serverSuccessMessage && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center">
            {serverSuccessMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={values.name}
            onChange={handleChange}
            className="w-full px-5 py-3 bg-black border border-gray-700 rounded-lg"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            className="w-full px-5 py-3 bg-black border border-gray-700 rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          {/* Phone */}
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={values.phoneNumber}
            onChange={handleChange}
            className="w-full px-5 py-3 bg-black border border-gray-700 rounded-lg"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-black border border-gray-700 rounded-lg pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="password_confirmation"
              placeholder="Confirm your password"
              value={values.password_confirmation}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-black border border-gray-700 rounded-lg pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm">
              {errors.password_confirmation}
            </p>
          )}

          {/* Terms */}
          <div className="flex items-start">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1 mr-2"
              required
            />
            <label className="text-sm">
              I agree to{" "}
              <Link href="/auth/terms&conditions" className="text-blue-400">
                Terms
              </Link>{" "}
              &{" "}
              <Link href="/auth/privacypolicy" className="text-blue-400">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !acceptedTerms}
            className="w-full bg-white text-black py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-gray-300 mt-4 text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
