import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BgStart from "../component/libra/BgStart";

function Rules() {
  const navigate = useNavigate();
  useEffect(() => {
    // Check if terms are accepted when the component mounts
    const termsAccepted = localStorage.getItem("termsAccepted") === "true";
    if (termsAccepted) {
      // If accepted, navigate to the home page
      navigate("/app");
    }
  }, [navigate]);

  const handleAccept = () => {
    // Store acceptance in localStorage
    localStorage.setItem("termsAccepted", "true");
    navigate("/app"); // Redirect to the main page
  };

  return (
    <div className="flex h-screen w-full">
      <BgStart />
      <div className="w-1/2">
        <div className="flex-1 bg-white py-20 px-15 flex flex-col justify-center mx-10 text-lg">
          <div className="text-center mb-10 space-y-2">
            <h1 className="text-red-500 text-4xl mb-8">ประกาศ !</h1>
            <p className="">คณะเทคโนโลยีสารสนเทศ</p>
            <p className="">
              ข้อปฏิบัติสำหรับผู้มีสิทธิ์จองห้องเรียนและห้องอบรมคอมพิวเตอร์
            </p>
          </div>

          <div className="mb-10">
            <p>
              การจองห้องเรียนหรือห้องอบรมคอมพิวเตอร์ อาจารย์ผู้สอน,
              ผู้ช่วยสอนหรือเจ้าหน้าที่ที่มีสิทธิ์จองห้องเป็นผู้รับผิดชอบและดูแล
              ความเรียบร้อยหลังเสร็จสิ้นการใช้งานทุกครั้ง ทั้งนี้ หากคณะฯตรวจสอบ
              แล้วพบอุปกรณ์การเรียนการสอนในห้องเกิดความเสียหาย หรือไม่มีการ
              ปิดไฟ, ปิดแอร์ หลังจากการใช้งาน คณะฯ ถือเป็นความบกพร่องในการ
              ปฏิบัติงานของผู้จอง และผู้จองอาจต้องชดใช้ค่าเสียหาย
              ไม่แสดงหน้านี้อีก
            </p>
          </div>

          {/* <div className="text-right mb-15">
            <p>ทั้งนี้ ตั้งแต่วันที่ 28 ตุลาคม พ.ศ. 2548</p>
            <p>ประกาศ ณ วันที่ 28 ตุลาคม พ.ศ. 2548</p>
            <p>คณะเทคโนโลยีสารสนเทศ</p>
          </div> */}

          <div className="flex justify-center mt-20 space-x-10 text-xl">
            <button className="px-10 py-2 rounded-xl w-[200px] shadow-md hover:shadow-lg hover:bg-[#e5e5e5] hover:cursor-pointer">
              ไม่ยอมรับ
            </button>
            <button
              className="px-10 py-2 bg-[#53E2FF] rounded-xl w-[200px] shadow-md hover:shadow-lg hover:bg-[#436da7] hover:text-white hover:cursor-pointer"
              onClick={handleAccept}
            >
              ยอมรับ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rules;
