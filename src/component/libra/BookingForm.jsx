import React, { useState } from "react";
import { Dialog, Card, CardBody, Typography, Button,  } from "@material-tailwind/react";
import LxStart from "./LxStart";


const BookingForm = ({ open, handleOpen }) => {
    const [formData, setFormData] = useState({
      name: "",
      date: "",
      startTime: "",
      endTime: "",
      floor: "",
      room: "",
      building: "" ,
      additionalInfo: "",
      repeatBooking: false,
      repeatBookingOption: "",
      repeatFrequency: "",
      bookingDate: "",
      endDate: "",
      
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!validateForm()) return;
  
      const payload = {
        name: formData.name,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        floor: formData.floor,
        room: formData.room,
        additionalInfo: formData.additionalInfo,
        repeatBooking: formData.repeatBookingOption !== "",
        repeatFrequency: formData.repeatFrequency,
        bookingDates: {
          startDate: formData.bookingDate,
          endDate: formData.endDate,
        },
        attendees: formData.attendees ? formData.attendees.split(",") : [],
      };
  
      console.log("Booking Payload:", payload);
    };
  

    return (
      <Dialog
        open={open}
        handler={handleOpen}
        size="lg"
        className="dialog-overlay flex items-center justify-center bg-transparent z-50"
      >
        <div className="fixed inset-0 bg-transparent z-40 pointer-events-none"></div>
        <Card className="w-full max-w-4xl flex flex-row shadow-lg rounded-2xl overflow-hidden z-50">
            <LxStart />
          <CardBody className="w-full p-10 relative z-50">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-4xl z-50"
              onClick={handleOpen}
            >
              &times;
            </button>
            <Typography variant="h3" className="text-center mb-6">
              เพิ่มหัวข้อ...
            </Typography>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Typography variant="h6">ผู้จอง</Typography>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded-lg shadow-md"
                  placeholder="ชื่อผู้จอง"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Typography variant="h6">วันที่</Typography>
                <input
                  type="date"
                  name="date"
                  className="w-full p-2 border rounded-lg shadow-md"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Typography variant="h6">เวลา</Typography>
                <div className="flex gap-2">
                  <input
                    type="time"
                    name="startTime"
                    className="w-full p-2 border rounded-lg shadow-md"
                    value={formData.startTime}
                    onChange={handleChange}
                  />
                  <span className="self-center">-</span>
                  <input
                    type="time"
                    name="endTime"
                    className="w-full p-2 border rounded-lg shadow-md"
                    value={formData.endTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Typography variant="h6">อาคาร</Typography>
                <input
                  type="text"
                  name="building"
                  className="w-full p-2 border rounded-lg shadow-md"
                  placeholder="LX CB SIT"
                  value={formData.building}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Typography variant="h6">ชั้นที่</Typography>
                <input
                  type="text"
                  name="floor"
                  className="w-full p-2 border rounded-lg shadow-md"
                  placeholder="ชั้นที่..."
                  value={formData.floor}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Typography variant="h6">ห้อง</Typography>
                <input
                  type="text"
                  name="room"
                  className="w-full p-2 border rounded-lg shadow-md"
                  placeholder="ห้องที่..."
                  value={formData.room}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Typography variant="h6">จองซ้ำ</Typography>
                <select
                  name="repeatBookingOption"
                  className="w-full p-2 border rounded-lg shadow-md"
                  value={formData.repeatBookingOption}
                  onChange={handleChange}
                >
                  <option value="">ไม่ต้องจองซ้ำ</option>
                  <option value="repeat">จองซ้ำ</option>
                </select>
              </div>
              <div className="col-span-2">
                <Typography variant="h6">คำอธิบายเพิ่มเติม</Typography>
                <textarea
                  name="additionalInfo"
                  className="w-full p-2 border rounded-lg shadow-md"
                  placeholder="คำอธิบาย..."
                  value={formData.additionalInfo}
                  onChange={handleChange}
                />
              </div>
              {formData.repeatBookingOption && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Typography variant="h6">จองทุกวันที่</Typography>
                    <input
                      type="date"
                      name="bookingDate"
                      className="w-full p-2 border rounded-lg shadow-md"
                      value={formData.bookingDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Typography variant="h6">จองซ้ำทุก</Typography>
                    <select
                      name="repeatFrequency"
                      className="w-full p-2 border rounded-lg shadow-md"
                      value={formData.repeatFrequency}
                      onChange={handleChange}
                    >
                      <option value="">เลือกความถี่</option>
                      <option value="weekly">1 สัปดาห์</option>
                      <option value="biweekly">2 สัปดาห์</option>
                      <option value="monthly">1 เดือน</option>
                    </select>
                  </div>
                  <div>
                    <Typography variant="h6">วันสิ้นสุด</Typography>
                    <input
                      type="date"
                      name="endDate"
                      className="w-full p-2 border rounded-lg shadow-md"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              <div className="col-span-2 flex justify-end gap-1">
                <Button
                  type="button"
                  color="gray"
                  onClick={handleOpen}
                  className="bg-gray-300 text-black px-6 py-2 text-1xl"
                >
                  ยกเลิก
                </Button>
                <Button
                  type="submit"
                  className="bg-[#4EFFF0] text-black px-6 py-2 text-1xl"
                >
                  จองเลย
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </Dialog>
    );
  };
  
  export default BookingForm;
  