import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function ReportForm() {
  const [formData, setFormData] = useState({
    reporter: "",
    date: new Date().toISOString().split("T")[0],
    building: "a",
    room: "",
    floor: "",
    description: "",
    image: null,
  });

   // กำหนดตัวเลือกของห้องและชั้น
   const roomOptions = ["aa", "ab", "ac"];
   const floorOptions = {
     aa: ["aa1", "aa2"],
     ab: ["ab1", "ab2"],
     ac: ["ac1", "ac2", "ac3"],
   };

   const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "room") {
      // เมื่อเปลี่ยนห้อง รีเซ็ตค่าชั้นให้เป็นค่าแรกสุดของห้องนั้น
      setFormData({ ...formData, room: value, floor: floorOptions[value]?.[0] || "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleClose = () => {
    console.log("ปิดฟอร์ม");
  };

  return (
    <>
      <Navbar/>
      <div
            className="p-1 min-h-screen flex items-center justify-center"
            style={{
              backgroundImage: 'url("public/sitback.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "100vw",
              height: "100vh",
            }}
          >
            <div className="w-full max-w-4xl p-8 bg-white bg-opacity-80 rounded-2xl shadow-md relative">
              <h2 className="text-2xl font-bold mb-6">Report on Meetings</h2>
              <div className="space-y-6">
                {/* ฟิลด์ข้อมูล */}
                <div className="flex space-x-4">
                  <div className="flex flex-col space-y-2 w-2/3">
                    <label className="text-lg font-medium">ผู้รายงาน</label>
                    <input
                      type="text"
                      name="reporter"
                      value={formData.reporter}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-lg w-full shadow-md"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-1/3">
                    <label className="text-lg font-medium">วันที่</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-lg w-full shadow-md"
                    />
                  </div>
                </div>

                {/* ข้อมูลอาคาร ห้อง และ ชั้น */}
                <div className="grid grid-cols-3 gap-4">
                  {/* อาคาร (ล็อกเป็นอาคาร A) */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-lg font-medium">อาคาร</label>
                    <select
                      name="building"
                      value={formData.building}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-lg w-full shadow-md"
                      disabled
                    >
                      <option value="a">อาคาร A</option>
                    </select>
                  </div>

                  {/* ห้อง */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-lg font-medium">ชั้น</label>
                    <select
                      name="room"
                      value={formData.room}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-lg w-full shadow-md"
                    >
                      <option value="">เลือกชั้น</option>
                      {roomOptions.map((room) => (
                        <option key={room} value={room}>
                          ห้อง {room.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ชั้น */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-lg font-medium">ห้อง</label>
                    <select
                      name="floor"
                      value={formData.floor}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-lg w-full shadow-md"
                      disabled={!formData.room} // ปิดการใช้งานถ้ายังไม่ได้เลือกห้อง
                    >
                      <option value="">เลือกห้อง</option>
                      {formData.room &&
                        floorOptions[formData.room].map((floor) => (
                          <option key={floor} value={floor}>
                            ชั้น {floor.toUpperCase()}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* คำอธิบาย */}
                <div className="bg-[#F1F1F1] flex flex-col space-y-2 rounded-lg">
                  <textarea
                    name="description"
                    placeholder="คำอธิบาย..."
                    value={formData.description}
                    onChange={handleChange}
                    className="p-3 rounded-lg w-full"
                  />
                </div>

                {/* แนบรูปภาพ */}
                <label className="bg-[#F1F1F1] flex items-center justify-center space-x-3 p-3 rounded-lg cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#9A97A1"
                  >
                    <path d="M440-440ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l74-80h240v80H355l-73 80H120v480h640v-360h80v360q0 33-23.5 56.5T760-120H120Zm640-560v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Z" />
                  </svg>
                  <span className="text-gray-500 text-center">
                    {formData.image ? "อัปโหลดสำเร็จ!" : "แนบรูปภาพ (ถ้ามี)"}
                  </span>
                </label>

                {/* แสดงตัวอย่างรูปภาพ */}
                {formData.image && (
                  <div className="flex justify-center">
                    <img
                      src={formData.image}
                      alt="Uploaded Preview"
                      className="w-32 h-32 object-cover rounded-lg mt-2"
                    />
                  </div>
                )}

                {/* ปุ่มยกเลิกและส่ง */}
                <div className="flex justify-between">
                  <button
                    className="px-8 py-3 border border-gray-300 rounded-lg w-[200px] shadow-md hover:shadow-lg"
                    onClick={handleClose}
                  >
                    ยกเลิก
                  </button>
                  <button className="px-8 py-3 bg-[#4EFFF0] border border-gray-300 rounded-lg w-[200px] shadow-md hover:shadow-lg">
                    ส่งรีพอร์ต
                  </button>
                </div>
              </div>
            </div>
          </div>
        <Footer />
    </>
    
  );
}

export default ReportForm;