import { useState } from "react";
import {
  Book,
  Calendar,
  Flag,
  MessageSquare,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HowToBook from "./HowToBook";
import HowToReport from "./HowToReport";
import HowToUse from "./HowToUse";

export default function HelpCenter() {
  const [isSystemOpen, setIsSystemOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null); // ✅ ย้ายมาไว้ตรงนี้

  const faqItems = [
    {
      question: "ล็อกอินเข้าระบบได้อย่างไร ?",
      answer: (
        <>
          ผู้ที่มีสิทธิ์ในการเข้าใช้ระบบจองห้องนั้นต้องเป็นพนักงานภายในคณะฯ
          เท่านั้น โดยใช้ Login และ Password อันเดียวกับ SIT-mail
          หากผู้ที่ต้องการจองห้องเป็นนักศึกษาของคณะฯ กรุณาติดต่อกับ
          เจ้าหน้าที่บริการการศึกษา หรือ นักพัฒนานักศึกษา (คุณอนุตรา)
        </>
      ),
    },
    {
      question: "ทำไมไม่สามารถลบหรือเปลี่ยนแปลงรายการจองห้องได้ ?",
      answer: (
        <>
          ในการลบหรือเปลี่ยนแปลงรายการจองห้องต่าง ๆ
          คนที่สร้างรายการจองห้องเท่านั้นที่จะมีสิทธิ์ลบหรือเปลี่ยนแปลงรายการจองห้องของตนเอง
          คุณไม่สามารถเข้าไปลบหรือเปลี่ยนแปลงรายการจองห้องของบุคคลอื่นได้
          หากคุณต้องการสับเปลี่ยนหรือเปลี่ยนแปลงรายการจองห้องของบุคคลใดให้คุณทำการติดต่อกับบุคคลนั้น
          โดยดูที่ Created by ซึ่งเป็น e-mail ของบุคคลที่เป็นผู้จองห้อง
          หากคุณไม่ทราบว่าบุคคลที่จองห้องเป็นใคร คุณสามารถค้นหาข้อมูลพนักงานคณะฯ
          ได้ที่{" "}
          <a
            href="http://intra.it.kmutt.ac.th"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            http://intra.it.kmutt.ac.th
          </a>{" "}
          ในส่วนของ Address Book
        </>
      ),
    },
    {
      question: "เกิดอะไรขึ้น ถ้ามีผู้ใช้หลายคนจองห้องในเวลาเดียวกัน ?",
      answer: (
        <>
          คนที่คลิกปุ่มจองบันทึกรายการจองห้องเป็นคนแรกจะได้ไป
          โดยระบบสามารถตรวจสอบได้จากเวลา (Timestamp) ในการจองห้อง
          ซึ่งตามปกติแล้วในแต่ละภาคการศึกษานั้น นักบริการการศึกษาของคณะฯ
          มีสิทธิ์ ในการจองห้องก่อน เพื่อใช้ในการจัดตารางการเรียนการสอน
          จากนั้นจึงจะเปิดระบบให้พนักงานอื่น ๆ ได้จองต่อตลอดภาคการศึกษา
          <img src="public/Help/Help3.png" alt="" className="p-5" />
        </>
      ),
    },
    {
      question: "อะไรเป็นความแตกต่างของสีเมื่อทำการจองห้อง ?",
      answer: (
        <>
          <p>
            ในการจองห้องเราจะทำการแบ่งแยกสถานะของผู้ที่ใช้ห้อง
            โดยจะมีสีกำกับเมื่อทำการจองห้อง ดังนี้
          </p>
          <div className="flex items-center space-x-3 py-5 pl-5">
            <span className="font-bold text-black">
              อาคาร:<span className="border-b-4 border-purple-500 ml-1"></span>
            </span>
            <span className="bg-[#ABE9FF] text-[#2A82A1] px-4 py-1 rounded-full font-medium">
              SIT Building
            </span>
            <span className="bg-[#FFB692] text-[#C74200] px-4 py-1 rounded-full font-medium">
              LX
            </span>
            <span className="bg-[#F5E460] text-[#8E6F09] px-4 py-1 rounded-full font-medium">
              CB2
            </span>
          </div>
          <p>
            ดังนั้น หากต้องการจองห้องกรุณาเลือกประเภทตามผู้ที่ใช้ห้องจริง ๆ
            ให้ถูกต้องด้วย เช่น หากผู้เข้าใช้ห้องเป็นอาจารย์
            แต่ผู้ที่จองห้องให้อาจารย์ท่านนั้นเป็น LF ประจำวิชา
            ให้เลือกประเภทผู้จองห้องเป็น
            Lecturerหรือถ้าหากผู้ใช้ห้องเป็นนักศึกษา
            แต่ผู้ที่จองห้องให้นั้นเป็นนักบริการการศึกษา
            ให้เลือกประเภทผู้จองห้องเป็น Student
          </p>
        </>
      ),
    },
    {
      question: "ดูตารางเวลาจองห้องอย่างไร ?",
      answer: (
        <>
          การดูเวลาในการจองห้องนั้น ในแต่ละช่องคือ 1 ชั่วโมง เช่น จองห้อง 2 ชม.
          คือ 10:00 - 12:00 น. สีที่ Highlight ที่เกิดขึ้นจะครอบคลุม 2 ช่อง
          ดังรูป
          <img src="public/Help/Help5.png" alt="" className="p-5 px-20" />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="h-full grid grid-rows-[auto_auto_auto]">
        <Navbar />
        <div className="bg-white  flex flex-col">
          <div className="flex flex-col items-center w-full">
            {/* ส่วนหัว */}
            <div
              className="bg-gradient-to-b p-10 w-full flex flex-col items-center"
              style={{
                backgroundImage:
                  'linear-gradient(to bottom, transparent 30%, white 20%), url("/abstract-saturated-psychedelic-vivid-background.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "auto",
              }}
            >
              <div className="text-white flex flex-col items-center">
                <h1 className="text-4xl font-bold mt-10">
                  สวัสดี! มีอะไรให้เราช่วยเหลือไหม
                </h1>

                {/* ปุ่มติดต่อทีมงาน */}
                <button className="mt-6 flex items-center gap-2 bg-white text-black font-semibold py-3 px-10 rounded-full shadow-md">
                  <MessageSquare size={20} className="text-blue-500" />
                  ติดต่อ Software Team
                </button>
              </div>

              {/* เนื้อหา */}
              <div className="flex-grow w-full max-w-4xl px-6 pb-20 flex flex-col items-center">
                <div className="flex gap-6 mt-12 flex-wrap justify-center">
                  <button
                    onClick={() => setIsSystemOpen(true)}
                    className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md w-60 py-10 hover:bg-gray-200 cursor-pointer"
                  >
                    <Book size={40} className="text-blue-400" />
                    <p className="mt-4 text-lg font-semibold text-black text-center">
                      อธิบายระบบจองห้อง
                    </p>
                  </button>
                  <button
                    onClick={() => setIsBookOpen(true)}
                    className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md w-60 py-10 hover:bg-gray-200 cursor-pointer"
                  >
                    <Calendar size={40} className="text-blue-400" />
                    <p className="mt-4 text-lg font-semibold text-black text-center">
                      วิธีเริ่มต้นการจอง
                    </p>
                  </button>
                  <button
                    onClick={() => setIsReportOpen(true)}
                    className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md w-60 py-10 hover:bg-gray-200 cursor-pointer"
                  >
                    <Flag size={40} className="text-blue-400" />
                    <p className="mt-4 text-lg font-semibold text-black text-center">
                      วิธีรายงาน
                    </p>
                  </button>
                </div>

                {/* คำถามที่พบบ่อย */}
                <div className="w-full max-w-2xl mt-12">
                  <h2 className="text-2xl font-bold text-black mb-4">
                    คำถามที่พบบ่อย
                  </h2>
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
                          <span className="text-black font-medium text-lg">
                            {faq.question}
                          </span>
                          <span className="rounded-full p-1">
                            {openIndex === index ? (
                              <ChevronDown
                                size={24}
                                className="text-[#89BBFE]"
                              />
                            ) : (
                              <ChevronRight
                                size={24}
                                className="text-[#89BBFE]"
                              />
                            )}
                          </span>
                        </div>
                        {openIndex === index && (
                          <div className="mt-3 text-gray-700 border-t-2 border-gray-300 pt-5">
                            {faq.answer}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal */}
            {isSystemOpen && <HowToUse setIsOpen={setIsSystemOpen} />}
            {isBookOpen && <HowToBook setIsOpen={setIsBookOpen} />}
            {isReportOpen && <HowToReport setIsOpen={setIsReportOpen} />}
          </div>
        </div>

        {/* Footer */}
      </div>
      <Footer />
    </>
  );
}
