import { useState } from "react";
import MainTitle from "../MainTitle/MainTitle";

function MgalatSection() {
  const [expandedId, setExpandedId] = useState(null);

  const data = [
    {
      id: 1,
      BgColor: "bg-red-500",
      dataAos: "fade-up",
      icon: <i className="fa-solid fa-microphone"></i>,
      title: "التحدث",
      desc: "القدرة على التعبير عن الأفكار والمشاعر والمعلومات بطريقة شفهية واضحة ومنظمة، وتشمل هذه المهارة جوانب تساعد الطلاب على تطوير قدراتهم التواصلية ومن أبرزها التعبير الشفهي، وأعني به القدرة على التعبير عن الأفكار والمشاعر بسلاسة ووضوح مع استخدام المفردات المناسبة والتراكيب اللغوية الصحيحة، مع طلاقة دون تردد، بالإضافة لمراعاة القواعد النحوية والأساليب اللغوية المعروفة، مع القدرة على المحاكاة للنصوص المسموعة بأنواعها، بالإضافة للتنظيم الأفكار بشكل منطقي ومتسلسل عند التحدث، بالإضافة لإتقان مهارات الإلقاء، من حيث الوقوف واستخدام لغة الجسد بشكل مناسب.",
    },
    {
      id: 2,
      BgColor: "bg-green-500",
      dataAos: "fade-down",
      icon: <i className="fa-solid fa-headphones"></i>,
      title: "الاستماع",
      desc: "هي القدرة على فهم النصوص والرسائل المسموعة وتحليلها، واستيعاب محتواها بشكل دقيق وفعّال، وتشمل هذه المهارة عدة جوانب تساعد الطلاب على تطوير قدراتهم السمعية والتفاعلية، ومن أبرزها الاستماع الفعال، والذي يعنى بتمييز الأصوات واالتركيز على النصوص والرسائل المسموعة، كذلك القدرة على فهم المعاني الظاهرة والضمنية، مع القدرة على معرفة الأفكار الرئيسة والفرعية، بالإضافة لتحليل المضمون المسموع ونقده، ومعرفة الترادف والتضاد في النص المسموع، مع القدرة على الترتيب",
    },
    {
      id: 3,
      BgColor: "bg-[#42396c]",
      dataAos: "fade-up",
      icon: <i className="fa-solid fa-pen-to-square"></i>,
      title: "الكتابة",
      desc: "هي القدرة على التعبير عن الأفكار والمشاعر بشكل مكتوب، وبطريقة منظمة، وتتضمن هذه المهارة، الكتابة الوصفية بحيث يصف الأشياء والأماكن والأحداث والأشخاص بدقة باستخدام المفردات المناسبة والتراكيب الصحيحة، كما يمتلك القدرة على كتابة القصص القصيرة، بتسلسل الأحداث وإبراز الشخصيات والمواقف، بالإضافة لابتكار نصوص جديدة تعبر عن أفكاره ومشاعره بشكل إبداعي ، مع القدرة كذلك على كتابة النصوص الوظيفية مثل: الرسائل والإرشادات، مع التنبه لعلامات الترقيم من أجل وضوح النص وفهمه، مع القدرة كذلك على ترابط النص بالأساليب اللغوية المناسبة. كالأمر والنهي، والدعاء والاستثناء والتوكيد ..إلخ ",
    },
    {
      id: 4,
      BgColor: "bg-blue-500",
      dataAos: "fade-down",
      icon: <i className="fa-solid fa-book-open-reader"></i>,
      title: "القراءة",
      desc: "هي القدرة على فهم النصوص المكتوبة واستيعاب محتواها مع تنمية القدرة على التفكير النقدي والتحليلي للنصوص المختلفة. تشمل هذه المهارة الجوانب التالية: القدرة على قراءة النصوص بصوت عالٍ بشكل صحيح وواضح، مع مراعاة قواعد اللغة والنحو وعلامات الترقيم. كذلك القدرة على فهم الأفكار الرئيسة والفرعية في النصوص المقروءة. كما تعني مهارة القراءة القدرة على تحليل النصوص بشكل نقدي، من خلال فهم العلاقات بين الأفكار والحجج المقدمة.  بالإضافة إل توسيع حصيلة المفردات وفهم استخداماتها المختلفة في السياقات المتنوعة. وفهم التراكيب اللغوية والنحوية وكيفية استخدامها بشكل صحيح.",
    },
  ];

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <MainTitle head_text={"مجالات اللغة العربية الأربع"} />
      <section className="text-gray-600 body-font text-center">
        <div className="container px-5 w-full md:w-[75%] py-10 mx-auto">
          <div className="flex flex-wrap -m-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="xl:w-1/4 md:w-1/2 p-4"
                data-aos={item.dataAos}
                data-aos-duration="2000"
              >
                <div
                  className={`shadow-lg shadow-primary py-2 rounded-lg flex flex-col items-center flex-grow overflow-hidden group   ${item.BgColor}`}
                >
                  <div className="flex justify-center items-center text-3xl bg-primary transition-colors duration-500 ease-in-out group-hover:bg-white group-hover:text-primary w-[60px] h-[60px] p-2 rounded-full text-white mb-4 border-4 border-white ">
                    {item.icon}
                  </div>
                  <div className="px-6 text-center">
                    <h2 className="text-2xl text-white font-medium title-font mb-1 mt-4 text-center">
                      {item.title}
                    </h2>
                    <hr className="w-[35%] md:w-[25%] h-[2px] my-4 mx-auto bg-white border-none rounded-xl animate" />
                    <p
                      className={`leading-relaxed text-lg text-center mb-4 text-gray-200 ${
                        expandedId === item.id ? "" : "line-clamp-3"
                      }`}
                    >
                      {item.desc}
                    </p>
                    {item.desc.length > 100 && (
                      <button
                        onClick={() => handleToggle(item.id)}
                        className="text-white hover:underline  button-Section pb-2"
                      >
                        {expandedId === item.id ? "اقرأ أقل" : "اقرأ المزيد"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default MgalatSection;
