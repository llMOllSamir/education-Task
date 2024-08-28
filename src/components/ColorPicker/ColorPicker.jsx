import React, { useState, useEffect } from "react";
import { FaPalette } from "react-icons/fa";

// دالة لتغيير اللون الأساسي في CSS root
const setRootColor = (color) => {
  document.documentElement.style.setProperty("--primary", color);
};

function ColorPicker() {
  // الألوان الممكنة
  const colors = ["#096cb4", "#ef4444", "#106466", "#1787e0", "#ff5722"];

  // الحالة لتتبع اللون المحدد حاليًا
  const [selectedColor, setSelectedColor] = useState(null);

  // الحالة لتتبع حالة العرض/الإخفاء
  const [isVisible, setIsVisible] = useState(false);

  // دالة لتغيير اللون الأساسي و تحديث الحالة
  const handleColorChange = (color) => {
    setSelectedColor(color);
    setRootColor(color);
    localStorage.setItem("selectedColor", color); // حفظ اللون المحدد في local storage
  };

  // دالة لتبديل حالة العرض/الإخفاء
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // للتحقق من وجود لون محفوظ في local storage
  useEffect(() => {
    const savedColor = localStorage.getItem("selectedColor");
    if (savedColor) {
      setSelectedColor(savedColor);
      setRootColor(savedColor);
    }
  }, []);

  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-12">
      <div
        className="w-8 h-8 bg-primary flex items-center justify-center cursor-pointer rounded-full text-white"
        onClick={toggleVisibility}
      >
        <FaPalette size={24} />
      </div>
      {/* عنصر الألوان */}
      <div
        className={`flex flex-col space-y-2 bg-gray-400 p-1 rounded shadow-lg absolute right-0 top-0 opacity-100 transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transform: isVisible ? "translateX(0)" : "translateX(100%)" }}
      >
        {colors.map((color) => (
          <div
            key={color}
            className={`w-6 h-6 cursor-pointer rounded-full ${
              selectedColor === color ? "border-4 border-white" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorChange(color)}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;

//  مكتبة استخدام الالوان -- بس لازم تنزل المكتبه
// import React, { useState } from "react";
// import { SketchPicker } from "react-color";
// import { FaPalette } from "react-icons/fa";
// // دالة لتغيير اللون الأساسي في CSS root
// const setRootColor = (color) => {
//   document.documentElement.style.setProperty("--primary", color);
// };

// function ColorPicker() {
//   // الحالة لتتبع اللون المحدد حاليًا
//   const [selectedColor, setSelectedColor] = useState("#096cb4");

//   // الحالة لتتبع حالة العرض/الإخفاء
//   const [isVisible, setIsVisible] = useState(false);

//   // دالة لتغيير اللون الأساسي و تحديث الحالة
//   const handleColorChange = (color) => {
//     setSelectedColor(color.hex);
//     setRootColor(color.hex);
//   };

//   // دالة لتبديل حالة العرض/الإخفاء
//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//   };

//   return (
//     <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-12">
//       <div
//         className="w-12 h-12 bg-primary flex items-center justify-center cursor-pointer rounded-full text-white"
//         onClick={toggleVisibility}
//       >
//         <FaPalette size={24} />
//       </div>
//       {isVisible && (
//         <div className="absolute right-0 top-0 bg-white p-4 rounded shadow-lg transition-transform duration-300 ease-in-out">
//           <SketchPicker
//             color={selectedColor}
//             onChangeComplete={handleColorChange}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ColorPicker;
