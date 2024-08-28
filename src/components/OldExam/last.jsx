// export default Exam;
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { ConfigContext } from "../../Context/ConfigeApi";

const Exam = () => {
  const [departments, setDepartments] = useState([]); // حالة لتخزين الأقسام
  const [questions, setQuestions] = useState([]); // حالة لتخزين الأسئلة
  const [selectedDepartmentIndex, setSelectedDepartmentIndex] = useState(0); // حالة لتتبع القسم المختار
  const [answers, setAnswers] = useState([]); // حالة لتخزين الإجابات
  const [loading, setLoading] = useState(true); // حالة لتتبع تحميل الأقسام
  const [loadingQuestions, setLoadingQuestions] = useState(false); // حالة لتتبع تحميل الأسئلة
  const [warningMessage, setWarningMessage] = useState(""); // رسالة تحذيرية في حالة وجود أسئلة غير مجابة
  const [submissionLoading, setSubmissionLoading] = useState(false); // حالة لتتبع تحميل إرسال البيانات
  const [showConfirmation, setShowConfirmation] = useState(false); // حالة لعرض رسالة التأكيد قبل الانتقال إلى صفحة النتيجة
  const navigate = useNavigate(); // لتوجيه المستخدم إلى صفحة جديدة بعد تقديم الإجابات

  const { apiData } = useContext(ConfigContext); // استخدام ConfigContext لجلب apiData
  const accountId = apiData?.account_id; // الحصول على account_id من apiData

  // جلب الأقسام عند تحميل المكون
  useEffect(() => {
    axios
      .get("https://admin.dr-eissa.com/api/v1/departments/list")
      .then((response) => {
        setDepartments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
        setLoading(false);
      });
  }, []);

  // جلب الأسئلة عندما يتغير القسم المختار
  useEffect(() => {
    if (departments[selectedDepartmentIndex]?.id) {
      setLoadingQuestions(true);
      axios
        .get(
          `https://admin.dr-eissa.com/api/v1/departments/department/questions/${departments[selectedDepartmentIndex].id}`
        )
        .then((response) => {
          setQuestions(response.data);
          setLoadingQuestions(false);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
          setLoadingQuestions(false);
        });
    }
  }, [selectedDepartmentIndex, departments]);

  // التعامل مع اختيار الإجابة
  // const handleAnswerSelect = (questionId, answer) => {
  //   setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
  //   // console.log("questionId", );
  //   // console.log(questionId)
  // };
  // const handleAnswerSelect = (questionId, answer) => {
  //   setAnswers((prevAnswers) => ({
  //     ...prevAnswers,
  //     [questionId]: {
  //       ...prevAnswers[questionId],
  //       ...answer,
  //     },
  //   }));
  //   console.log(answers);
  // };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers((prevAnswers) => {
      const newAnswers = prevAnswers.filter(
        (item) => item.question_id !== questionId
      ); // إزالة الإجابة السابقة لنفس السؤال إذا كانت موجودة

      return [...newAnswers, { question_id: questionId, answer_id: answer }];
    });
    console.log("answers", answers);
  };

  // التعامل مع الانتقال إلى القسم التالي
  const handleNext = () => {
    const unansweredQuestions = questions.filter(
      (question) => !answers[question.id]
    );

    if (unansweredQuestions.length > 0) {
      setWarningMessage(
        "يرجى الإجابة على جميع الأسئلة قبل الانتقال إلى القسم التالي."
      );
      return;
    }

    if (selectedDepartmentIndex < departments.length - 1) {
      setSelectedDepartmentIndex(selectedDepartmentIndex + 1);
      setAnswers({});
      setWarningMessage("");
    }
  };

  // التعامل مع إنهاء المقياس
  const handleFinish = () => {
    setShowConfirmation(true);
  };

  // تأكيد الإنهاء وإرسال البيانات
  const confirmFinish = () => {
    setSubmissionLoading(true);
    const submissionData = {
      account_id: accountId, // استخدام account_id من Context
      departments: departments?.map((department) => ({
        id: department.id,
        answers: questions
          .filter((question) => answers[question.id] !== undefined)
          .map((question) => ({
            question_id: question.id,
            answer_id: answers[question.id],
          })),
      })),
    };
    console.log("submissionData", submissionData);

    // axios
    //   .post("https://admin.dr-eissa.com/api/v1/form-submition", submissionData)
    //   .then((response) => {
    //     console.log("Submission successful:", response.data);
    //     sessionStorage.setItem("examResult", JSON.stringify(response.data)); // تخزين البيانات في sessionStorage
    //     setSubmissionLoading(false);
    //     // navigate("/result"); // الانتقال إلى صفحة النتائج بعد تقديم البيانات بنجاح
    //   })
    //   .catch((error) => {
    //     console.error("Error submitting form:", error);
    //     setSubmissionLoading(false);
    //     alert("حدث خطأ أثناء تقديم الإجابات.");
    //   });
  };

  if (loading) return <LoadingScreen message="جاري تحميل الأقسام..." />;

  const currentDepartment = departments[selectedDepartmentIndex];

  return (
    <div className="flex flex-col min-h-screen justify-center py-11">
      <div className="bg-white px-4 py-2">
        <ul className="flex flex-wrap gap-4 overflow-x-auto justify-center">
          {departments.map((department, index) => (
            <li
              key={department.id}
              className={`py-2 px-4 text-lg sm:text-xl ${
                index === selectedDepartmentIndex
                  ? "bg-red-500 text-white rounded"
                  : "bg-gray-100 text-gray-700 rounded"
              }`}
            >
              {department.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-grow bg-white px-4 py-4 w-full max-w-4xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">
          {currentDepartment ? currentDepartment.name : "لا يوجد قسم"}
        </h1>

        {currentDepartment && (
          <>
            {currentDepartment.paragraph_type === "text" ? (
              <p className="mb-4">{currentDepartment.paragraph}</p>
            ) : currentDepartment.paragraph_type === "youtube_link" ? (
              <div className="video-container mb-4">
                <iframe
                  width="100%"
                  height="500"
                  src={`https://www.youtube.com/embed/${new URLSearchParams(
                    new URL(currentDepartment.paragraph).search
                  ).get("v")}?autoplay=1&controls=0&modestbranding=1&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p>نوع الفقرة غير معروف</p>
            )}

            {loadingQuestions ? (
              <LoadingScreen message="جاري تحميل الأسئلة..." />
            ) : (
              <>
                <ul className="space-y-4 mb-4">
                  {questions.map((question) => (
                    <li
                      key={question.id}
                      className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-sm sm:text-lg"
                    >
                      <div className="font-semibold mb-2">
                        {question.question_text}
                      </div>
                      {question.question_type === "trueOrFalse" ? (
                        <div className="flex justify-center gap-4">
                          {question.answers.map((answer) => (
                            <button
                              key={answer.id}
                              onClick={() =>
                                handleAnswerSelect(question.id, answer.id)
                              }
                              className={`py-2 px-4 rounded ${
                                answers[question.id] === answer.id
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-600 text-white"
                              }`}
                            >
                              {answer.answer_text}
                            </button>
                          ))}
                          {/* <button
                            onClick={() =>
                              handleAnswerSelect(question.id, "صح")
                            }
                            className={`py-2 px-4 rounded ${
                              answers[question.id] === "صح"
                                ? "bg-green-700 text-white"
                                : "bg-gray-600 text-white"
                            }`}
                          >
                            صح
                          </button>
                          <button
                            onClick={() =>
                              handleAnswerSelect(question.id, "خطأ")
                            }
                            className={`py-2 px-4 rounded ${
                              answers[question.id] === "خطأ"
                                ? "bg-red-700 text-white"
                                : "bg-gray-600 text-white"
                            }`}
                          >
                            خطأ
                          </button> */}
                        </div>
                      ) : question.question_type === "choice" ? (
                        <div className="flex flex-wrap justify-center gap-4">
                          {question.answers.map((answer) => (
                            <button
                              key={answer.id}
                              onClick={() =>
                                handleAnswerSelect(question.id, answer.id)
                              }
                              className={`py-2 px-4 rounded ${
                                answers[question.id] === answer.id
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-600 text-white"
                              }`}
                            >
                              {answer.answer_text}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div>نوع السؤال غير معروف</div>
                      )}
                    </li>
                  ))}
                </ul>

                {warningMessage && (
                  <div className="text-red-500 text-center mb-4">
                    {warningMessage}
                  </div>
                )}

                <div className="flex justify-center mt-4">
                  {selectedDepartmentIndex < departments.length - 1 ? (
                    <button
                      onClick={handleNext}
                      className="py-2 px-4 bg-blue-500 text-white rounded"
                    >
                      التالي
                    </button>
                  ) : (
                    <button
                      onClick={handleFinish}
                      className="py-2 px-4 bg-green-500 text-white rounded"
                    >
                      إنهاء المقياس
                    </button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">
              هل أنت متأكد أنك تريد إنهاء المقياس؟
            </h2>
            <button
              onClick={confirmFinish}
              className="py-2 px-4 mx-2 bg-green-500 text-white rounded mr-4"
            >
              تأكيد
            </button>
            <button
              onClick={() => setShowConfirmation(false)}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {submissionLoading && <LoadingScreen message="جاري إرسال البيانات..." />}
    </div>
  );
};

export default Exam;
