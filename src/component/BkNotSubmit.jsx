import React, { useState } from "react";

function RpNotSubmit() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full py-10 max-w-xl p-8 bg-white rounded-2xl shadow-2xl">
        <button
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          &#x2715;
        </button>
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-30 h-30 flex items-center justify-center rounded-full">
              <svg
                fill="#FF0004"
                width="800px"
                height="800px"
                viewBox="0 0 200 200"
                data-name="Layer 1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title />
                <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z" />
                <path d="M128.5,74a9.67,9.67,0,0,0-14,0L100,88.5l-14-14a9.9,9.9,0,0,0-14,14l14,14-14,14a9.9,9.9,0,0,0,14,14l14-14,14,14a9.9,9.9,0,0,0,14-14l-14-14,14-14A10.77,10.77,0,0,0,128.5,74Z" />
              </svg>
            </div>
          </div> 
          <h2 className="text-4xl font-bold text-gray-900 py-2">
            ไม่สามารถจองห้องได้
          </h2>
          <p className="text-xl text-gray-600 mt-4">
            คุณไม่สามารถจองห้องนี้ซ้ำได้ <br />
            เนื่องจากห้องนี้ได้ทำการถูกจองเรียบร้อยแล้ว
          </p>
          <div className="flex justify-center gap-3">
            <button
              className="mt-15 w-40 bg-white text-black py-3 text-lg rounded-xl shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              ย้อนกลับ
            </button>
            <button
              className="mt-15 w-40 bg-black text-white py-3 text-lg rounded-xl shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              จองใหม่
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RpNotSubmit;
