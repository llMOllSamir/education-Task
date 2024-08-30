import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../../Context/ConfigeApi";
import Skeleton from "react-loading-skeleton";
import MainTitle from "../MainTitle/MainTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { profile, apiData, isLoading } = useContext(ConfigContext);
  const [tests, setTests] = useState([]);
  const [testId, setTestId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTest, setSelectedTest] = useState(null);
  const [loadingTest, setLoadingTest] = useState(false);
  const navigate = useNavigate();
  // tests
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = localStorage.getItem("userTokenEducation");
        if (!token) {
          navigate("/login");
          return;
        }
        const data = sessionStorage.getItem("examResult");
        console.log("examResult", JSON.parse(data));
        const response = await axios.get(
          "https://admin.dr-eissa.com/api/v1/profile/tests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTests(response.data);

        setLoading(false);
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
        setLoading(false);
      }
    };

    fetchTests();
  }, [navigate]);

  // دالة لجلب تفاصيل الاختبار بناءً على الـ ID المحدد

  const fetchTestDetails = async (testId) => {
    setLoadingTest(true); // تعيين حالة التحميل إلى true عند بدء التحميل
    try {
      const token = localStorage.getItem("userTokenEducation");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `https://admin.dr-eissa.com/api/v1/profile/test/${testId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedTest(response.data);
      console.log("response.data", response.data);
    } catch (error) {
      console.error("خطأ في جلب تفاصيل الاختبار:", error);
    } finally {
      setLoadingTest(false); // تعيين حالة التحميل إلى false بعد انتهاء التحميل
    }
  };

  return (
    <section className="body-font">
      {/* الملف الشخصى */}
      <MainTitle head_text={"الملف الشخصى"} />
      <div className="container px-5 w-full md:w-[85%] py-10 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-4">
          <div className="all data w-full md:w-1/2 bg-white p-4 flex flex-col items-center text-center gap-8 shadow-xl rounded-lg">
            <div className="">
              {isLoading ? (
                <Skeleton circle={true} height={56} width={56} />
              ) : (
                apiData?.image_url && (
                  <img
                    src={`${apiData?.image_url}/${apiData?.logo}`}
                    className="w-24 h-fit object-cover"
                    alt="logo"
                  />
                )
              )}
            </div>
            <div className="">
              {isLoading ? (
                <div>
                  <Skeleton height={24} width={200} />
                  <Skeleton height={24} width={150} />
                  <Skeleton height={24} width={180} />
                </div>
              ) : (
                <div className="">
                  <p className="my-2 text-2xl md:text-4xl text-primary">
                    {profile?.name}
                  </p>
                  <p className="my-2 text-sm md:text-lg text-gray-600">
                    {profile?.email}
                  </p>
                  <p className="my-2 text-sm md:text-lg text-gray-500">
                    {profile?.educational_level}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="image w-full md:w-1/2 bg-white p-4 flex flex-col gap-8 shadow-xl rounded-lg">
            {isLoading ? (
              <div>
                <Skeleton height={56} width={"100%"} />
                <Skeleton height={56} width={"100%"} />
                <Skeleton height={56} width={"100%"} />
                <Skeleton height={56} width={"100%"} />
              </div>
            ) : (
              <ul className="list-none p-0 md:p-4 text-gray-500">
                <li className="odd:bg-primary odd:text-gray-100 p-2 rounded flex justify-between items-center px-4 py-4 text-sm md:text-lg">
                  <span>الاسم</span>
                  <span>{profile?.name}</span>
                </li>
                <li className="odd:bg-primary odd:text-gray-100 p-2 rounded flex justify-between items-center px-4 py-4 text-sm md:text-lg">
                  <span>رقم الجوال</span>
                  <span>{profile?.phone}</span>
                </li>
                <li className="odd:bg-primary odd:text-gray-100 p-2 rounded flex justify-between items-center px-4 py-4 text-sm md:text-lg">
                  <span>البريد الالكتروني</span>
                  <span>{profile?.email}</span>
                </li>
                <li className="odd:bg-primary odd:text-gray-100 p-2 rounded flex justify-between items-center px-4 py-4 text-sm md:text-lg">
                  <span>العمر</span>
                  <span>{profile?.age}</span>
                </li>
                <li className="odd:bg-primary odd:text-gray-100 p-2 rounded flex justify-between items-center px-4 py-4 text-sm md:text-lg">
                  <span>الجنس</span>
                  <span>{profile?.gender}</span>
                </li>
                <li className="odd:bg-primary odd:text-gray-100 p-2 rounded flex justify-between items-center px-4 py-4 text-sm md:text-lg">
                  <span>المرحلة</span>
                  <span>{profile?.educational_level}</span>
                </li>
                <li className="odd:bg-primary odd:text-gray-100 p-2 rounded flex justify-between items-center px-4 py-4 text-sm md:text-lg">
                  <span>الحالة</span>
                  <span>{profile?.employment_status}</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      {/* جميع الاختبارات */}
      {tests.length > 0 ? (
        <div>
          <MainTitle head_text={"جميع الاختبارات"} />
          <div className="container w-full md:w-[85%] p-5 mx-auto">
            <div className="overflow-x-auto py-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {tests?.map((test, index) => (
                  <div
                    key={test.id}
                    className={`  ${testId === test.id ? "bg-gray-400  bg-opacity-50" : "bg-white"} p-4 shadow-lg rounded-lg cursor-pointer hover:shadow-xl `}
                    onClick={() => {
                      setTestId(test.id);
                      fetchTestDetails(test.id)
                    }}
                  >
                    <h3 className="text-xl font-semibold mb-2 text-primary">
                      اختبار : {/* {test.id} */}
                      {index + 1}
                    </h3>
                    <p className="text-gray-600  text-lg my-2">
                      بتاريخ : {new Date(test.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* عرض تفاصيل الاختبار إذا تم تحديده */}
      {loadingTest ? (
        <div className="block my-5 mx-auto w-1/2">
          <Skeleton height={50} width={"100%"} />
        </div>
      ) : (
        selectedTest && (
          <div className="container p-5 w-full md:w-[85%] mx-auto rounded-lg">
            <MainTitle head_text={"تفاصيل الاختبار "} />
            <div className="bg-white p-4 shadow-xl rounded-lg">
              {selectedTest.map((test, index) => (
                <div key={index} className="mb-8">
                  <h1 className="text-3xl text-center mb-2">{test.department.name}</h1>
                  <hr className="w-[35%] mx-auto md:w-[8%] h-[2px] my-2 ml-auto bg-primary border-none rounded-xl" />
                  {/* شريط التقدم */}
                  <div className="relative w-full max-w-xs my-2 mt-5">
                    <div className="w-full bg-gray-200 rounded-full h-6">
                      <div
                        className="bg-blue-500 h-full rounded-full"
                        style={{ width: `${test.department_degree}%` }}
                      >
                        {/* النص الذي يعرض النسبة */}
                        <div className="flex items-center justify-center h-full text-white font-semibold">
                          {test.department_degree}%
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
                      {test.answers_questions}
                    </span>
                  </p>
                  {/* عدد الاسئله الصحيحه */}
                  <p className="text-xl my-2">
                    <span className="mx-2">عدد الاجابات الصحيحه:</span>
                    <span className="text-red-600">{test.correct_answers}</span>
                  </p>
                  {/* عدد الاسئله الخاطئه */}
                  <p className="text-xl my-2">
                    <span className="mx-2">عدد الاجابات الخاطئه:</span>
                    <span className="text-red-600">
                      {test.incorrect_answers}
                    </span>
                  </p>
                  {test.file_rate &&
                    <p className="text-xl my-2">
                      <span className="mx-2">تقييم الملف الصوتي :</span>
                      <span className={`${test.file_rate === "ممتاز" ? "text-green-600" : test.file_rate === "متوسط" ? "text-amber-600" : "text-red-600"}`}>
                        {test.file_rate}
                      </span>
                    </p>}
                  {/* عرض نقاط القوة */}
                  <div className="my-4">
                    <h2 className="text-2xl font-semibold mb-2 text-primary">
                      نقاط القوة
                    </h2>
                    <ul className="list-disc list-inside pl-5 ">
                      {test.power_points.length > 0 ? (
                        test.power_points.map((point, index) => (
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
                      {test.weakness_points.length > 0 ? (
                        test.weakness_points.map((point, index) => (
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
                  {/* الدرجه */}
                  <p className="text-xl my-2">
                    <span className="mx-2">الدرجه:</span>
                    <span className="text-red-600">
                      {test.department_degree}
                    </span>
                  </p>
                  {/* تقيم النص ان وجد */}
                  <div className="mt-4">
                    {test.text && (
                      <>
                        <p className="text-xl my-2">
                          <span className="mx-2">النص المكتوب:</span>
                          <span className="text-red-600">" {test.text} " </span>
                        </p>
                        <p className="text-xl my-2">
                          <span className="mx-2">تقييم النص:</span>
                          <span className="text-red-600">
                            {test.text_rate ? test.text_rate : "لا يوجد تقييم"}
                          </span>
                        </p>
                      </>
                    )}
                  </div>
                  {/* فاصل بين الأقسام */}
                  {index < selectedTest.length - 1 && (
                    <hr className="w-full h-[2px] my-4 bg-gray-300 border-none rounded-xl" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </section>
  );
}

export default Profile;

{
  /* <p>
  <strong>الدرجة:</strong> {test.department_degree}
</p> */
}
{
  /* <p>
  <strong>تاريخ الإنشاء:</strong>{" "}
  {new Date(test.created_at).toLocaleString()}
</p>
<p>
  <strong>تاريخ التحديث:</strong>{" "}
  {new Date(test.updated_at).toLocaleString()}
</p> */
}
