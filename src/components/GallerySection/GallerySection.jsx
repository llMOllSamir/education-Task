import MainTitle from "../MainTitle/MainTitle";
import img1 from "../../assets/trhee1.jpeg";
import img2 from "../../assets/trhee2.jpeg";
import img3 from "../../assets/two-image1.jpg";
import img4 from "../../assets/two-image2.jpg";

function GallerySection() {
  return (
    <>
      <MainTitle head_text={"صورنا"} />
      <section className="">
        <div className="container w-full md:w-[75%] px-5 py-10 mx-auto flex flex-wrap">
          <div className="w-full lg:w-full mx-auto">
            <div
              className="flex flex-wrap w-full bg-gray-800 py-32 px-10 relative mb-4 rounded-xl overflow-hidden"
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block opacity-25 absolute inset-0 hover:opacity-80 transition-all duration-500 "
                src={img1}
              />
            </div>
            <div className="flex flex-wrap -mx-2 ">
              <div
                className="px-2 w-1/2"
                data-aos="fade-down"
                data-aos-duration="1500"
              >
                <div className="flex flex-wrap w-full bg-gray-800 sm:py-24 py-16 sm:px-10 px-6 relative rounded-xl overflow-hidden">
                  <img
                    alt="gallery"
                    className="w-full object-cover h-full object-center block opacity-25 absolute inset-0 hover:opacity-80 transition-all duration-500"
                    src={img2}
                  />
                </div>
              </div>
              <div
                className="px-2 w-1/2"
                data-aos="fade-down"
                data-aos-duration="1500"
              >
                <div className="flex flex-wrap w-full bg-gray-800 sm:py-24 py-16 sm:px-10 px-6 relative rounded-xl overflow-hidden">
                  <img
                    alt="gallery"
                    className="w-full object-cover h-full object-center block opacity-25 absolute inset-0 hover:opacity-80 transition-all duration-500"
                    src={img3}
                  />
                </div>
              </div>
            </div>
            <div
              className="flex flex-wrap w-full bg-gray-800 py-32 px-10 relative my-4 rounded-xl overflow-hidden"
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block opacity-25 absolute inset-0 hover:opacity-80 transition-all duration-500"
                src={img4}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GallerySection;
