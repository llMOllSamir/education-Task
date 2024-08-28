import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import MainTitle from "../MainTitle/MainTitle";
import "react-loading-skeleton/dist/skeleton.css";

function AboutSection() {
  const { title } = useParams(); // استخدم useParams لاستخراج عنوان الصفحة من الرابط
  const [pageData, setPageData] = useState(null); // حالة لتخزين بيانات الصفحة
  const [loading, setLoading] = useState(true); // حالة لتتبع تحميل البيانات
  const [error, setError] = useState(null); // حالة لتخزين أي خطأ يحدث أثناء جلب البيانات

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        // جلب قائمة الصفحات من الـ API
        const response = await axios.get(
          "https://admin.dr-eissa.com/api/v1/pages"
        );
        const pages = response.data;

        // تحويل العنوان في الرابط إلى صيغة يمكن مقارنتها مع العناوين في الـ API
        const formattedTitle = title.replace(/-/g, " ");
        const page = pages.find(
          (p) => p.title.toLowerCase() === formattedTitle.toLowerCase()
        );

        if (page) {
          // إذا تم العثور على الصفحة، جلب تفاصيل الصفحة باستخدام الـ ID
          const pageResponse = await axios.get(
            `https://admin.dr-eissa.com/api/v1/pages/${page.id}`
          );
          setPageData(pageResponse.data); // تحديث حالة pageData ببيانات الصفحة
        } else {
          // إذا لم يتم العثور على الصفحة، تعيين حالة الخطأ
          setError(new Error("Page not found"));
        }
      } catch (error) {
        // إذا حدث خطأ أثناء جلب البيانات، تعيين حالة الخطأ
        setError(error);
      } finally {
        // عند انتهاء جلب البيانات، تعيين حالة loading إلى false
        setLoading(false);
      }
    };

    fetchPageData(); // استدعاء دالة جلب البيانات عند تحميل المكون
  }, [title]); // تنفيذ هذا التأثير عند تغير قيمة title

  if (loading) {
    // إذا كانت البيانات لا تزال تُحمل، عرض مكون Skeleton لتوضيح تحميل البيانات
    return (
      <div className="flex flex-col min-h-screen">
        <Skeleton width={300} height={40} className="mx-auto block w-56 my-4" />
        <div className="bg-gray-50 p-1 md:p-10 my-3">
          <Skeleton count={5} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    // عرض بيانات الصفحة إذا تم تحميلها بنجاح
    <div className="flex flex-col  min-h-screen">
      <div className="mt-10" data-aos="fade-up" data-aos-duration="2000">
        <MainTitle head_text={pageData?.title} />
      </div>
      {/* --- المحتوى الجديد جاهز و منسق  ---*/}
      {/* --- <strong></strong> ---*/}
      <div className="p-1 md:p-10 my-3">
        <p
          className="text-center text-gray-700 text-lg md:text-xl lg:text-2xl xl:text-3xl w-4/5 md:w-3/4 mx-auto leading-loose"
          data-aos="fade-down"
          data-aos-duration="2000"
          // استخدام dangerouslySetInnerHTML لعرض محتوى الصفحة كـ HTML
          dangerouslySetInnerHTML={{ __html: pageData?.content || "" }}
        />
      </div>
      {/* --- المحتوى القديم  --- */}
      {/* <div className=" p-1 md:p-10 my-3">
        <p
          className="text-center text-gray-700 text-lg md:text-xl lg:text-2xl xl:text-3xl w-4/5 md:w-3/4 mx-auto leading-loose"
          data-aos="fade-down"
          data-aos-duration="2000"
        >
          {pageData?.content}
        </p>
      </div> */}
    </div>
  );
}

export default AboutSection;

// ------------------- //

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import MainTitle from "../MainTitle/MainTitle";

// // الدالة لعرض تفاصيل الصفحة بناءً على عنوانها في الرابط
// function AboutSection() {
//   // استخراج العنوان من الرابط الديناميكي
//   const { title } = useParams();

//   // حالة لتخزين بيانات الصفحة التي تم جلبها من الـ API
//   const [pageData, setPageData] = useState(null);
//   // حالة لتتبع حالة التحميل
//   const [loading, setLoading] = useState(true);
//   // حالة لتخزين أي خطأ يحدث أثناء جلب البيانات
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // دالة لجلب بيانات الصفحة من الـ API
//     const fetchPageData = async () => {
//       try {
//         // جلب قائمة الصفحات من الـ API
//         const response = await axios.get(
//           "https://admin.dr-eissa.com/api/v1/pages"
//         );
//         const pages = response.data;

//         // تحويل العنوان في الرابط إلى صيغة يمكن مقارنتها مع العناوين في الـ API
//         const formattedTitle = title.replace(/-/g, " ");
//         // العثور على الصفحة بناءً على العنوان
//         const page = pages.find(
//           (p) => p.title.toLowerCase() === formattedTitle.toLowerCase()
//         );

//         if (page) {
//           // إذا تم العثور على الصفحة، جلب تفاصيل الصفحة باستخدام الـ ID
//           const pageResponse = await axios.get(
//             `https://admin.dr-eissa.com/api/v1/pages/${page.id}`
//           );
//           // تحديث حالة الصفحة بالبيانات المسترجعة
//           setPageData(pageResponse.data);
//         } else {
//           // إذا لم يتم العثور على الصفحة، تعيين حالة الخطأ
//           setError(new Error("Page not found"));
//         }
//       } catch (error) {
//         // إذا حدث خطأ أثناء جلب البيانات، تعيين حالة الخطأ
//         setError(error);
//       } finally {
//         // عند الانتهاء من جلب البيانات، تعيين حالة التحميل إلى false
//         setLoading(false);
//       }
//     };

//     // استدعاء دالة جلب البيانات عند تحميل المكون
//     fetchPageData();
//   }, [title]); // إعادة تنفيذ التأثير عند تغيير قيمة title

//   if (loading) {
//     // إذا كانت البيانات لا تزال تُحمل، عرض مكون Skeleton كبديل للتحميل
//     return (
//       <div className="flex flex-col min-h-screen">
//         <Skeleton width={300} height={40} className="mx-auto block w-56 my-4" />
//         <div className="bg-gray-50 p-1 md:p-10 my-3">
//           <Skeleton count={5} />
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     // إذا حدث خطأ أثناء جلب البيانات، عرض رسالة الخطأ
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     // عرض بيانات الصفحة إذا تم تحميلها بنجاح
//     <div className="flex flex-col min-h-screen">
//       <div className="mt-10" data-aos="fade-up" data-aos-duration="2000">
//         {/* عرض عنوان الصفحة */}
//         <MainTitle head_text={pageData?.title} />
//       </div>
//       <div className="p-1 md:p-10 my-3">
//         <p
//           className="text-center text-gray-700 text-lg md:text-xl lg:text-2xl xl:text-3xl w-4/5 md:w-3/4 mx-auto leading-loose"
//           data-aos="fade-down"
//           data-aos-duration="2000"
//           // استخدام dangerouslySetInnerHTML لعرض محتوى الصفحة كـ HTML
//           dangerouslySetInnerHTML={{ __html: pageData?.content || "" }}
//         />
//       </div>
//     </div>
//   );
// }

// export default AboutSection;
