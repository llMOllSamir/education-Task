import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ConfigContext } from "../../Context/ConfigeApi";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";

function Register() {
  const [nationalities, setNationalities] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState("");
  const [loading, setLoading] = useState(false); // حالة التحميل
  const { SetChanges, apiData, isLoading, setUserToken, setProfile } =
    useContext(ConfigContext);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // المدن
  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await axios.get(
          "https://admin.dr-eissa.com/api/v1/get-countries"
        );
        const countries = response.data;
        setNationalities(countries);
      } catch (error) {
        console.error("خطأ في جلب الجنسيات:", error);
      }
    };

    fetchNationalities();
  }, []);

  // الجنسيات
  useEffect(() => {
    if (selectedNationality) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `https://admin.dr-eissa.com/api/v1/get-states/${selectedNationality}`
          );
          const citiesData = response.data;
          setCities(citiesData);
        } catch (error) {
          console.error("خطأ في جلب المدن:", error);
        }
      };

      fetchCities();
    }
  }, [selectedNationality]);

  const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    email: Yup.string()
      .required("البريد الالكتروني مطلوب")
      .email("البريد الإلكتروني غير صالح"),
    password: Yup.string()
      .required("كلمة المرور مطلوبة")
      .min(5, "الحد الأدنى قصير جدًا و هو 5")
      .max(10, "الحد الأقصى طويل جدًا و هو 10"),
    // .matches(
    //   /^[A-Z][a-z0-9]{5,10}$/,
    //   "كلمة المرور غير صالحة، يجب أن تبدأ بحرف كبير و10 فقط"
    // )
    password_confirmation: Yup.string()
      .required(" اعادة كلمة المرور مطلوبة *")
      .oneOf([Yup.ref("password")], "يجب أن يكون مثل كلمة المرور"),
    phone: Yup.string().required("رقم الجوال مطلوب"),
    gender: Yup.string().required("الجنس مطلوب"),
    status: Yup.string().required("الحالة مطلوبة"),
    age: Yup.string().required("العمر مطلوب"),
    nationality: Yup.string().required("الجنسية مطلوبة"),
    city: Yup.string().required("المدينة مطلوبة"),
    education: Yup.string().required("المرحلة الدراسية مطلوبة"),
  });

  const handleSubmit = async (values) => {
    // تحويل القيم إلى الصيغة المطلوبة
    const formattedData = {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
      phone: values.phone,
      gender: values.gender,
      employment_status: values.status,
      age: values.age,
      country_id: values.nationality,
      state_id: values.city,
      educational_level: values.education,
    };
    setLoading(true);

    try {
      const response = await axios.post(
        "https://admin.dr-eissa.com/api/v1/auth/register",
        formattedData
      );
      console.log("formattedData", formattedData);
      if (response?.data?.status === "success") {
        console.log("response", response?.data?.data);

        setUserToken(response?.data?.data?.token);
        localStorage.setItem("userTokenEducation", response?.data?.data?.token);

        sessionStorage.setItem("account_id", response.data.data.id);
        // profile
        setProfile(response?.data?.data);
        localStorage.setItem(
          "profileEducation",
          JSON.stringify(response?.data?.data)
        );
        console.log("profile", response?.data?.data);

        Swal.fire({
          title: "أين تريد الذهاب؟",
          showCancelButton: true,
          confirmButtonText: "تجربة المقياس",
          cancelButtonText: "الصفحة الرئيسية",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/talemat-mekyas");
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            navigate("/");
          }
        });
        window.scrollTo(0, 0);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
    // setMsg("");
    // console.log("Submitting data:", values); // تحقق من البيانات المرسلة
    // ---------------- //
    // try {
    //   const response = await axios.post(
    //     "https://admin.dr-eissa.com/api/v1/auth/register",
    //     formattedData
    //   );
    //   if (response?.data?.status === "success") {
    //     setUserToken(response?.data?.data?.token);
    //     console.log("register-response-success", response?.data?.status);
    //     localStorage.setItem("userTokenEducation", response?.data?.data?.token);
    //     localStorage.setItem(
    //       "profileEducation",
    //       JSON.stringify(response?.data?.data())
    //     );
    //     sessionStorage.setItem("account_id", response.data.data.id);

    // Swal.fire({
    //   title: "أين تريد الذهاب؟",
    //   showCancelButton: true,
    //   confirmButtonText: "تجربة المقياس",
    //   cancelButtonText: "الصفحة الرئيسية",
    //   reverseButtons: true,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     navigate("/talemat-mekyas");
    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     navigate("/");
    //   }
    // });
    //   } else {
    //     setMsg("حدث خطأ أثناء الإرسال");
    //   }
    // } catch (error) {
    //   if (error.response && error.response.data && error.response.data.errors) {
    //     const errorMessages = error.response.data.errors
    //       .map((err) => Object.values(err))
    //       .flat();
    //     setMsg(errorMessages.join(" -- "));
    //   } else {
    //     setMsg("حدث خطأ غير متوقع. حاول مرة أخرى لاحقًا .");
    //   }
    // } finally {
    //   setLoading(false);
    // }
    // ---------------- //
  };

  return (
    <div className="py-10 flex justify-center items-center min-h-screen bg-gray-200 px-2">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            {/* البيانات الشخصية */}
            تسجيل حساب
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
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            phone: "",
            gender: "",
            status: "",
            age: "",
            nationality: "",
            city: "",
            education: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              {/* name && email */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                {/* name */}
                <div className="w-full md:w-1/2">
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
                <div className="w-full md:w-1/2">
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
              </div>
              {/* password && password_confirmation */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                {/* password */}
                <div className="w-full md:w-1/2">
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
                {/* password_confirmation */}
                <div className="w-full md:w-1/2">
                  <label
                    className="block text-HoverPrimary mb-1"
                    htmlFor="password_confirmation"
                  >
                    <i className="fa-solid text-primary fa-lock mx-2"></i>
                    اعادة كلمة المرور :
                  </label>
                  <Field
                    className="w-full p-2 border border-gray-300 rounded"
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                  />
                  <ErrorMessage
                    name="password_confirmation"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              {/* gender && state */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                {/* gender */}
                <div className="w-full md:w-1/2">
                  <label className="block text-HoverPrimary mb-1">
                    <i className="fa-solid text-primary fa-person-half-dress mx-2 text-xl"></i>
                    الجنس:
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <Field
                        type="radio"
                        name="gender"
                        value="male"
                        className="mr-2 ml-1 mt-2"
                      />
                      ذكر
                    </label>
                    <label className="flex items-center">
                      <Field
                        type="radio"
                        name="gender"
                        value="female"
                        className="mr-2 mt-2 ml-1"
                      />
                      أنثى
                    </label>
                  </div>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* state */}
                <div className="w-full md:w-1/2">
                  <label className="block text-HoverPrimary mb-1">
                    <i className="fa-solid text-primary fa-graduation-cap mx-2"></i>
                    الحالة:
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <Field
                        type="radio"
                        name="status"
                        value="طالب"
                        className="mr-2 mt-2 ml-1"
                      />
                      طالب
                    </label>
                    <label className="flex items-center">
                      <Field
                        type="radio"
                        name="status"
                        value="غير ذلك"
                        className="mr-2 mt-2 ml-1"
                      />
                      غير ذلك
                    </label>
                  </div>
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              {/* age && phone */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                {/* age */}
                <div className="w-full md:w-1/2">
                  <label className="block text-HoverPrimary mb-1" htmlFor="age">
                    <i className="fa-brands fa-magento mx-2"></i>
                    العمر:
                  </label>
                  <Field
                    className="w-full p-2 border border-gray-300 rounded"
                    type="text"
                    id="age"
                    name="age"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* phone */}
                <div className="w-full md:w-1/2">
                  <label
                    className="block text-HoverPrimary mb-1"
                    htmlFor="phone"
                  >
                    <i className="fa-solid text-primary fa-phone mx-2"></i>
                    رقم الجوال:
                  </label>
                  <Field
                    className="w-full p-2 border border-gray-300 rounded"
                    type="text"
                    id="phone"
                    name="phone"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              {/* nationality && city */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                {/* nationality */}
                <div className="w-full md:w-1/2">
                  <label
                    className="block text-HoverPrimary mb-1"
                    htmlFor="nationality"
                  >
                    <i className="fa-solid text-primary fa-flag-checkered mx-2"></i>
                    الجنسية:
                  </label>
                  <Field
                    as="select"
                    className="w-full p-2 border border-gray-300 rounded"
                    id="nationality"
                    name="nationality"
                    value={selectedNationality}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedNationality(value);
                      setFieldValue("nationality", value);
                      setCities([]);
                    }}
                  >
                    <option value="">اختر الجنسية</option>
                    {nationalities.map((nat) => (
                      <option key={nat.id} value={nat.id}>
                        {nat.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="nationality"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* city */}
                <div className="w-full md:w-1/2">
                  <label
                    className="block text-HoverPrimary mb-1"
                    htmlFor="city"
                  >
                    <i className="fa-solid text-primary fa-house-flag mx-2"></i>
                    المدينة:
                  </label>
                  <Field
                    as="select"
                    className="w-full p-2 border border-gray-300 rounded"
                    id="city"
                    name="city"
                  >
                    <option value="">اختر المدينة</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              {/* education -- المرحله الدراسيه */}
              <div className="mb-4">
                <label
                  className="block text-HoverPrimary mb-1"
                  htmlFor="education"
                >
                  <i className="fa-solid text-primary fa-school mx-2"></i>
                  المرحلة الدراسية:
                </label>
                <Field
                  as="select"
                  className="w-full p-2 border border-gray-300 rounded"
                  id="education"
                  name="education"
                >
                  <option value="">اختر المرحلة الدراسية</option>
                  <option value="الصف الرابع">الصف الرابع</option>
                  <option value="الصف الخامس">الصف الخامس</option>
                  <option value="الصف السادس">الصف السادس</option>
                  <option value="اخرى">اخرى</option>
                </Field>
                <ErrorMessage
                  name="education"
                  component="div"
                  className="text-red-500"
                />
              </div>
              {/* التسجيل */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded w-1/2"
                  disabled={loading} // تعطيل الزر أثناء التحميل
                >
                  {loading ? "جاري الإرسال..." : "تسجيل"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
