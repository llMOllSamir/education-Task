/* eslint-disable react/prop-types */
function MainTitle({ head_text }) {
  return (
    <div className="my-10">
      <h1 className="text-center text-2xl md:text-5xl font-bold w-[80%] md:w-[50%] mb-3 mx-auto text-gray-800">
        {head_text}
      </h1>

      <div className="relative my-5">
        {/* <!-- الخط الخارجي --> */}
        {/* <hr className="w-[35%] md:w-[10%] h-[2px] mx-auto bg-gray-300 border-none rounded-xl" /> */}

        {/* <!-- الخط الداخلي --> */}
        <hr className="absolute top-[-1px] -inset-0 mx-auto w-[10%] md:w-[3%] h-[5px] bg-primary border-none rounded-lg animate" />
      </div>
    </div>
  );
}

export default MainTitle;
