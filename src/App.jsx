import "./App.css";
import { useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, json } from "react-router-dom";
import LayOut from "./components/LayOut/LayOut";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import TalematAlMekyas from "./components/TalematAlMekyas/TalematAlMekyas";
import Exam from "./components/Exam/Exam";
import MostawaSection from "./components/MostawaSection/MostawaSection";
import { ConfigContext } from "./Context/ConfigeApi";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";
import Result from "./components/Result/Result";
import NotFound from "./pages/404/404";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AboutSection from "./components/AboutSection/AboutSection";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import Profile from "./components/Profile/Profile";
import ChooseDepartment from "./components/ChooseDepartment/ChooseDepartment";
import DrosNahweya from "./components/DrosNahweya/DrosNahweya";

function App() {
  const { apiData, loading, setUserToken, setProfile } =
    useContext(ConfigContext);
  if (loading) {
    return <LoadingScreen />;
  }

  // handle refresh
  useEffect(() => {
    // if local storage not empty and it have token
    if (localStorage.getItem("userTokenEducation")) {
      setUserToken(localStorage.getItem("userTokenEducation"));
      setProfile(JSON.parse(localStorage.getItem("profileEducation")));
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{apiData?.site_name}</title>
        <link
          rel="icon"
          type="image/png"
          href={`${apiData?.image_url}/${apiData?.logo}`}
        />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route index element={<Home />} />
            {/* وصف مستويات المقياس */}
            <Route path="mostawa/:section" element={<MostawaSection />} />
            {/* الدروس النحويه */}
            <Route path="dros-nahweya" element={<DrosNahweya />} />
            {/* المسار المحدد لقسم About */}
            <Route path="/:title" element={<AboutSection />} />
            {/* تعليمات المقياس */}
            <Route path="talemat-mekyas" element={<TalematAlMekyas />} />
            {/* اختيار القسم اللى تريد الامتحان به */}
            <Route
              path="choose-department"
              element={
                <ProtectedRoute>
                  <ChooseDepartment />
                </ProtectedRoute>
              }
            />
            {/* المقياس او الامتحان */}
            <Route
              path="exam"
              element={
                <ProtectedRoute>
                  <Exam />
                </ProtectedRoute>
              }
            />
            {/* النتيجه */}
            <Route
              path="result"
              element={
                <ProtectedRoute>
                  <Result />
                </ProtectedRoute>
              }
            />

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />

            {/* Auth */}
            <Route path="sign-in" element={<SignIn />} />
            {/* <Route path="sign-up" element={<SignUp />} /> */}
            <Route path="register" element={<Register />} />
            {/* profile */}
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
