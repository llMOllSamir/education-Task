import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useContext, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ConfigContext } from "../../Context/ConfigeApi";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";

function SignIn() {
  let { setUserToken, setProfile, apiData, isLoading } =
    useContext(ConfigContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  // console.log("userToken", userToken);
  // التحقق من صحة البيانات
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("البريد الالكترونى مطلوب *")
      .email("البريد الالكترونى غير متاح"),
    password: Yup.string()
      .required("كلمة السر مطلوبه *")
      .min(5, "الحد الأدنى قصير جدًا وهو 5")
      .max(10, "الحد الأقصى طويل جدًا هو 10"),
    // .matches(
    //   /^[A-Z][a-z0-9]{5,10}$/,
    //   "كلمة المرور غير صالحة، يجب أن تبدأ بحرف كابيتال و 10 فقط"
    // ),
  });

  const handleSubmit = async (values) => {
    // تحويل القيم إلى الصيغة المطلوبة
    const signInData = {
      email: values.email,
      password: values.password,
    };
    // console.log("signInData", signInData);
    setLoading(true); // تعيين حالة التحميل إلى true
    try {
      const response = await axios.post(
        "https://admin.dr-eissa.com/api/v1/auth/login",
        signInData
      );
      // console.log("response-sign-in", response);

      // التحقق من حالة الاستجابه
      if (response?.data?.status === "success") {
        setUserToken(response?.data?.data?.token);
        localStorage.setItem("userTokenEducation", response?.data?.data?.token);

        sessionStorage.setItem("account_id", response.data.data.id);
        // profile
        setProfile(response?.data?.data);
        localStorage.setItem(
          "profileEducation",
          JSON.stringify(response?.data?.data)
        );
        // localStorage.setItem("profileEducation", response?.data?.data);
        console.log("profile", response?.data?.data);

        // عرض رسالة مع خيارات "المقياس" و "الرئيسية"
        Swal.fire({
          title: "أين تريد الذهاب؟",
          showCancelButton: true,
          confirmButtonText: "تجربة المقياس",
          cancelButtonText: "الصفحة الرئيسية",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/talemat-mekyas"); // توجيه إلى صفحة المقياس
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            navigate("/"); // توجيه إلى الصفحة الرئيسية
          }
        });

        setLoading(false);
        setMsg("");
        // console.log("response-data-sign-in", response?.data);
      }
      window.scrollTo(0, 0);
    } catch (error) {
      // setMsg("عفوا -- البريد الالكترونى غير مسجل");
      setMsg(error?.response?.data?.data); // UnAuthenticated !
      setLoading(false);
    }
  };

  return (
    <div className="py-10 flex justify-center items-center min-h-screen bg-gray-200 px-2">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            تسجيل دخول
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

        <span
          onClick={() => navigate("/register")}
          className="text-primary text-lg my-3 block cursor-pointer hover:underline"
        >
          اذا كنت لا تمتلك حساب سجل الان !
        </span>
        {/* Error message */}
        {msg ? (
          <p className="text-xl text-red-600 p-2 my-2 rounded-md text-left">
            {" "}
            {msg}{" "}
          </p>
        ) : (
          ""
        )}

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, dirty }) => (
            <Form>
              <div className="flex flex-col gap-4 mb-4">
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

export default SignIn;
