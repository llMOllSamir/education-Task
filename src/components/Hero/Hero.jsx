/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ConfigContext } from "../../Context/ConfigeApi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./hero.css";

function Hero() {
  const {
    apiData,
    isLoading,
    error,
    userToken,
    setUserToken,
    login,
    setLogin,
  } = useContext(ConfigContext);
  const navigate = useNavigate();

  // console.log("userToken", userToken);

  const handleButtonClick = () => {
    if (!userToken) {
      navigate("/sign-in");
    } else {
      navigate("/talemat-mekyas");
    }
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative flex items-center justify-center text-gray-800 lg:text-white hero-section">
      <div className="relative flex flex-col lg:flex-row items-center w-full z-10 px-4 sm:px-8 md:px-12">
        <div className="w-full lg:w-1/2 p-6 md:p-10 mt-2 md:mt-5 text-center flex flex-col justify-center items-center gap-2 md:gap-3 order-1 lg:order-first">
          <div className="w-[180px] sm:w-[220px] md:w-[180px] mx-auto md:mx-0 md:-translate-y-8">
            {isLoading ? (
              <Skeleton height={40} width={180} />
            ) : (
              <p className="text-4xl font-medium">{apiData?.site_name}</p>
            )}
          </div>
          <p
            className="text-lg sm:text-xl md:text-2xl leading-8 sm:leading-9 md:leading-10 w-full md:w-[90%] lg:w-[100%] mx-auto md:mx-0 text-center font-tajawal font-medium"
            // استخدام dangerouslySetInnerHTML لعرض محتوى الصفحة كـ HTML
            dangerouslySetInnerHTML={{
              __html: apiData?.site_dsecription || "",
            }}
          >
            {/* {isLoading ? <Skeleton count={3} /> : apiData?.site_dsecription} */}
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <span className="text-lg sm:text-xl md:text-2xl font-bold mt-4 md:mt-6">
              {isLoading ? <Skeleton width={120} /> : "أ . عيسى سعيد جارا"}
            </span>
            <button
              onClick={handleButtonClick}
              className={`text-lg sm:text-xl bg-primary md:bg-slate-400 md:text-gray-700 lg:bg-slate-100 text-white mt-4 p-3 w-fit rounded-lg  hover:text-gray-200 duration-500 shadow-md hover:shadow-slate-200  text-primary ${
                isLoading ? "opacity-50" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? <Skeleton width={100} /> : "تجربة المقياس"}
            </button>
          </div>
        </div>
        <div
          className="w-full md:w-1/2 h-full md:p-0 flex justify-center md:justify-center md:mb-5"
          style={{
            animation: "bounce-smooth 3s infinite",
          }}
        >
          {isLoading ? (
            <Skeleton height={300} width={500} />
          ) : (
            // <img
            //   src={`${apiData?.image_url}/${apiData?.banner}`}
            //   alt="Hero Cover"
            //   className="w-full h-full max-w-2xl rounded-lg mt-6"
            // />
            <LazyLoadImage
              alt="Hero Cover"
              effect="blur"
              src={`${apiData?.image_url}/${apiData?.banner}`} // استخدم الرابط هنا
              className="w-full h-full max-w-2xl rounded-lg mt-6"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
