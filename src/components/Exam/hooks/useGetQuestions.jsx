import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function useGetQuestions({ departments, selectedDepartmentIndex }) {
    const [loadingQuestions, setLoadingQuestions] = useState(false); // حالة لتتبع تحميل الأسئلة
    const [questions, setQuestions] = useState([]); // حالة لتخزين الأسئلة



    useEffect(() => {
        if (departments[selectedDepartmentIndex]?.id) {
            setLoadingQuestions(true);
            axios
                .get(
                    `https://admin.dr-eissa.com/api/v1/departments/department/questions/${departments[selectedDepartmentIndex].id}`
                )
                .then((response) => {
                    setQuestions(response.data);
                    setLoadingQuestions(false);
                })
                .catch((error) => {
                    console.error("Error fetching questions:", error);
                    setLoadingQuestions(false);
                });
        }
    }, [selectedDepartmentIndex, departments]);


    return (
        {
            loadingQuestions,
            questions
        }
    )
}
