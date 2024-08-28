import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // it mean I am not login يعنى انا مش عامل تسجيل او لوجن
  if (!sessionStorage.getItem("account_id")) {
    return <Navigate to={"/"}></Navigate>;
  } else {
    return children;
  }
}
