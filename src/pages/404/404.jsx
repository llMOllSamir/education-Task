import React from "react";
import NotFoundImage from "../../assets/404.png";

const NotFound = () => {
  return (
    <div
      className="not-found"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <img
        // style={{ width: "800px" }}
        // src={process.env.PUBLIC_URL + "/assets/404.png"}
        src={NotFoundImage}
        className="w-1/2 object-cover"
        alt="Error Path"
      />
    </div>
  );
};

export default NotFound;
