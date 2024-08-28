import { useContext, useEffect, useState } from 'react'
import { ConfigContext } from '../../../Context/ConfigeApi'
import axios from 'axios';

export default function useGetDepartments() {
    const { selectedDepartmentIds } = useContext(ConfigContext); // استخدام Context لجلب الأقسام المختارة
    const [loading, setLoading] = useState(true); // حالة لتتبع تحميل الأقسام
    const [departments, setDepartments] = useState([]); // حالة لتخزين الأقسام

    useEffect(() => {
        axios
            .get("https://admin.dr-eissa.com/api/v1/departments/list")
            .then((response) => {
                const allDepartments = response.data; // تخزين جميع الأقسام
                // تصفية الأقسام بناءً على الأقسام المختارة فقط
                const filteredDepartments = allDepartments.filter((department) =>
                    selectedDepartmentIds.includes(department.id)
                );
                setDepartments(filteredDepartments);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching departments:", error);
                setLoading(false);
            });
    }, [selectedDepartmentIds]); // تحديث القائمة عند تغيير الأقسام المختارة

    return (
        { loading, departments }
    )
}
