import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RpSubmit from "./RpSubmit";

function ReportForm() {
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/report/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("รายงานถูกส่งเรียบร้อยแล้ว");
        setShowModal(true);
        setFormData({
          reporter: "",
          date: new Date().toISOString().split("T")[0],
          building: "",
          floor: "",
          room: "",
          description: "",
          image: null,
        });
      } else {
        alert("การส่งรายงานล้มเหลว กรุณาลองใหม่");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };
  const [formData, setFormData] = useState({
    reporter: "",
    date: new Date().toISOString().split("T")[0],
    building: "",
    floor: "",
    room: "",
    description: "",
    image: null,
  });

  const buildingOptions = ["CB2", "LX", "SIT"];
  const floorOptions = {
    CB2: ["CB23"],
    LX: ["LX10", "LX11", "LX12"],
    SIT: ["SIT1", "SIT3", "SIT4"],
  };
  const roomOptions = {
    CB23: [
      "CB2301",
      "CB2304",
      "CB2305",
      "CB2306",
      "CB2308",
      "CB2312",
      "CB2313",
    ],
    LX10: ["LX10/1", "LX10/2", "LX10/3", "LX10/4", "LX10/5"],
    LX11: ["LX11/1", "LX11/2", "LX11/3", "LX11/4", "LX11/5"],
    LX12: ["LX12/1", "LX12/2"],
    SIT1: ["SIT1/3", "SIT1/5"],
    SIT3: ["SIT3/1", "SIT3/2", "SIT3/3", "SIT3/4"],
    SIT4: ["SIT4/2", "SIT4/3"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "building") {
      setFormData({ ...formData, building: value, floor: "", room: "" });
    } else if (name === "floor") {
      setFormData({ ...formData, floor: value, room: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleClose = () => {
    console.log("ปิดฟอร์ม");
  };

  return (
    <>
      <Navbar />
      <div
        className="p-6 min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url("public/sitback.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* <div className="p-6 min-h-screen flex items-center justify-center"></div> */}
        <div className="w-full max-w-4xl p-8 bg-white bg-opacity-80 rounded-2xl shadow-md relative">
          <h2 className="text-2xl font-bold mb-6">Report on Meetings</h2>
          <div className="space-y-6">
            {/* ฟิลด์ข้อมูล */}
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-2 w-2/3">
                <label className="flex gap-2 text-lg font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                  </svg>
                  ผู้รายงาน
                </label>
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
                <label className="flex gap-2 text-lg font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M80-120v-720h400v160h400v560H80Zm80-80h240v-80H160v80Zm0-160h240v-80H160v80Zm0-160h240v-80H160v80Zm0-160h240v-80H160v80Zm320 480h320v-400H480v400Zm80-240v-80h160v80H560Zm0 160v-80h160v80H560Z" />
                  </svg>
                  อาคาร
                </label>
                <select
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg w-full shadow-md"
                >
                  <option value="">เลือกอาคาร</option>
                  {buildingOptions.map((b) => (
                    <option key={b} value={b}>
                      {" "}
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg font-medium">ชั้น</label>
                <select
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg w-full shadow-md"
                  disabled={!formData.building}
                >
                  <option value="">เลือกชั้น</option>
                  {formData.building &&
                    floorOptions[formData.building]?.map((floor) => (
                      <option key={floor} value={floor}>
                        {" "}
                        {floor}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg font-medium">ห้อง</label>
                <select
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg w-full shadow-md"
                  disabled={!formData.floor}
                >
                  <option value="">เลือกห้อง</option>
                  {formData.floor &&
                    roomOptions[formData.floor]?.map((room) => (
                      <option key={room} value={room}>
                        {" "}
                        {room}
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

            {/* ปุ่มยกเลิกและส่ง */}
            <div className="flex justify-between">
              <button
                className="px-8 py-3 border border-gray-300 rounded-lg w-[200px] shadow-md hover:shadow-lg"
                onClick={handleClose}
              >
                ยกเลิก
              </button>
              <button className="px-8 py-3 bg-[#4EFFF0] border border-gray-300 rounded-lg w-[200px] shadow-md hover:shadow-lg" onClick={handleSubmit}>
                ส่งรีพอร์ต
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <RpSubmit isOpen={showModal} onClose={() => setShowModal(false)} />}
      <Footer />
    </>
  );
}

export default ReportForm;
