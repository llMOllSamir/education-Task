import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import MainTitle from "../MainTitle/MainTitle";
import { useState } from "react";

const Contact = () => {
  const [successMessage, setSuccessMessage] = useState(""); // حالة لتخزين رسالة النجاح

  // دالة معالجة إرسال البيانات
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    axios
      .post("https://admin.dr-eissa.com/api/v1/store-contact", values)
      .then((response) => {
        console.log(response.data); // طباعة الاستجابة الكاملة
        if (response.data.status === "success") {
          setSuccessMessage(response.data.message || "تم إرسال الرسالة بنجاح."); // تخزين رسالة النجاح
        } else {
          alert("حدث خطأ: " + (response.data.message || "رسالة غير محددة"));
        }
        resetForm(); // إعادة تعيين النموذج بعد الإرسال الناجح
      })
      .catch((error) => {
        alert("حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.");
        console.log(error);
      })
      .finally(() => {
        setSubmitting(false); // إيقاف حالة الإرسال
      });
  };

  // تعريف دالة التحقق باستخدام Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(10, "الاسم يجب أن يكون على الأقل 10 أحرف")
      .max(35, "الاسم يجب ألا يزيد عن 35 حرفًا")
      .required("الاسم مطلوب"),
    phone: Yup.string()
      .matches(/^\d{8,12}$/, "رقم الهاتف يجب أن يكون بين 8 و 12 رقمًا")
      .required("رقم الهاتف مطلوب"),
    message: Yup.string().required("الرسالة مطلوبة"),
  });

  return (
    <>
      <MainTitle head_text={"للتواصل معنا"} />
      <section className="text-gray-400 body-font relative mb-10">
        <div className="container px-5 py-10 mx-auto">
          <Formik
            initialValues={{ name: "", phone: "", message: "" }} // القيم الابتدائية للحقول
            onSubmit={handleSubmit}
            validationSchema={validationSchema} // استخدام schema التحقق
          >
            {({ isSubmitting }) => (
              <Form data-aos="fade-up" data-aos-duration="1500">
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                  <div className="flex flex-wrap -m-2">
                    <div className="p-2 w-full md:w-1/2">
                      <div className="relative">
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className="w-full bg-opacity-40 rounded border border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          placeholder="اسمك"
                          dir="rtl"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-full md:w-1/2">
                      <div className="relative">
                        <Field
                          type="text"
                          id="phone"
                          name="phone"
                          className="w-full bg-opacity-40 rounded border border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          placeholder="رقم هاتفك"
                          dir="rtl"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <div className="relative">
                        <Field
                          as="textarea"
                          id="message"
                          name="message"
                          className="w-full bg-opacity-40 rounded border border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary h-32 text-base outline-none text-gray-900 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                          placeholder="رسالتك"
                          dir="rtl"
                        />
                        <ErrorMessage
                          name="message"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <button
                        type="submit"
                        className="flex mx-auto text-white bg-primary border-0 py-2 px-8 focus:outline-none hover:bg-HoverPrimary rounded text-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "جاري الإرسال..." : "ارسال"}
                      </button>
                    </div>
                    {successMessage && (
                      <div className="p-2 w-full">
                        <div className="text-green-500 text-center">
                          {successMessage}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default Contact;
