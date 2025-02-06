import React from 'react'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Rules() {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  useEffect(() => {
    const accepted = localStorage.getItem('termsAccepted');
    if (accepted) {
      setTermsAccepted(true);
    }
  }, []);

  useEffect(() => {
    if (termsAccepted) {
      navigate('/'); // Redirect ไปยังหน้าหลัก ถ้าผู้ใช้ยอมรับแล้ว
    } else {
      // ถ้ายังไม่ยอมรับให้แสดง Modal หรือข้อความให้กดยอมรับ
      alert('กรุณายอมรับข้อตกลงก่อนเข้าใช้งาน');
    }
  }, [termsAccepted, navigate]);

  const handleAccept = () => {
    localStorage.setItem('termsAccepted', true);
    setTermsAccepted(true);
  };


  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2" style={{ backgroundImage: "url('public/sitback.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      </div>

      <div className="w-1/2">
        <div className="flex-1 bg-white p-10 flex flex-col justify-center mx-10">
            
            <div>
            <button className=" p-3 bg-[#615D6C] border-2 border-black text-white rounded-full float-right ">
                ไทย 
            </button>
            </div>
        
            <div className="text-center mb-10">
                <h1 className="text-2xl mb-6">ประกาศ</h1>
                <p className="text-xl mb-4">คณะเทคโนโลยีสารสนเทศ</p>
            </div>

            <div className="mb-10">
                <p className="mb-2">ข้อปฏิบัติสำหรับผู้มีสิทธิ์จองห้องเรียนและห้องอบรมคอมพิวเตอร์</p>
                <p>
                การจองห้องเรียนหรือห้องอบรมคอมพิวเตอร์ อาจารย์ผู้สอน, ผู้ช่วยสอน หรือเจ้าหน้าที่ที่มีสิทธิ์จองห้องเป็นผู้รับผิดชอบ 
                และดูแลความเรียบร้อยหลังเสร็จสิ้นการใช้งานทุกครั้ง ทั้งนี้ หากคณะฯ ตรวจสอบแล้วพบอุปกรณ์การเรียนการสอนในห้องเกิดความเสียหาย 
                หรือไม่มีการปิดไฟ, ปิดแอร์ หลังจากการใช้งาน คณะฯ ถือเป็นความบกพร่องในการปฏิบัติงานของผู้จอง และผู้จองอาจต้องชดใช้ค่าเสียหาย
                </p>
            </div>
            
            <div className="text-right mb-15">
                <p>ทั้งนี้ ตั้งแต่วันที่ 28 ตุลาคม พ.ศ. 2548</p>
                <p>ประกาศ ณ วันที่ 28 ตุลาคม พ.ศ. 2548</p>
                <p>คณะเทคโนโลยีสารสนเทศ</p>
            </div>

            <div className="flex justify-center mt-8 space-x-4">
                <button className="px-6 py-2 bg-[#000000] border-2 border-black text-white rounded-full w-[120px]"  onClick={handleAccept}>
                ใช่
                </button>
                <button className="px-6 py-2 bg-[#615D6C] border-2 border-black text-white rounded-full w-[120px]">
                ไม่ใช่ 
                </button>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Rules
