import React from "react";
import {
  Book,
  Calendar,
  Flag,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";


const faqItems = [
  "ล็อกอินเข้าระบบได้อย่างไร?",
  "ทำไมไม่สามารถลบหรือเปลี่ยนแปลงรายการจองห้องได้?",
  "เกิดอะไรขึ้น ถ้ามีผู้ใช้หลายคนจองห้องในเวลาเดียวกัน?",
  "อะไรเป็นความแตกต่างของแต่ละห้องที่ทำการจอง?",
  "ดูตารางเวลาจองห้องอย่างไร?",
];

const cards = [
  {
    icon: <Book size={40} className="text-blue-400" />,
    text: "อธิบายระบบจองห้อง",
  },
  {
    icon: <Calendar size={40} className="text-blue-400" />,
    text: "วิธีเริ่มต้นการจอง",
  },
  { icon: <Flag size={40} className="text-blue-400" />, text: "วิธีรายงาน" },
];

export default function HelpCenter() {
  return (
    <>
    <Navbar />
    <div className="bg-white min-h-screen flex flex-col items-center">
      <div className="w-full">
        {/* ส่วนหัวที่มีพื้นหลังไล่สี */}
        <div
          className="bg-gradient-to-b p-10 text-white flex flex-col items-center"
          style={{
            backgroundImage:
              'url("/images/abstract-saturated-psychedelic-vivid-background.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            height: "40vh",
          }}
        >
          <h1 className="text-4xl font-bold mt-10">
            สวัสดี! มีอะไรให้เราช่วยเหลือไหม
          </h1>

          {/* ปุ่มติดต่อทีมงาน */}
          <button className="mt-6 flex items-center gap-2 bg-white text-black font-semibold py-3 px-10 rounded-full shadow-md">
            <MessageSquare size={20} className="text-blue-500" />
            ติดต่อ Software Team
          </button>

          {/* การ์ดตัวเลือก */}
          <div className="flex gap-6 mt-12">
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md w-60 py-10"
              >
                {card.icon}
                <p className="mt-4 text-lg font-semibold text-black text-center">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ส่วนคำถามที่พบบ่อย (พื้นหลังสีขาว) */}
        <div className="bg-white w-full flex justify-center py-10 mt-30">
          <div className="w-full max-w-2xl p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-black mb-4">
              คำถามที่พบบ่อย
            </h2>
            <ul className="space-y-5">
              {faqItems.map((faq, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-4 px-6 bg-white border-1 border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition-all"
                >
                  <span className="text-black font-medium">{faq}</span>
                  <span className="bg-[#C8DFFF] rounded-full p-1 ">
                    <ChevronRight size={24} className="text-[#89BBFE]" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
    
  );
}