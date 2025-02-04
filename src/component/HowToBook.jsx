import { X } from "lucide-react";

export default function HowToBook({ setIsOpen }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full p-10 relative max-h-[80vh] overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-4xl font-semibold">วิธีเริ่มต้นการจอง</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4 text-gray-600 text-2xl px-10">
          <p className="border-b border-[#9A97A1]">1. คุณจำเป็นต้องเข้าสู่ระบบก่อนเพื่อเริ่มต้นการจอง
            <img src="/Book/Book1.png" alt="" className="w-4/5 mx-auto py-5" />
          </p>
          <p className="border-b border-[#9A97A1]">2. เลือกช่วงเวลาที่ต้องการ แล้วกดปุ่ม "เริ่มต้นการจอง"
            <img src="/Book/Book2.png" alt="" className="w-4/5 mx-auto py-5" />
          </p>
          <p className="border-b border-[#9A97A1]">3. จากนั้นเลือกห้องที่ต้องการ ระบบจะแสดงห้องว่างให้คุณ
            <img src="/Book/Book3.png" alt="" className="w-4/5 mx-auto py-5" />
          </p>
          <p className="border-b border-[#9A97A1]">4. กรอกข้อมูลให้ครบถ้วน แล้วกดยืนยัน
            <img src="/Book/Book4.png" alt="" className="w-4/5 mx-auto py-5" />
          </p>
          <p className="">5. หลังจากจองสำเร็จ ระบบจะแสดงสถานะการจอง
            <img src="/Book/Book5.png" alt="" className="w-4/5 mx-auto py-5" />
          </p>
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
