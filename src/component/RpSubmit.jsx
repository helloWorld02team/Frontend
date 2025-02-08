import React from "react";

function RpSubmit({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
      <div className="relative w-full py-10 max-w-xl p-8 bg-white rounded-2xl shadow-2xl">
        <button
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-30 h-30 flex items-center justify-center rounded-full">
              <svg
                fill="#37CB0E"
                width="800px"
                height="800px"
                viewBox="0 0 200 200"
                data-name="Layer 1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm25-91.5-29,35L76,94c-4.5-3.5-10.5-2.5-14,2s-2.5,10.5,2,14c6,4.5,12.5,9,18.5,13.5,4.5,3,8.5,7.5,14,8,1.5,0,3.5,0,5-1l3-3,22.5-27c4-5,8-9.5,12-14.5,3-4,4-9,.5-13L138,71.5c-3.5-2.5-9.5-2-13,2Z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 py-2">
            รายงานเรียบร้อย
          </h2>
          <p className="text-xl text-gray-600 mt-4 ">
            ขอบคุณสำหรับการรายงาน <br />
            เราจะทำการรีบดำเนินการให้ไวที่สุด
          </p>
          <button
            className="mt-15 w-50 bg-black text-white py-3 text-lg rounded-xl shadow-lg hover:shadow-xl"
            onClick={onClose}
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    </div>
  );
}

export default RpSubmit;
