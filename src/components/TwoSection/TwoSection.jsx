import { useState, useEffect, useContext } from "react";
import MainTitle from "../MainTitle/MainTitle";
import axios from "axios";
import { ConfigContext } from "../../Context/ConfigeApi";

function TwoSection() {
  const { apiData } = useContext(ConfigContext);
  const [expandedId, setExpandedId] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log("apiData from local", apiData);

  useEffect(() => {
    axios
      .get("https://admin.dr-eissa.com/api/v1/get-site-fields")
      .then((response) => {
        setData(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
      <MainTitle head_text={"التعريف بمجالات الموقع"} />
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
          <div className="flex flex-wrap justify-center -m-4">
            {data.length > 0
              ? data.map((item) => (
                  <div
                    key={item.id}
                    className="xl:w-1/3 md:w-1/2 p-4 flex"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                  >
                    <div className="shadow-lg p-0 rounded-lg flex flex-col items-start flex-grow overflow-hidden group border-b-2 border-primary">
                      <img
                        className="h-48 w-full object-cover object-center mb-6 img-data"
                        src={`${
                          apiData?.image_url
                            ? `${apiData.image_url}/${item.image}`
                            : item.image
                        }`}
                        alt="content"
                      />
                      <div className="px-6 flex-grow flex flex-col">
                        <h2 className="text-2xl text-primary font-medium title-font mb-1 text-center">
                          {item.title}
                        </h2>
                        <hr className="w-[35%] md:w-[25%] h-[2px] my-3 mx-auto bg-primary border-none rounded-xl" />
                        <p
                          className={`leading-relaxed text-xl text-center  mb-4 ${
                            expandedId === item.id ? "" : "line-clamp-3"
                          }`}
                        >
                          {item.description || "No description available."}
                        </p>
                        {item.description && item.description.length > 100 && (
                          <button
                            onClick={() => handleToggle(item.id)}
                            className="text-primary hover:underline text-center pb-3 button-Section"
                          >
                            {expandedId === item.id
                              ? "اقرأ أقل"
                              : "اقرأ المزيد"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </section>
    </>
  );
}

export default TwoSection;
