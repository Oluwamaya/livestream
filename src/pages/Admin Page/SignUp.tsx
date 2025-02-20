import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Password Visibility Toggle
const SignUp = () => {
    const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
  
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Handle form submission
  const handleSubmit = async (values: unknown) => {
    console.log(values)

    await axios.post("https://zego-backend.vercel.app/api/register",values).then((res)=>{
        console.log(res)
        if (res.status === 201) {
        alert(res.data.message )
        navigate("/hostlogin")
            
        }else{
            alert(res.data.message)
        }
    }).catch((error)=>{
        console.log(error)

        alert(error.response.data.message)
    })
    }
   ;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <Formik
          initialValues={{
           username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, handleChange, handleBlur, values }) => (
            <Form>
            

              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-300">Username</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {touched.username && errors.username && (
                  <p className="text-red-400 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300">Email Address</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-300">Password</label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-300">Confirm Password</label>
                <div className="relative">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Sign Up
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log In Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
