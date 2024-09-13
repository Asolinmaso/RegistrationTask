"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function RegisterPage() {
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(2, "Full name is too short")
      .max(50, "Full name is too long")
      .required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    gender: Yup.string().required("Gender is required"),
    subscription: Yup.boolean(),
    country: Yup.string().required("Country is required"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Reset the form fields after successful registration
        resetForm();
        alert("Registration successful!");
      } else {
        alert("Error during registration");
      }
    } catch (error) {
      alert("Error submitting the form");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Create an Account</h1>

        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            gender: "",
            subscription: false,
            country: "",
            terms: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {/* Full Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
                <Field
                  name="fullName"
                  type="text"
                  className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-gray-700">Gender</label>
              <div className="flex items-center space-x-4 mt-2">
                <label className="flex items-center">
                  <Field
                    type="radio"
                    name="gender"
                    value="male"
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <Field
                    type="radio"
                    name="gender"
                    value="female"
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Subscription */}
            <div className="mb-4">
              <label className="flex items-center">
                <Field
                  type="checkbox"
                  name="subscription"
                  className="mr-2"
                />
                Subscribe to newsletter
              </label>
            </div>

            {/* Country */}
            <div className="mb-4">
              <label htmlFor="country" className="block text-gray-700">Country</label>
              <Field
                as="select"
                name="country"
                className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select your country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="au">Australia</option>
              </Field>
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Terms & Conditions */}
            <div className="mb-6">
              <label className="flex items-center">
                <Field
                  type="checkbox"
                  name="terms"
                  className="mr-2"
                />
                I accept the terms and conditions
              </label>
              <ErrorMessage
                name="terms"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Register
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
