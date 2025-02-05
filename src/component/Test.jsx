import React, { useState, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import th from "date-fns/locale/th";
import { Dialog } from "@headlessui/react";

const locales = { th };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Test = () => {
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

  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: null,
    end: null,
    building: "",
    floor: "",
    room: "",
    recurring: false,
  });

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectSlot = useCallback(({ start, end }) => {
    setNewEvent({ ...newEvent, start, end });
    setIsModalOpen(true);
  }, [newEvent]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert("Please fill all fields before saving.");
      return;
    }

    const newEvents = [
      {
        ...newEvent,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end),
        id: events.length,
      },
    ];

    // Handle recurring event creation
    if (newEvent.recurring) {
      const recurringEvents = [];
      for (let i = 1; i <= 4; i++) {
        const nextWeekStart = new Date(newEvent.start);
        nextWeekStart.setDate(nextWeekStart.getDate() + i * 7);

        const nextWeekEnd = new Date(newEvent.end);
        nextWeekEnd.setDate(nextWeekEnd.getDate() + i * 7);

        recurringEvents.push({
          ...newEvent,
          start: nextWeekStart,
          end: nextWeekEnd,
          id: events.length + i,
        });
      }
      newEvents.push(...recurringEvents);
    }

    setEvents((prev) => [...prev, ...newEvents]);
    setIsModalOpen(false);
  };

  const handleDeleteEvent = () => {
    setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.id));
    setIsDetailModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "building") {
      setNewEvent({ ...newEvent, building: value, floor: "", room: "" });
    } else if (name === "floor") {
      setNewEvent({ ...newEvent, floor: value, room: "" });
    } else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Booking Room</h1>
      </header>

      {/* Calendar Component */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
        step={30}
        views={{ week: true, day: true }}
        defaultView="week"
        className="border border-gray-200 rounded-lg"
        min={new Date(2023, 1, 1, 8, 0)}
        max={new Date(2023, 1, 1, 22, 0)}
      />

      {/* Modal for Adding Event */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">เพิ่มข้อมูลการจอง</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium">ชื่อผู้จอง</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium">เวลาเริ่ม</label>
                  <input
                    type="datetime-local"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    value={newEvent.start ? new Date(newEvent.start).toISOString().slice(0, 16) : ""}
                    onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">เวลาสิ้นสุด</label>
                  <input
                    type="datetime-local"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    value={newEvent.end ? new Date(newEvent.end).toISOString().slice(0, 16) : ""}
                    onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">อาคาร</label>
                <select
                  name="building"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={newEvent.building}
                  onChange={handleChange}
                >
                  <option value="">เลือกอาคาร</option>
                  {buildingOptions.map((building) => (
                    <option key={building} value={building}>
                      {building}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">ชั้น</label>
                <select
                  name="floor"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={newEvent.floor}
                  onChange={handleChange}
                  disabled={!newEvent.building}
                >
                  <option value="">เลือกชั้น</option>
                  {newEvent.building &&
                    floorOptions[newEvent.building]?.map((floor) => (
                      <option key={floor} value={floor}>
                        {floor}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">ห้อง</label>
                <select
                  name="room"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={newEvent.room}
                  onChange={handleChange}
                  disabled={!newEvent.floor}
                >
                  <option value="">เลือกห้อง</option>
                  {newEvent.floor &&
                    roomOptions[newEvent.floor]?.map((room) => (
                      <option key={room} value={room}>
                        {room}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={newEvent.recurring}
                    onChange={(e) => setNewEvent({ ...newEvent, recurring: e.target.checked })}
                  />
                  จองซ้ำทุกสัปดาห์
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  onClick={handleAddEvent}
                >
                  บันทึกการจอง
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      {/* Modal for Viewing Event Details */}
      <Dialog open={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">รายละเอียดการจอง</h2>
            {selectedEvent && (
              <div>
                <p><strong>ชื่อการจอง:</strong> {selectedEvent.title}</p>
                <p><strong>เวลาเริ่ม:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
                <p><strong>เวลาสิ้นสุด:</strong> {new Date(selectedEvent.end).toLocaleString()}</p>
                <p><strong>อาคาร:</strong> {selectedEvent.building}</p>
                <p><strong>ชั้น:</strong> {selectedEvent.floor}</p>
                <p><strong>ห้อง:</strong> {selectedEvent.room}</p>
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="bg-red-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-700"
                onClick={handleDeleteEvent}
              >
                ลบการจอง
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={() => setIsDetailModalOpen(false)}
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Test;