import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useNavigate } from "react-router-dom";
import useGetDepartments from "./hooks/useGetDepartments";
import useGetQuestions from "./hooks/useGetQuestions";

const Exam = () => {
  const [selectedDepartmentIndex, setSelectedDepartmentIndex] = useState(0); // حالة لتتبع القسم المختار
  const [answers, setAnswers] = useState({}); // حالة لتخزين الإجابات
  const [memoAnswers, setMemoAnswers] = useState([]); // حالة لتخزين الإجابات
  const [warningMessage, setWarningMessage] = useState(""); // رسالة تحذيرية في حالة وجود أسئلة غير مجابة
  const [submissionLoading, setSubmissionLoading] = useState(false); // حالة لتتبع تحميل إرسال البيانات
  const [showConfirmation, setShowConfirmation] = useState(false); // حالة لعرض رسالة التأكيد قبل الانتقال إلى صفحة النتيجة
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [fileValidation, setFileValidation] = useState(null);
  const navigate = useNavigate(); // لتوجيه المستخدم إلى صفحة جديدة بعد تقديم الإجابات

  // جلب accountId من sessionStorage
  const accountId = sessionStorage.getItem("account_id");
  // جلب الأقسام عند تحميل المكون
  const { departments, loading } = useGetDepartments()

  // جلب الأسئلة عندما يتغير القسم المختار
  const { loadingQuestions, questions } = useGetQuestions({ departments, selectedDepartmentIndex })

  // تحديث معلمات القسم الحالي
  useEffect(() => {
    setCurrentDepartment(departments[selectedDepartmentIndex]);
  }, [selectedDepartmentIndex, departments])

  // التعامل مع اختيار الإجابة
  const handleAnswerSelect = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const updateMemoAnswers = () => {
    const memoAnswerIndex = memoAnswers.findIndex(
      (memoAnswer) => memoAnswer.id === departments[selectedDepartmentIndex].id
    );
    if (memoAnswerIndex === -1) {
      setMemoAnswers([
        ...memoAnswers,
        {
          id: departments[selectedDepartmentIndex].id,
          answers: Object.keys(answers).map((question) => ({
            question_id: question,
            answer_id: answers[question] || null,
          })
          ),
        },
      ]);
    } else {
      // تعديل اجابات القسم في حاله وجود القسم بالفعل 
      const filterMemoAnswer = memoAnswers.filter((memoAnswer) => memoAnswer.id !== departments[selectedDepartmentIndex].id)
      setMemoAnswers([
        ...filterMemoAnswer,
        {
          id: departments[selectedDepartmentIndex].id,
          answers: Object.keys(answers).map((question) => ({
            question_id: question,
            answer_id: answers[question] || null,
          })
          ),
        },
      ]);
    }

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
      updateMemoAnswers();
      setSelectedDepartmentIndex(selectedDepartmentIndex + 1);
      setAnswers({});
      setWarningMessage("");
    }
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  // التعامل مع إنهاء المقياس
  const handleFinish = () => {
    setShowConfirmation(true);
  };
  useEffect(() => {
    console.log(answers);

  }, [answers])


  const confirmFinish = () => {
    const formData = new FormData()
    formData.append("account_id", accountId)

    const filterMemoAnswer = memoAnswers.filter((memoAnswer) => memoAnswer.id !== departments[selectedDepartmentIndex].id)
    setSubmissionLoading(true);
    const updatedMemoAnswers = [
      ...filterMemoAnswer,
      {
        id: departments[selectedDepartmentIndex].id,
        answers: Object.keys(answers).map((question) => {
          const answer = answers[question]; // الحصول على الإجابة بناءً على السؤال
          return {
            question_id: question,
            answer_id: answer,
          };
        }),
      },
    ];



    updatedMemoAnswers.forEach((memoAnswer, index) => {
      formData.append(`departments[${index}][id]`, memoAnswer.id);
      memoAnswer.answers.forEach((answer, indexAnswer) => {
        formData.append(`departments[${index}][answers][${indexAnswer}][question_id]`, answer.question_id);
        formData.append(`departments[${index}][answers][${indexAnswer}][answer_id]`, answer.answer_id);
      })
    })

    console.log("submissionData", formData.get("departments[0][answers][0][answer_id]"));

    axios
      .post(
        "https://admin.dr-eissa.com/api/v1/form-submition",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "userTokenEducation"
            )}`,
          },
        }
      )
      .then((response) => {
        console.log("submissionData after", formData);
        sessionStorage.setItem("examResult", JSON.stringify(response.data));
        setSubmissionLoading(false);
        navigate("/result");
      })
      .catch((error) => {
        console.log(error);
        setSubmissionLoading(false);
        alert("حدث خطأ أثناء تقديم الإجابات.");
        setShowConfirmation(false);
      });
  };



  if (loading) return <LoadingScreen message="جاري تحميل الأقسام..." />;


  return (
    <div className="flex flex-col min-h-screen justify-center py-11">
      <div className="bg-white px-4 py-2">
        <ul className="flex flex-wrap gap-4 overflow-x-auto justify-center">
          {departments.map((department, index) => (
            <li
              key={department.id}
              className={`py-2 px-4 text-lg sm:text-xl ${index === selectedDepartmentIndex
                ? "bg-primary text-white rounded"
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
            {
              currentDepartment.paragraph_type === "text" ? (
                <p className="mb-4 text-lg text-center mt-5 bg-primary p-4 rounded-lg text-white">
                  {currentDepartment.paragraph}
                </p>
              ) : currentDepartment.paragraph_type === "youtube_link" ? (
                <div className="video-container mb-4">
                  <iframe
                    width="100%"
                    height="500"
                    src={`https://www.youtube.com/embed/${new URLSearchParams(
                      new URL(currentDepartment.paragraph).search
                    ).get("v")}?autoplay=1&controls=0&modestbranding=1&rel=0`}
                    title="YouTube video player"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <p>نوع الفقرة غير معروف</p>
              )
            }

            {loadingQuestions ? (
              <LoadingScreen message="جاري تحميل الأسئلة..." />
            ) : (
              <>
                <ul className="space-y-4 mb-4 mt-12">
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
                          {
                            // تحديد اللون الخلفي للزر بناءً على الإجابة المختارة
                            question.answers.map((answer) => (
                              <button
                                key={answer.id}
                                onClick={() =>
                                  handleAnswerSelect(question.id, answer.id)
                                }
                                className={`py-2 px-4 rounded ${answers[question.id] === answer.id &&
                                  answer.answer_text === "صح"
                                  ? "bg-primary text-white"
                                  : answers[question.id] === answer.id &&
                                    answer.answer_text === "خطأ"
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-600 text-white"
                                  }`}
                              >
                                {answer.answer_text}
                              </button>
                            ))
                          }
                        </div>
                      ) : question.question_type === "choice" ? (
                        <div className="flex flex-wrap justify-center gap-4">
                          {question.answers.map((answer) => (
                            <button
                              key={answer.id}
                              onClick={() =>
                                handleAnswerSelect(question.id, answer.id)
                              }
                              className={`py-2 px-4 rounded ${answers[question.id] === answer.id
                                ? "bg-primary text-white"
                                : "bg-gray-600 text-white"
                                }`}
                            >
                              {answer.answer_text}
                            </button>
                          ))}
                        </div>
                      ) : question.question_type === "textAnswer" ? (
                        <textarea
                          className="w-full p-2 border border-gray-300 rounded"
                          rows="4"
                          placeholder="اكتب إجابتك هنا..."
                          onChange={(e) => {
                            handleAnswerSelect(question.id, e.target.value);
                          }}
                        ></textarea>
                      ) : question.question_type === "uploadFile" ? (
                        <>
                          <input
                            type="file"
                            accept="video/*,audio/*"
                            onChange={async (e) => {
                              if (e.target.files[0].type.startsWith('video/') || e.target.files[0].type.startsWith('audio/')) {
                                setFileValidation(null);
                                handleAnswerSelect(question.id, e.target.files[0]);
                              } else {
                                setFileValidation('يجب عليك تحديد ملف فيديو او صوت');
                                e.target.value = null;
                              }
                            }}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                          {fileValidation && <div className="text-red-500  mb-4">{fileValidation}</div>}
                        </>
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
                      className="py-2 px-4 bg-primary text-white rounded"
                    >
                      التالي
                    </button>
                  ) : (
                    <button
                      onClick={handleFinish}
                      className="py-2 px-4 bg-primary text-white rounded"
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-2">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">
              هل أنت متأكد أنك تريد إنهاء المقياس؟
            </h2>
            <button
              onClick={confirmFinish}
              className="py-2 px-4 mx-2 bg-primary text-white rounded mr-4"
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