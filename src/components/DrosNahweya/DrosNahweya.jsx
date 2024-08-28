import React, { useEffect, useState } from "react";
import axios from "axios";
import MainTitle from "../MainTitle/MainTitle";

function DrosNahweya() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    axios
      .get("https://admin.dr-eissa.com/api/v1/lessons/list")
      .then((response) => {
        setLessons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching lessons:", error);
      });
  }, []);

  return (
    <div className="text-center min-h-screen body-font py-3">
      <MainTitle head_text={"الدروس النحويه"} />
      <div className="container px-5 w-full md:w-[75%] py-10 mx-auto">
        <div className="mt-4">
          {lessons?.map((lesson) => (
            <div key={lesson?.id} className="mb-4 p-4 border rounded shadow">
              <h2 className="text-2xl mb-4">{lesson?.name}</h2>
              <div className="video-container mb-4">
                <iframe
                  width="100%"
                  height="500"
                  src={`https://www.youtube.com/embed/${new URLSearchParams(
                    new URL(lesson.video_url).search
                  ).get("v")}?autoplay=0&controls=1&modestbranding=1&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>

              <p> {lesson?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DrosNahweya;
