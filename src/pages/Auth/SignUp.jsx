import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ConfigContext } from "../../Context/ConfigeApi";
import Skeleton from "react-loading-skeleton";
import { Oval } from "react-loader-spinner";

// تسجيل حساب
export default function SignUp() {
  const navigate = useNavigate();
  const { apiData, isLoading } = useContext(ConfigContext);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // التحقق من صحة البيانات
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("الاسم مطلوب *")
      .min(2, "الحد الأدنى قصير جدًا وهو 2")
      .max(10, "الحد الأقصى طويل جدًا هو 6"),
    email: Yup.string()
      .required("البريد الالكتروني مطلوب")
      .email("البريد الإلكتروني غير صالح"),
    password: Yup.string()
      .required("كلمة المرور مطلوبة")
      .min(5, "الحد الأدنى قصير جدًا و هو 5")
      .max(10, "الحد الأقصى طويل جدًا و هو 10")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "كلمة المرور غير صالحة، يجب أن تبدأ بحرف كبير و10 فقط"
      ),
    rePassword: Yup.string()
      .required(" اعادة كلمة المرور مطلوبة *")
      .oneOf([Yup.ref("password")], "يجب أن يكون مثل كلمة المرور"),
    phone: Yup.string()
      .required("الهاتف مطلوب *")
      .matches(/^(002)?(01)[0-25][0-9]{8}/, "الهاتف غير صالح"),
  });

  const handleSubmit = async (values) => {
    // تحويل القيم إلى الصيغة المطلوبة
    const signUpData = {
      name: values.name,
      email: values.email,
      password: values.password,
      rePassword: values.rePassword,
      phone: values.phone,
    };
    // console.log("signUpData", signUpData);
    setLoading(true); // تعيين حالة التحميل إلى true
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        signUpData
      );
      // console.log("response-sign-up", response);
      if (response?.data?.message === "success") {
        navigate("/sign-in");
        setLoading(false);
        setMsg("");
        // console.log("user-name : ", response.data.user.name);
      } else {
        setMsg("message not success it is fail");
      }
      window.scrollTo(0, 0);
    } catch (error) {
      // setMsg(error?.response?.data?.message); // Account Already Exists
      setMsg("عفوا -- البريد الالكترونى مسجل مسبقا");
      setLoading(false);
      // console.log("error", error.response.data);
    }
  };

  return (
    <div className="py-10 flex justify-center items-center min-h-screen bg-gray-200 px-2">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            تسجيل الحساب
          </h2>
          {isLoading ? (
            <Skeleton circle={true} height={56} width={56} />
          ) : (
            apiData?.image_url && (
              <img
                src={`${apiData?.image_url}/${apiData?.logo}`}
                className="w-16 h-fit object-cover mr-4"
                alt="logo"
              />
            )
          )}
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
          }}
          // validationSchema={validationSchema}
          // onSubmit={handleSubmit}
        >
          {({ isValid, dirty }) => (
            <Form>
              {/* {msg ? (
                <p className="text-white bg-red-500 text-lg rounded-md text-center w-full p-2 mb-6 ">
                  {msg}
                </p>
              ) : (
                ""
              )} */}
              <div className="flex flex-col gap-4 mb-4">
                {/* name */}
                <div className="w-full">
                  <label
                    className="block text-HoverPrimary mb-1"
                    htmlFor="name"
                  >
                    <i className="fa-solid text-primary fa-user mx-2"></i>
                    الاسم:
                  </label>
                  <Field
                    className="w-full p-2 border border-gray-300 rounded"
                    type="text"
                    id="name"
                    name="name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* email */}
                <div className="w-full">
                  <label
                    className="block text-HoverPrimary mb-1"
                    htmlFor="email"
                  >
                    <i className="fa-solid text-primary fa-envelope mx-2"></i>
                    البريد الالكترونى :
                  </label>
                  <Field
                    className="w-full p-2 border border-gray-300 rounded"
                    type="email"
                    id="email"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* password */}
                <div className="w-full">
                  <label
                    className="block text-HoverPrimary mb-1"
                    htmlFor="password"
                  >
                    <i className="fa-solid text-primary fa-lock mx-2"></i>
                    كلمة المرور :
                  </label>
                  <Field
                    className="w-full p-2 border border-gray-300 rounded"
                    type="password"
                    id="password"
                    name="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* rePassword */}
                <div className="w-full">
                  <label
                    className="block text-HoverPrimary mb-1"
                    htmlFor="rePassword"
                  >
                    <i className="fa-solid text-primary fa-lock mx-2"></i>
                    اعادة كلمة المرور :
                  </label>
                  <Field
                    className="w-full p-2 border border-gray-300 rounded"
                    type="password"
                    id="rePassword"
                    name="rePassword"
                  />
                  <ErrorMessage
                    name="rePassword"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* phone */}
                <div className="w-full">
                  <label
                    className="block text-HoverPrimary mb-1"
                    htmlFor="phone"
                  >
                    <i className="fa-solid text-primary fa-phone mx-2"></i>
                    رقم الجوال :
                  </label>
                  <Field
                    className="text-right w-full p-2 border border-gray-300 rounded"
                    type="tel"
                    id="phone"
                    name="phone"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded w-1/2 text-white ${
                      !isValid || !dirty || loading
                        ? "bg-primary/50 hover:cursor-not-allowed"
                        : "bg-primary"
                    }`}
                    disabled={!isValid || !dirty || loading} // تعطيل الزر إذا كانت الحقول غير صالحة أو لم يتم تغييرها أو أثناء التحميل
                  >
                    {loading ? (
                      <Oval
                        visible={true}
                        height="25"
                        width="80"
                        color="#ffffff"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass="flex justify-center items-center"
                      />
                    ) : (
                      "تسجيل"
                    )}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
