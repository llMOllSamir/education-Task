import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ConfigContext } from "../../Context/ConfigeApi";
import { useNavigate } from "react-router-dom";

const ChooseDepartment = () => {
  const { selectedDepartmentIds, setSelectedDepartmentIds } =
    useContext(ConfigContext);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true); // حالة التحميل
  const navigate = useNavigate();
  console.log("selectedDepartmentIds", selectedDepartmentIds);

  useEffect(() => {
    // Fetch departments from the API
    axios
      .get("https://admin.dr-eissa.com/api/v1/departments/list")
      .then((response) => {
        setDepartments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
        setLoading(false);
      });
  }, []);

  const handleDepartmentSelect = (id) => {
    setSelectedDepartmentIds((prevState) => {
      // تحقق مما إذا كان القسم معرّف id موجوداً بالفعل في قائمة الأقسام المحددة
      if (prevState.includes(id)) {
        // إذا كان موجوداً، قم بإزالته من قائمة الأقسام المحددة
        return prevState.filter((departmentId) => departmentId !== id);
      } else {
        // إذا لم يكن موجوداً، قم بإضافته إلى قائمة الأقسام المحددة
        return [...prevState, id];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedDepartmentIds.length > 0) {
      navigate("/exam");
    } else {
      alert("يرجى اختيار قسم واحد على الأقل.");
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-200 flex flex-col justify-center items-center p-4">
      <h2 className="my-3 text-4xl text-primary text-center">
        اختر الأقسام التي تريد الاختبار بها
      </h2>
      {loading ? (
        <div className="text-2xl text-gray-700 my-5">جاري التحميل...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 my-8 ">
          {departments?.length > 0 ? (
            departments.map((item) => (
              <div
                key={item?.id}
                className={`p-4 border rounded-lg cursor-pointer text-xl text-gray-500 text-center  ${
                  selectedDepartmentIds.includes(item?.id)
                    ? "bg-primary text-white"
                    : "bg-white"
                }`}
                onClick={() => handleDepartmentSelect(item?.id)}
              >
                {item?.name}
              </div>
            ))
          ) : (
            <div>لا توجد أقسام متاحة.</div>
          )}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-primary text-white p-3 rounded-lg w-20"
      >
        تم
      </button>
    </div>
  );
};

export default ChooseDepartment;
