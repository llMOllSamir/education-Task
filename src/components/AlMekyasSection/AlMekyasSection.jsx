import { useState, useEffect } from "react";
import MainTitle from "../MainTitle/MainTitle";
import axios from "axios";

function AlMekyasSection() {
  const [expandedId, setExpandedId] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://admin.dr-eissa.com/api/v1/get-features")
      .then((response) => {
        setData(response.data); // تعيين البيانات المُحملة من الـ API إلى الحالة
        setLoading(false); // تعيين حالة التحميل إلى false بعد إكمال التحميل
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // تعيين حالة التحميل إلى false في حالة حدوث خطأ
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <MainTitle head_text={"المقياس"} />
      {loading && (
        <div className="loader">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      )}
      <section className="text-gray-600 body-font">
        <div className="container px-5 w-full md:w-[75%] py-10 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {data.map((item) => (
              <div
                key={item.id}
                className="xl:w-1/3 md:w-1/2 p-4"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <div className="shadow-lg p-0 rounded-lg flex flex-col items-center flex-grow overflow-hidden group h-full border-b-2 border-primary">
                  <div className="px-6 flex flex-col flex-grow">
                    <h2 className="text-2xl text-primary font-medium title-font mb-2 text-center mt-4">
                      {item.title}
                    </h2>
                    <hr className="w-[35%] md:w-[40%] h-[2px] my-1 mx-auto bg-primary border-none rounded-xl animate" />
                    <p
                      className={`leading-relaxed  text-xl text-center mb-4 ${
                        expandedId === item.id ? "" : "line-clamp-3"
                      }`}
                    >
                      {item.description}
                    </p>
                    {item.description.length > 100 && (
                      <button
                        onClick={() => handleToggle(item.id)}
                        className="text-primary hover:underline pb-2 mt-auto button-Section"
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

export default AlMekyasSection;
