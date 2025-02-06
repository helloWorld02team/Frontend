import React from "react";
import { Link } from "react-router-dom";

function content() {
  return (
    <div
      className=" h-165 items-center flex justify-center"
      style={{
        backgroundImage: "url(public/sitback.png",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
      }}
    >
      <div className="text-center text-white">
        <p className="mb-3 font-bold text-2xl">
          School of Information Technology
        </p>
        <h2 className="text-[100px] font-bold">Booking System</h2>
        <p className="mt-3 font-bold text-2xl ">
          ระบบจองห้องคณะเทคโนโลยีสารสนเทศ
        </p>
        <Link to="/Rooms">
          <button
            button
            className="bg-[#53E2FF] text-black text-xl py-3 px-10 mt-10 rounded-full hover:bg-white hover:cursor-pointer font-bold"
          >
            เริ่มต้นการจอง
          </button>
        </Link>
      </div>
    </div>
  );
}

export default content;
