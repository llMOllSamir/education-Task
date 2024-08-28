import { useContext } from "react";
import { ConfigContext } from "../../Context/ConfigeApi";

function Footer() {
  const { apiData } = useContext(ConfigContext);

  return (
    <footer dir="ltr" className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-2 mx-auto flex items-center sm:flex-row flex-col max-w-screen-xl">
        <span className="inline-flex sm:mr-auto sm:mt-0 mt-4 justify-center sm:justify-start text-3xl gap-5 order-1 lg:order-first">
          {/* عرض رمز فيسبوك فقط إذا كان URL موجودًا */}
          {apiData?.facebook_url && (
            <a
              href={apiData.facebook_url}
              className="text-blue-700 hover:text-blue-500"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
          )}
          {/* عرض رمز إنستجرام فقط إذا كان URL موجودًا */}
          {apiData?.instagram_url && (
            <a
              href={apiData.instagram_url}
              className="text-red-600 hover:text-red-400"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          )}
          {/* عرض رمز واتساب فقط إذا كان رقم الهاتف موجودًا */}
          {apiData?.phone && (
            <a
              href={`tel:${apiData.phone}`}
              className="text-green-600 hover:text-green-400"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          )}
          {/* عرض رمز تويتر فقط إذا كان URL موجودًا */}
          {apiData?.twitter_url && (
            <a
              href={apiData.twitter_url}
              className="text-gray-500 hover:text-gray-400"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          )}
          {/* عرض رمز يوتيوب فقط إذا كان URL موجودًا */}
          {apiData?.youtube_url && (
            <a
              href={apiData.youtube_url}
              className=" text-red-600 hover:text-red-400"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
          )}
        </span>
        {/* عرض الشعار فقط إذا كانت بيانات الـ URL والشعار موجودة */}
        <a className="flex items-center md:justify-start justify-center">
          <span className="md:ml-3">
            {apiData?.image_url && apiData?.logo && (
              <img
                src={`${apiData.image_url}/${apiData.logo}`}
                className="w-16 h-fit object-cover ml-4"
                alt="logo"
              />
            )}
          </span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
