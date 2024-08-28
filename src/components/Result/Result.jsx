import { useContext, useEffect, useRef, useState } from "react";
import { ConfigContext } from "../../Context/ConfigeApi";
import resultImage from "../../assets/two-image2.jpg";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";

// تسجيل الإضافات الخاصة بمكتبة الرسم البياني
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Result = () => {
  const [resultData, setResultData] = useState(null);
  const { apiData } = useContext(ConfigContext);
  const navigate = useNavigate();
  const componentRef = useRef();
  useEffect(() => {
    // استرجاع البيانات من sessionStorage عند تحميل المكون
    const data = sessionStorage.getItem("examResult");
    if (data) {
      setResultData(JSON.parse(data));
    } else {
      // إذا لم تكن هناك بيانات، يجب توجيه المستخدم بعيدًا عن صفحة النتائج
      navigate("/");
    }
  }, [navigate]);

  // إعداد البيانات للرسم البياني
  const chartData = {
    labels: resultData?.reports.map((item) => item.department.name) || [],
    datasets: [
      {
        label: "", // إزالة النص "Progress" من عنوان الرسم البياني
        data: resultData?.reports.map((item) => item.department_degree) || [],
        backgroundColor: [
          "rgba(255, 99, 132, 1)", // لون الخلفية للعمود الأول
          "rgba(54, 162, 235, 1)", // لون الخلفية للعمود الثاني
          "rgba(255, 206, 86, 1)", // لون الخلفية للعمود الثالث
          "rgba(75, 192, 192, 1)", // لون الخلفية للعمود الرابع
          "rgba(153, 102, 255, 1)", // لون الخلفية للعمود الخامس
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // لون حدود العمود الأول
          "rgba(54, 162, 235, 1)", // لون حدود العمود الثاني
          "rgba(255, 206, 86, 1)", // لون حدود العمود الثالث
          "rgba(75, 192, 192, 1)", // لون حدود العمود الرابع
          "rgba(153, 102, 255, 1)", // لون حدود العمود الخامس
        ],
        borderWidth: 1,
        barThickness: 30, // تحديد سمك الأعمدة ليكون أرفع
      },
    ],
  };

  // دالة لمعالجة النقر على زر "النهاية"
  // const handleEndClick = () => {
  //   alert("تمت مراجعة جميع الأسئلة. يمكنك الآن الانتقال إلى الصفحة الرئيسية.");
  //   navigate("/");
  //   window.scrollTo(0, 0);
  // };

  return (
    <div
      className="flex flex-col min-h-screen py-11 px-4 bg-gray-100"
      ref={componentRef}
    >
      {apiData?.image_url && (
        <img
          src={`${apiData?.image_url}/${apiData?.logo}`}
          className="w-24 md:w-32 h-fit object-cover mx-auto my-4"
          alt="logo"
        />
      )}
      <div className="">
        <img
          src={resultImage}
          className="w-full md:w-3/4 h-52 object-cover mx-auto my-4 rounded-xl"
          alt="resultImage"
        />
      </div>
      <div className="w-full md:w-3/4 mx-auto">
        <p className="text-center text-lg p-5 my-4">
          الحمدلله وحده، والصلاة والسلام على من لا نبي بعده .. وبعد : بداية شكرا
          جزيلا لمشاركتك في المقياس والذي نهدف من خلاله إلى مساعدتك للتعرف على
          نفسك بصورة شاملة لجميع الجوانب الحياتية، التي تساعدك على التوازن
          والتميز الشخصي وتحسين جودة حياتك الشخصية، ومشاركتك في هذا المقياس دليل
          وعيك، وحرصك على أن تكون حياتك حياة مميزة.
        </p>
      </div>
      {resultData ? (
        <div className="bg-white my-4 container shadow-lg rounded-lg p-6 mx-auto max-w-5xl">
          <div className="mb-4 flex flex-col md:flex-row gap-4 md:gap-14 text-xl justify-center">
            <p className="text-gray-700 flex items-center gap-2">
              <strong>الاسم:</strong>
              <span className="text-primary font-semibold">
                {resultData?.account?.name}
              </span>
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <strong>المرحلة التعليمية:</strong>{" "}
              <span className="text-primary font-semibold">
                {resultData?.account?.educational_level}
              </span>
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <strong>الحالة :</strong>{" "}
              <span className="text-primary font-semibold">
                {resultData?.account?.employment_status}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-700">لا توجد بيانات لعرضها.</p>
      )}
      {/* الأقسام */}
      {resultData ? (
        <div className="bg-white container shadow-lg rounded-lg p-6 mx-auto max-w-screen-xl">
          <div>
            {resultData.reports.map((item, index) => {
              return (
                <div key={item.id} className="text-right px-4 my-4">
                  <h1 className="text-3xl mb-2">{item.department.name}</h1>
                  <hr className="w-[35%] md:w-[8%] h-[2px] my-2 ml-auto bg-primary border-none rounded-xl" />
                  <div className="my-6 flex flex-col items-start">
                    {/* شريط التقدم */}
                    <div className="relative w-full max-w-xs">
                      <div className="w-full bg-gray-200 rounded-full h-6">
                        <div
                          className="bg-blue-500 h-full rounded-full"
                          style={{ width: `${item.department_degree}%` }}
                        >
                          {/* النص الذي يعرض النسبة */}
                          <div className="flex items-center justify-center h-full text-white font-semibold">
                            {item.department_degree}%
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* عدد الأسئلة التي تمت الإجابة عليها */}
                    <p className="text-xl my-2">
                      <span className="mx-2">
                        عدد الأسئلة التي تمت الإجابة عليها:
                      </span>
                      <span className="text-red-600">
                        {item.answers_questions}
                      </span>
                    </p>
                    {/* عدد الاسئله الصحيحه */}
                    <p className="text-xl my-2">
                      <span className="mx-2">عدد الاجابات الصحيحه:</span>
                      <span className="text-red-600">
                        {item.correct_answers}
                      </span>
                    </p>
                    {/* عدد الاسئله الخاطئه */}
                    <p className="text-xl my-2">
                      <span className="mx-2">عدد الاجابات الخاطئه:</span>
                      <span className="text-red-600">
                        {item.incorrect_answers}
                      </span>
                    </p>
                    {/* عرض نقاط القوة */}
                    <div className="my-4">
                      <h2 className="text-2xl font-semibold mb-2 text-primary">
                        نقاط القوة
                      </h2>
                      <ul className="list-disc list-inside pl-5 ">
                        {item.power_points.length > 0 ? (
                          item.power_points.map((point, index) => (
                            <li key={index} className="text-primary text-lg">
                              {point}
                            </li>
                          ))
                        ) : (
                          <li className="text-primary text-lg ">
                            لا توجد نقاط قوة
                          </li>
                        )}
                      </ul>
                    </div>
                    {/* عرض نقاط الضعف */}
                    <div className="my-4">
                      <h2 className="text-2xl font-semibold mb-2 text-red-600">
                        نقاط الضعف
                      </h2>
                      <ul className="list-disc list-inside pl-5 ">
                        {item.weakness_points.length > 0 ? (
                          item.weakness_points.map((point, index) => (
                            <li key={index} className="text-red-600 text-lg">
                              {point}
                            </li>
                          ))
                        ) : (
                          <li className="text-red-600 text-lg ">
                            لا توجد نقاط ضعف
                          </li>
                        )}
                      </ul>
                    </div>
                    {/* فاصل بين الأقسام */}
                    {index < resultData.reports.length - 1 && (
                      <hr className="w-full h-[2px] my-4 bg-gray-300 border-none rounded-xl" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* الرسم البياني */}
          {/* <h1 className="text-2xl text-center">رسم بيانى</h1> */}
          <div className="max-w-xl mx-auto my-8 h-[250px]">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false, // السماح بتغيير النسبة حسب حجم الشاشة
                scales: {
                  x: {
                    beginAtZero: true,
                    ticks: {
                      color: "gray", // تغيير لون النص على المحور X
                      font: {
                        size: 15,
                      },
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: "black", // تغيير لون النص على المحور Y
                      stepSize: 1,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false, // إخفاء مفتاح الرسم البياني
                  },
                  tooltip: {
                    enabled: true, // تفعيل عرض التفاصيل عند التمرير على الأعمدة
                  },
                },
              }}
            />
          </div>
          {/* زر النهاية */}
          {/* <button
            onClick={handleEndClick}
            className="bg-primary hover:bg-primary-dark text-white py-2 px-6 rounded-full block mx-auto my-4"
          >
            النهاية
          </button> */}
          {/* زر تحميل PDF */}
          <ReactToPrint
            trigger={() => (
              <button className="bg-primary hover:bg-HoverPrimary text-white py-2 px-6 rounded-full block mx-auto my-4">
                تحميل PDF
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      ) : (
        <p className="text-center text-gray-700">لا توجد بيانات لعرضها.</p>
      )}
    </div>
  );
};

export default Result;
