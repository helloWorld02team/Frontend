import { useState } from "react";
import { X } from "lucide-react";
import { ChevronDown, ChevronRight } from "lucide-react";

const faqItems = [
  {
    question: "Calendar Schedule",
    answer: (
      <>
        <p className="border-b border-[#9A97A1]">
          ในหน้าแรก จะแสดงถึงตารางเวลาที่มีสถานะการจองไว้ ผู้ที่จะทำการจอง
          สามารถตรวจสอบวันเวลาห้องที่ว่างเพื่อประกอบการตัดสินใจก่อนการจองได้
          <img src="/CS/CS1.png" alt="" className="w-4/5 mx-auto py-5" />
        </p>
        <div className="border-b border-[#9A97A1] flex items-center gap-10 justify-center pb-6 pr-16">
          <div className="w-1/2 flex justify-center p-2">
            <img
              src="/CS/CS2.png"
              alt="ปฎิทิน"
              className="shadow-lg rounded-lg"
            />
          </div>
          <p className="w-1/2">
            ปฎิทินที่แสดงวันที่ในวันนั้นๆ ผู้ใช้สามารถเลือกวัน เดือน ปี
            ที่ต้องการที่จะตรวจสอบการจองได้
          </p>
        </div>
        <div className="border-b border-[#9A97A1] flex items-center gap-10 justify-center pb-6 pr-16">
          <div className="w-1/2 flex justify-center p-2">
            <img
              src="/CS/CS3.png"
              alt="ปฎิทิน"
              className="w-1/2 shadow-lg rounded-lg"
            />
          </div>
          <p className="w-1/2">
            หมวดหมู่อาคารที่ใช้สำหรับการฟิลเตอร์ เลือกดูอาคารและห้องในอาคารนั้นๆ
            เพื่อตรวจสอบว่าปัจจุบันมีห้องที่ยังว่าง อยู่หรือไม่
          </p>
        </div>
        <div className="flex items-center gap-10 justify-center pb-6 pr-16">
          <div className="w-1/2 flex justify-center p-2">
            <img
              src="/CS/CS4.png"
              alt="ปฎิทิน"
              className="w-1/2 shadow-lg rounded-lg"
            />
          </div>
          <p className="w-1/2">
            ผู้ใช้สามารถจองห้องผ่านการกดปุ่ม “จองห้อง”
            ซึ่งจะพาไปหน้าสร้างการจองห้อง
          </p>
        </div>
      </>
    ),
  },
  {
    question: "Create a booking",
    answer: (
      <>
        <p className="px-5 pb-5">
          <img src="/Book/Book4.png" alt="" className="w-5/5 mx-auto py-7" />
          หน้าสำหรับการสร้างการจอง ผู้ใช้สามารถกรอกรายละเอียดในการจอง วันที่จอง
          เวลา สถานที่ รวมถึงห้องที่การจะจองได้
          และสามารถจองซ้ำล่วงหน้าสำหรับผู้ใช้
          ที่ต้องการจะจองหลายครั้งในการใส่รายละเอียดรอบเดียว
        </p>
      </>
    ),
  },
  {
    question: "Report",
    answer: (
      <>
        <p className="px-5 pb-5">
          <img
            src="/Report/Report1.png"
            alt=""
            className="w-5/5 mx-auto py-7"
          />
          หน้าสำหรับการรายงานของห้องที่ได้ทำการจองไว้ โดยสามารถกรอกของห้องที่ถูก
          จองไว้ได้ จากนั้นระบบจะทำการแจ้งไปกับทางผู้ดูแลเพื่อดำเนินการแก้ไขต่อไป
        </p>
      </> 
    ),
  },
];

export default function HowToUse({ setIsOpen }) {
  const [openIndex, setOpenIndex] = useState(null); // ✅ ย้ายมาไว้ตรงนี้

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full p-10 relative max-h-[80vh] overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-4xl font-semibold">อธิบายระบบจองห้อง</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4 text-gray-600 text-2xl px-10">
          SIT Booking System สามารถช่วยให้คุณทำสิ่งนี้ได้
          <ul className="list-disc text-xl pl-8 py-2">
            <li>สร้างตารางจองห้อง</li>
            <li>แก้ไข หรือลบห้องที่จองไว้แล้ว</li>
            <li>เช็คตารางห้องที่ถูกจองไว้ก่อนหน้า</li>
          </ul>
        </div>

        {/* ส่วนคำถามที่พบบ่อย (พื้นหลังสีขาว) */}
        <div className="bg-white w-full flex justify-center  mt-5">
          <div className="w-full max-w-4xl p-6 rounded-2xl">
            <ul className="space-y-5">
              {faqItems.map((faq, index) => (
                <li
                  key={index}
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className={`py-4 px-6 border border-gray-300 rounded-lg shadow-sm cursor-pointer transition-all ${
                    openIndex === index
                      ? "bg-[#ffffff] border-[#89BBFE]"
                      : "bg-white hover:bg-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-black font-medium text-xl">
                      {faq.question}
                    </span>
                    <span className="rounded-full p-1">
                      {openIndex === index ? (
                        <ChevronDown size={24} className="text-[#89BBFE]" />
                      ) : (
                        <ChevronRight size={24} className="text-[#89BBFE]" />
                      )}
                    </span>
                  </div>
                  {openIndex === index && (
                    <div className="mt-4 space-y-4 text-xl px-5 text-gray-700 border-t-2 border-gray-300 pt-5">
                      {faq.answer}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-[#09090B] hover:bg-blue-800 text-white font-medium rounded-2xl text-xl px-10 py-3"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    </div>
  );
}
