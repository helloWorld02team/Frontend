import React from "react";

function BgStart() {
  return (
    <div
      className="relative w-1/2 bg-cover bg-center flex flex-col justify-end items-center"
      style={{ backgroundImage: "url('public/sitback.png')" }}
    >
      <div className="flex items-center p-10 relative z-10">
        <div
          className="text-white text-xl border-r-1 font-bold px-3"
          style={{ borderColor: "rgba(255, 255, 255, 0.5)" }}
        >
          booking
          <br />
          system
        </div>
        <div className="px-3">
          <img src="public/sit.png" alt="logo" className="w-85 h-auto" />
        </div>
      </div>
    </div>
  );
}

export default BgStart;