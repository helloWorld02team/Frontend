import { X } from "lucide-react";

export default function HowToReport({ setIsOpen }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full p-10 relative max-h-[80vh] overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-4xl font-semibold">วิธีรายงาน</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4 text-gray-600 text-2xl px-10">
          <p className="border-b border-[#9A97A1]">1. เข้าไปในส่วนของหน้า “Report” ในปุ่มข้างบน
            <img src="/Report/Report1.png" alt="" className="w-4/5 mx-auto py-5" />
          </p>
          <p className="">2. จากนั้นทำการกรอกรายละเอียดให้ครบถ้วน จากนั้นกด “ส่งรีพอร์ต”
            <img src="/Report/Report2.png" alt="" className="w-4/5 mx-auto py-5" />
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
