import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ConfigContext } from "../../Context/ConfigeApi";
import Skeleton from "react-loading-skeleton";

// تعريف مكون TalematAlMekyas
function TalematAlMekyas() {
  const { apiData, isLoading } = useContext(ConfigContext);
  // استخدام useNavigate للحصول على دالة التنقل navigate
  const navigate = useNavigate();

  // تعريف دالة handleNext للتنقل بين الصفحات بناءً على حالة account_id
  const handleNext = () => {
    // التحقق من عدم وجود account_id في sessionStorage والتنقل إلى الصفحة الرئيسية
    if (sessionStorage.getItem("account_id") === null) {
      navigate("/");
    }
    // التحقق من وجود account_id في sessionStorage والتنقل إلى صفحة الامتحان
    else if (sessionStorage.getItem("account_id") !== null) {
      navigate("/choose-department");
    }
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  // عرض واجهة المستخدم لتعليمات المقياس
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center p-2">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto my-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            تعليمات المقياس
          </h2>
          {isLoading ? (
            <Skeleton circle={true} height={56} width={56} />
          ) : (
            apiData?.image_url && (
              <img
                src={`${apiData?.image_url}/${apiData?.logo}`}
                className="w-14 h-fit object-cover mr-4"
                alt="logo"
              />
            )
          )}
        </div>
        <ul className="list-disc list-inside text-gray-700 leading-loose mb-4 text-lg">
          <li>
            يتكون المقياس من خمسة مجالات (القراءة - الكتابة – التحدث – الاستماع
            – الدروس النحوية).
          </li>
          <li>
            أمام كل مجال عشرة أسئلة، ماعدا الدروس النحوية، فتحتوي على خمسة أسئلة
            لكل درس.
          </li>
          <li>
            أنوع الأسئلة: موضوعية ما بين اختيار من متعدد، والصواب والخطأ،
            والمزاوجة، وإكمال الفراغ بالاختيار، وإعادة الترتيب.
          </li>
        </ul>
        <div className="text-red-600 leading-loose text-lg">
          <p className="mb-2">
            ❖ ابني الطالب أجب على جميع أسئلة المقياس بصدق وتركيز، وتأكد أن
            إجابتك على جميع أسئلة المقياس ستسهم في تعزيز دقة النتائج، والحصول
            على توصيات ملائمة لك.
          </p>
          <p>
            ❖ كن على علم أن المقياس يعكس مستواك الحالي بنسبة كبيرة. الغرض من
            أسئلة المقياس هو قياس مستواك الحالي، من أجل التحسين والتطوير، وليس
            له علاقة بنجاحك أو رسوبك.
          </p>
        </div>
        <button
          type="button"
          onClick={handleNext}
          className="bg-primary text-white p-3 mt-5 rounded-lg w-full"
        >
          التالي
        </button>
      </div>
    </div>
  );
}

// تصدير المكون TalematAlMekyas لاستخدامه في مكان آخر
export default TalematAlMekyas;
