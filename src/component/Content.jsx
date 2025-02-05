import React from "react";
import { Link } from "react-router-dom";
function content() {
  return (
    <div
      className=" h-165 pt-40 flex justify-center"
      style={{
        backgroundImage: "url(public/sitback.png",
        backgroundSize: "cover",
      }}
    >
      <div className="text-center text-white">
        <p className="mb-5 font-bold text-2xl">
          School of Infomation Technology
        </p>
        <h2 className="text-[100px] font-bold">Booking System</h2>
        <p className="mt-5 font-bold text-2xl">
          ระบบจองห้องคณะเทคโนโลยีสารสนเทศ
        </p>
        <Link to="/Rooms">
          <button
            button
            className="bg-[#53E2FF] text-black py-3 px-5 mt-6 rounded-full hover:bg-white hover:cursor-pointer font-bold"
          >
            เริ่มต้นการจอง
          </button>
        </Link>
      </div>
    </div>
  );
}

export default content;
