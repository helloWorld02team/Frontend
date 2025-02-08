import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';





function Rules() {
  const navigate = useNavigate();
  useEffect(() => {
    // Check if terms are accepted when the component mounts
    const termsAccepted = localStorage.getItem('termsAccepted') === 'true';
    if (termsAccepted) {
      // If accepted, navigate to the home page
      navigate('/app');
    }
  }, [navigate]);

  const handleAccept = () => {
    // Store acceptance in localStorage
    localStorage.setItem('termsAccepted', 'true');
    navigate('/app'); // Redirect to the main page
  };
 

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2" style={{ backgroundImage: "url('/sitback.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      </div>
      <div className="w-1/2">
        <div className="flex-1 bg-white p-10 flex flex-col justify-center mx-10">
          <div>
            <button className="p-3 bg-[#615D6C] border-2 border-black text-white rounded-full float-right">
              ไทย
            </button>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-2xl mb-6">ประกาศ</h1>
            <p className="text-xl mb-4">คณะเทคโนโลยีสารสนเทศ</p>
          </div>

          <div className="mb-10">
            <p className="mb-2">ข้อปฏิบัติสำหรับผู้มีสิทธิ์จองห้องเรียนและห้องอบรมคอมพิวเตอร์</p>
            <p>การจองห้องเรียนหรือห้องอบรมคอมพิวเตอร์...</p>
          </div>

          <div className="text-right mb-15">
            <p>ทั้งนี้ ตั้งแต่วันที่ 28 ตุลาคม พ.ศ. 2548</p>
            <p>ประกาศ ณ วันที่ 28 ตุลาคม พ.ศ. 2548</p>
            <p>คณะเทคโนโลยีสารสนเทศ</p>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button className="px-6 py-2 bg-[#000000] border-2 border-black text-white rounded-full w-[120px]" onClick={handleAccept}>
              ใช่
            </button>
            <button className="px-6 py-2 bg-[#615D6C] border-2 border-black text-white rounded-full w-[120px]">
              ไม่ใช่
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rules;