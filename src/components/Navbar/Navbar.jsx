import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ConfigContext } from "../../Context/ConfigeApi";
import loginImg from "../../assets/wired-lineal-1725-exit-sign.gif";
import avatarImg from "../../assets/avtar.png";
import axios from "axios";

function Navbar() {
  const {
    apiData,
    isLoading,
    error,
    userToken,
    setUserToken,
    change,
    SetChanges,
  } = useContext(ConfigContext);

  const [bgOpacity, setBgOpacity] = useState(0);
  const [padding, setPadding] = useState("py-3");
  const [linkColor, setLinkColor] = useState("text-gray-600");
  const [menuOpen, setMenuOpen] = useState(false);
  const [pages, setPages] = useState([]); // حالة لتخزين العناوين
  const [dropdownOpen, setDropdownOpen] = useState(false); // في القائمة المنسدلة
  // متغير لتتبع حالة الفتح والإغلاق للدروب داون
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // في قائمة الملف الشخصي
  const navigate = useNavigate();
  // console.log("user token", userToken);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setBgOpacity(0.8);
        setPadding("py-4");
        setLinkColor("text-white");
      } else {
        setBgOpacity(0);
        setPadding("py-3");
        setLinkColor("text-gray-600");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ------------- //
  // useEffect(() => {
  //   axios
  //     .get("https://admin.dr-eissa.com/api/v1/pages", {
  //       timeout: 10000, // تحديد وقت للإنتظار (10 ثواني)
  //       headers: {
  //         "Content-Type": "application/json",
  //         // "Authorization": `Bearer ${userToken}` // لو في توكن مطلوب للإرسال
  //       },
  //     })
  //     .then((response) => {
  //       setPages(response.data);
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         // الـ request تم إرساله والسيرفر رد لكن فيه خطأ في الرد
  //         console.error("Error Response:", error.response.data);
  //       } else if (error.request) {
  //         // الـ request تم إرساله لكن لم يرد رد من السيرفر
  //         console.error("Error Request:", error.request);
  //       } else {
  //         // خطأ حدث قبل إرسال الطلب
  //         console.error("Error Message:", error.message);
  //       }
  //     });
  // }, []);
  // ------------- //

  useEffect(() => {
    axios
      .get("https://admin.dr-eissa.com/api/v1/pages")
      .then((response) => {
        setPages(response.data);
        // console.log("response.data-pages", response.data);
      })
      .catch((error) => {
        console.error("هناك خطأ في جلب البيانات:", error);
      });
  }, []);

  const handleNavLinkClick = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
    setMenuOpen(false); // Close the main menu
    setDropdownOpen(false); // Close the dropdown menu
  };

  // Logout
  function logOut() {
    localStorage.removeItem("userTokenEducation");
    localStorage.removeItem("profileEducation");
    sessionStorage.removeItem("account_id");
    // localStorage.removeItem("userNameEducation");
    setUserToken(null);
    navigate("/");
    window.scrollTo(0, 0);
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className={`sticky top-0 z-50 w-full text-primary text-xl font-medium transition-all duration-1000 ${padding} ${
        menuOpen ? "" : "shadow-md"
      }`}
      style={{
        backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`,
        transition: "background-color 0.3s ease-in, padding 0.3s ease-in",
      }}
    >
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-8 max-w-screen-xl">
        {/* اسم الموقع على اليمين */}
        <div className="order-1 md:order-none flex items-center">
          {isLoading ? (
            <Skeleton circle={true} height={56} width={56} />
          ) : (
            apiData?.image_url && (
              <img
                src={`${apiData?.image_url}/${apiData?.logo}`}
                className="w-16 h-fit object-cover ml-4"
                alt="logo"
              />
            )
          )}
        </div>

        {/* زر القائمة في الشاشات الصغيرة */}
        <div
          className="text-primary text-3xl md:hidden order-3"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* القوائم في المنتصف للشاشات الكبيرة و فوق */}
        <ul
          className={`fixed top-0 left-0 w-full h-full bg-black flex flex-col items-center justify-center transition-transform duration-300 transform ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          } md:flex-row md:static md:w-auto md:h-auto md:bg-transparent md:transform-none md:p-0 md:flex md:gap-4 lg:gap-10 order-2 md:order-none`}
        >
          {menuOpen && (
            <div
              className="absolute top-4 left-4 text-3xl text-white md:hidden"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </div>
          )}
          {/* هنا كانت الخروج من المقياس */}
          <>
            {/* الرئيسيه */}
            <li className="mt-10 md:mt-0">
              {isLoading ? (
                <Skeleton width={100} height={24} />
              ) : (
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary border-b-2 pb-2 border-primary text-[19px] font-medium"
                      : `${linkColor} hover:text-gray-400 transition-colors text-[19px]`
                  }
                  onClick={() => {
                    handleNavLinkClick();
                    setMenuOpen(false);
                  }}
                >
                  الــرئــيــســيــة
                </NavLink>
              )}
            </li>
            {/* وصف مستويات المقياس */}
            <li className="relative mt-4 md:mt-0">
              {isLoading ? (
                <Skeleton width={150} height={24} />
              ) : (
                <>
                  <div
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`${linkColor} cursor-pointer flex gap-1 items-center text-[17px] font-medium hover:text-gray-400 transition-colors`}
                  >
                    وصف مستويات المقياس
                    <FaChevronDown
                      className={`ml-1 transform transition-transform duration-300 ${
                        dropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                  {dropdownOpen && (
                    <ul
                      className="absolute left-0 mt-3 bg-white shadow-lg rounded-lg z-10 w-full overflow-hidden"
                      data-aos="fade-up"
                      data-aos-duration="500"
                    >
                      <li className="px-4 py-2 hover:bg-gray-100">
                        <NavLink
                          to="mostawa/reading"
                          onClick={() => {
                            handleNavLinkClick();
                          }}
                        >
                          القراءة
                        </NavLink>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        <NavLink
                          to="mostawa/writing"
                          onClick={() => {
                            handleNavLinkClick();
                          }}
                        >
                          الكتابة
                        </NavLink>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        <NavLink
                          to="mostawa/listening"
                          onClick={() => {
                            handleNavLinkClick();
                          }}
                        >
                          الاستماع
                        </NavLink>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        <NavLink
                          to="mostawa/speaking"
                          onClick={() => {
                            handleNavLinkClick();
                          }}
                        >
                          التحدث
                        </NavLink>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        <NavLink
                          to="mostawa/dros"
                          onClick={() => {
                            handleNavLinkClick();
                          }}
                        >
                          الدروس النحويه
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </>
              )}
            </li>
            {/* الدروس النحويه */}
            <li className="mt-10 md:mt-0">
              {isLoading ? (
                <Skeleton width={100} height={24} />
              ) : (
                <NavLink
                  to="dros-nahweya"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary border-b-2 pb-2 border-primary text-[19px] font-medium"
                      : `${linkColor} hover:text-gray-400 transition-colors text-[19px]`
                  }
                  onClick={() => {
                    handleNavLinkClick();
                    setMenuOpen(false);
                  }}
                >
                  الدروس النحويه
                </NavLink>
              )}
            </li>
            {/* عن الموقع *}
            {/* عرض العناوين المسترجعة من الـ API */}
            {pages.map((page) => (
              <li key={page.id} className="mt-4 md:mt-0">
                {isLoading ? (
                  <Skeleton width={150} height={24} />
                ) : (
                  <NavLink
                    to={`/${page.title.replace(/\s+/g, "-").toLowerCase()}`}
                    // تحويل العنوان إلى رابط
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary border-b-2 pb-2 border-primary text-[19px] font-medium"
                        : `${linkColor} hover:text-gray-400 transition-colors text-[19px]`
                    }
                    onClick={() => {
                      handleNavLinkClick();
                      setMenuOpen(false);
                    }}
                  >
                    {page.title}
                  </NavLink>
                )}
              </li>
            ))}
            {/* دخول */}
            {userToken ? (
              // تسجيل خروج و تسجيل الدخول
              <li className="mt-4 md:mt-0">
                {isLoading ? (
                  <Skeleton width={150} height={24} />
                ) : (
                  <div className="relative order-2 md:order-none ml-auto">
                    <div className="text-center rounded-full flex justify-center items-center">
                      <i
                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                        className="fa-solid fa-circle-user text-3xl rounded-full cursor-pointer"
                      ></i>
                    </div>

                    {profileMenuOpen && (
                      <ul
                        className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden translate-x-[-40%] md:translate-x-[0%]"
                        style={{ minWidth: "190px" }}
                      >
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <NavLink
                            to="/profile"
                            onClick={() => {
                              setProfileMenuOpen(false);
                              handleNavLinkClick();
                            }}
                          >
                            الملف الشخصي
                          </NavLink>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <button
                            onClick={() => {
                              logOut();
                              setProfileMenuOpen(false);
                            }}
                          >
                            تسجيل خروج
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>

                  // تسجيل خروج
                  // <NavLink
                  //   to="/"
                  //   className={({ isActive }) =>
                  //     isActive
                  //       ? "text-primary border-b-2 pb-2 border-primary text-[19px] font-medium"
                  //       : `${linkColor} hover:text-gray-400 transition-colors text-[19px]`
                  //   }
                  //   onClick={() => {
                  //     handleNavLinkClick();
                  //     setMenuOpen(false);
                  //     logOut();
                  //   }}
                  // >
                  //   تسجيل خروج
                  // </NavLink>
                )}
              </li>
            ) : (
              // تسجيل دخول
              <li className="mt-4 md:mt-0">
                {isLoading ? (
                  <Skeleton width={150} height={24} />
                ) : (
                  // sign-in
                  <NavLink
                    to="/sign-in"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary border-b-2 pb-2 border-primary text-[19px] font-medium"
                        : `${linkColor} hover:text-gray-400 transition-colors text-[19px]`
                    }
                    onClick={() => {
                      handleNavLinkClick();
                      setMenuOpen(false);
                    }}
                  >
                    تسجيل دخول
                  </NavLink>
                )}
              </li>
            )}

            {/* {userToken && (
              <div className="relative order-2 md:order-none ml-auto">
                <img
                  src={avatarImg}
                  alt="avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                />
                {profileMenuOpen && (
                  <ul
                    className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden"
                    style={{ minWidth: "150px" }}
                  >
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <NavLink
                        to="/profile"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        الملف الشخصي
                      </NavLink>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <button
                        onClick={() => {
                          logOut();
                          setProfileMenuOpen(false);
                        }}
                      >
                        تسجيل خروج
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )} */}
          </>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

{
  /* هنا كانت الخروج من المقياس */
}

// تسجيل الدكتور
// <a href={apiData?.admin_url}>
//   <img
//     src={loginImg}
//     alt="Login-Image"
//     className="h-[45px]"
//   />
// </a>

// {
//   sessionStorage.getItem("account_id") && change ? (
//     // خروج
//     <li className="mt-4 md:mt-0">
//       <NavLink
//         to="/"
//         className={({ isActive }) =>
//           isActive
//             ? "text-primary border-b-2 pb-2 border-primary text-[19px] font-medium"
//             : `${linkColor} hover:text-gray-400 transition-colors text-[19px]`
//         }
//         onClick={() => {
//           handleNavLinkClick();
//           setMenuOpen(false);
//           // sessionStorage.removeItem("account_id");
//           SetChanges((curr) => !curr);
//         }}
//       >
//         خروج
//       </NavLink>
//     </li>
//   ) : (
//     <>
//       {/* الرئيسيه */}
//       <li className="mt-10 md:mt-0">
//         {isLoading ? (
//           <Skeleton width={100} height={24} />
//         ) : (
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary border-b-2 pb-2 border-primary text-[19px] font-medium"
//                 : `${linkColor} hover:text-gray-400 transition-colors text-[19px]`
//             }
//             onClick={() => {
//               handleNavLinkClick();
//               setMenuOpen(false);
//             }}
//           >
//             الــرئــيــســيــة
//           </NavLink>
//         )}
//       </li>
//       {/* وصف مستويات المقياس */}
//       <li className="relative mt-4 md:mt-0">
//         {isLoading ? (
//           <Skeleton width={150} height={24} />
//         ) : (
//           <>
//             <div
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className={`${linkColor} cursor-pointer flex gap-1 items-center text-[17px] font-medium hover:text-gray-400 transition-colors`}
//             >
//               وصف مستويات المقياس
//               <FaChevronDown
//                 className={`ml-1 transform transition-transform duration-300 ${
//                   dropdownOpen ? "rotate-180" : "rotate-0"
//                 }`}
//               />
//             </div>
//             {dropdownOpen && (
//               <ul
//                 className="absolute left-0 mt-3 bg-white shadow-lg rounded-lg z-10 w-full overflow-hidden"
//                 data-aos="fade-up"
//                 data-aos-duration="500"
//               >
//                 <li className="px-4 py-2 hover:bg-gray-100">
//                   <NavLink
//                     to="mostawa/reading"
//                     onClick={() => {
//                        handleNavLinkClick();
//                     }}
//                   >
//                     القراءة
//                   </NavLink>
//                 </li>
//                 <li className="px-4 py-2 hover:bg-gray-100">
//                   <NavLink
//                     to="mostawa/writing"
//                     onClick={() => {
//                        handleNavLinkClick();
//                     }}
//                   >
//                     الكتابة
//                   </NavLink>
//                 </li>
//                 <li className="px-4 py-2 hover:bg-gray-100">
//                   <NavLink
//                     to="mostawa/listening"
//                     onClick={() => {
//                        handleNavLinkClick();
//                     }}
//                   >
//                     الاستماع
//                   </NavLink>
//                 </li>
//                 <li className="px-4 py-2 hover:bg-gray-100">
//                   <NavLink
//                     to="mostawa/speaking"
//                     onClick={() => {
//                        handleNavLinkClick();
//                     }}
//                   >
//                     التحدث
//                   </NavLink>
//                 </li>
//                 <li className="px-4 py-2 hover:bg-gray-100">
//                   <NavLink
//                     to="mostawa/dros"
//                     onClick={() => {
//                        handleNavLinkClick();
//                     }}
//                   >
//                     الدروس النحويه
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </>
//         )}
//       </li>

//       {/* <li className="mt-4 md:mt-0">
//       {isLoading ? (
//         <Skeleton width={150} height={24} />
//       ) : (
//         <NavLink
//           to="/mostawa"
//           className={({ isActive }) =>
//             isActive
//               ? "text-primary border-b-2 pb-2 border-primary text-[19px] font-medium"
//               : `${linkColor} hover:text-gray-400 transition-colors text-[19px]`
//           }
//           onClick={() => {
//             handleNavLinkClick();
//             setMenuOpen(false);
//           }}
//         >
//           وصف مستويات المقياس
//         </NavLink>
//       )}
//     </li> */}
//       {/* عن الموقع *}
//     {/* عرض العناوين المسترجعة من الـ API */}
//       {pages.map((page) => (
//         <li key={page.id} className="mt-4 md:mt-0">
//           {isLoading ? (
//             <Skeleton width={150} height={24} />
//           ) : (
//             <NavLink
//               to={`/${page.title.replace(/\s+/g, "-").toLowerCase()}`}
//               // تحويل العنوان إلى رابط
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-primary border-b-2 pb-2 border-primary text-[19px] font-medium"
//                   : `${linkColor} hover:text-gray-400 transition-colors text-[19px]`
//               }
//               onClick={() => {
//                 handleNavLinkClick();
//                 setMenuOpen(false);
//               }}
//             >
//               {page.title}
//             </NavLink>
//           )}
//         </li>
//       ))}
//       {/* دخول */}
//       <li className="mt-4 md:mt-0">
//         {isLoading ? (
//           <Skeleton width={150} height={24} />
//         ) : (
//           // sign-in
//           <NavLink
//             to="/sign-in"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-primary border-b-2 pb-2 border-primary text-[19px] font-medium"
//                 : `${linkColor} hover:text-gray-400 transition-colors text-[19px]`
//             }
//             onClick={() => {
//               handleNavLinkClick();
//               setMenuOpen(false);
//             }}
//           >
//             تسجيل دخول
//           </NavLink>
//           // تسجيل الدكتور
//           // <a href={apiData?.admin_url}>
//           //   <img
//           //     src={loginImg}
//           //     alt="Login-Image"
//           //     className="h-[45px]"
//           //   />
//           // </a>
//         )}
//       </li>
//     </>
//   );
// }
