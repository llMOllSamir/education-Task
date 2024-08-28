import React from "react";
import { useParams } from "react-router-dom";
import readImg from "../../assets/mostawa1.jpg";
import writeImg from "../../assets/mostawa2.jpg";
import listenImg from "../../assets/mostawa3.jpg";
import speakImg from "../../assets/mostawa4.jpg";
import drosImg from "../../assets/mostawa5.jpg";

// مكون يعرض البيانات بناءً على المسار الديناميكي
function MostawaSection() {
  const { section } = useParams(); // section هو البارامتر في المسار

  // بيانات مختلفة بناءً على المسار
  const sectionData = {
    reading: {
      title: "القراءة",
      description: (
        <p className="text-xl leading-relaxed text-center text-gray-600">
          اكتساب المفردات ذكر مرادفات المفردات الجديدة وتحديد المعنى المناسب لها
          مستخدماً السياق ووضعها في سياقات أخرى. تمييز المفردات المتشابهة في
          المعنى واستخدامها في جمل تامة استنتاج مرادفات المفردات الجديدة ووضعها
          في سياقات زمنية ومكانية مختلفة. فهم المقروء وتحليله وتقويمه: استنتاج
          الأفكار الرئيسة والفرعية والمعلومات الواردة في النص المقروء، وإعادة
          ترتيبها وتنظيمها. استخراج الأساليب اللغوية الشائعة، كالدعاء والتعجب،
          والأمر والنهي استنتاج القيم والاتجاهات الإيجابية من النص المقروء
          وتوضيح أثرها في الفرد والمجتمع، مع القدرة على تصنيفها طرح أسئلة تتطلب
          إجابات تحليلية ونقدية حول النص المقروء، وتمييز نوع النص وخصائصه وغرضه
          التفريق بين الرأي والحقيقة معرفة عناصر القصة الأربعة من خلال النص
          واستخراجها
        </p>
      ),
      image: readImg,
    },
    writing: {
      title: "الكتابة",
      description: (
        <p className="text-xl leading-relaxed text-center text-gray-600">
          مهارات الكتابة الأساسية: كتابة كلمات وجمل قصيرة، مضبوطة بالشكل، وإدخال
          بعض الحروف على الكلمات(الباء- واللام – والفاء) والتمييز بين كتابة
          التاء المفتوحة والمربوطة التفريق بين اللام القمرية والشمسية والتنوين
          في حال ورودها في النص. عمليات الكتابة وتنظيم عناصرها. كتابة الفقرة
          كتابة صحيحة، وتحديد الفكرة الرئيسة والفرعية كتابة العناوين كتابة صحيحة
          وترتيب الجمل، وملء الفراغات بجمل قصيرة وخط واضح الكتابة في أغراض
          وأنواع مختلفة: كتابة فقرة قصيرة عن مشاهداته اليومية استخدام الجمل
          والعبارات المناسبة في المناسبات والمواقف المختلفة معرفة دلالات علامات
          الترقيم واستخدامها معرفة الظواهر الإملائية الأساسية وتوظيفها في
          الكتابة( همزة الوصل والقطع، والهمزة المتوسطة والمتطرفة، والاسم المقصور
          والممدود والمنقوص، والجمل المثبتة والمنفية،والألف اللينة في آخر
          الأسماء والأفعال والحروف) إلخ
        </p>
      ),
      image: writeImg,
    },
    listening: {
      title: "الاستماع",
      description: (
        <p className="text-xl leading-relaxed text-center text-gray-600">
          الانتباه للرسائل السمعية: تحديد المعلومات والتفاصيل(تواريخ وأحداث
          وشخصيات وأماكن) حسب تسلسل ورودها في النص المسموع تطبيق آداب الاستماع،
          وتنفيذ التعليمات الواردة في النص المسموع بشكل صحيح. فهم المسموع
          وتحليله وتقويمه: توضيح العلاقة بين المستوى الصوتي والمعاني والأساليب
          اللغوية والعواطف في النص المسموع. تحليل مكونات النص (العنوان والأفكار
          والمغزى) استنتاج الأفكار الرئيسة والفرعية ، وإيجاد المترادفات للكلمات
          الجديدة، وتحديد المعنى المناسب لها. تذوق النص المسموع، وإبداء رأيه
          فيها. تقويم مضمون النص المسموع وتحديد الصحيح من الخطأ، والرأي من
          الحقيقة.
        </p>
      ),
      image: listenImg,
    },
    speaking: {
      title: "التحدث",
      description: (
        <p className="text-xl leading-relaxed text-center text-gray-600">
          آداب الحديث والتواصل الشفهي تطبيق آداب التحدث بطلاقة، والتحكم في لغة
          الجسد ونبرة الصوت، والتزام الوقت المخصص للتحدث. استخدام أساليب لغوية
          محددة للحصول على معلومات مهمة التعبير شفهيا عن الأفكار والمشاعر
          والحاجات والخبرات. توظيف بعض الأساليب التي درسها(الاستفهام والاستثناء،
          والأمر والنهي، والدعاء، والتفضيل والتعجب، والتوكيد، والترجي والتمني)
          التعبير عن الصور من خلال وصفها.
        </p>
      ),
      image: speakImg,
    },
    dros: {
      title: "الدروس النحويه",
      description: (
        <p className="text-xl leading-relaxed text-center text-gray-600">
          تمييز الرفع والنصب والجر في الاسماء والافعال. تمييز أنماط الجملة
          الاسمية والفعلية والتركيبات الشائعة. فهم وظائف الكلمات والعبارات في
          الجملة. التمييز بين الكلمات الأساسية والكلمات الفرعية (حروف الجر،
          والضمائر، والأفعال) تطبيق قواعد النحو في الكتابة والتحدث
        </p>
      ),
      image: drosImg,
    },
  };

  // اختيار البيانات بناءً على المسار
  const data = sectionData[section] || {
    title: "المستوى غير موجود",
    description: "الرجاء التحقق من المسار.",
    image: "",
  };

  return (
    <div className="container px-5 py-10 mx-auto flex flex-col justify-center items-center gap-11">
      <div
        className="w-full lg:w-1/2 h-[300px] mb-10 lg:mb-0 rounded-lg overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <img
          alt="feature"
          className="object-cover object-center w-full h-full"
          src={data.image}
        />
      </div>
      <div
        className="flex flex-col flex-wrap lg:py-1 lg:w-3/4 lg:pl-12 text-center"
        data-aos="fade-down"
        data-aos-duration="2000"
      >
        <h1 className="text-xl lg:text-3xl text-center text-primary font-semibold">
          {data.title}
        </h1>
        <hr className="w-[35%] md:w-[40%] h-[2px] my-2 mx-auto bg-primary border-none rounded-xl animate" />
        {data.description}
      </div>
    </div>
  );
}

export default MostawaSection;
