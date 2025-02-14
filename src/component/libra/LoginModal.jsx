import React, { useState, useEffect } from "react";
import { Dialog, Card, CardBody, Typography, Checkbox, Button } from "@material-tailwind/react";
import BgStart from "./BgStart";

const LoginModal = ({ open, handleOpen , setUserName}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
        const response = await fetch("http://helloworld02.sit.kmutt.ac.th:3001/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials:"include",
            body: JSON.stringify({ userEmail: email, userPassword: password }),
        });

        const result = await response.json();
        console.log("Response:", result);

        if (response.ok) {
            console.log("ล็อกอินสำเร็จ:", result.message);

            // Correctly setting username
            const userData = {
                username: result.username, // Ensure this matches your API response
            };

            if (rememberMe) {
                localStorage.setItem("userData", JSON.stringify(userData));
            }

            setUserName(userData.username); // Ensure state updates
            handleOpen(); // Close modal
        } else {
            setErrorMessage(result.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
        }
    } catch (error) {
        setErrorMessage("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
        console.error("Error:", error);
    }
};
  

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
      setRememberMe(false);
      setErrorMessage("");
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size="lg"
      className="dialog-overlay flex items-center justify-center bg-transparent z-50"
      style={{ fontFamily: "LINE Seed Sans TH, sans-serif" }}
    >
      <Card className="w-full max-w-4xl flex flex-row shadow-lg rounded-2xl overflow-hidden z-50">
        <BgStart />
        <CardBody className="w-full md:w-1/2 p-20 relative z-50">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-black text-4xl z-50"
            onClick={handleOpen}
          >
            &times;
          </button>
          <Typography variant="h3" className="text-center mb-6" style={{ fontFamily: "LINE Seed Sans TH, sans-serif" }}>
            เข้าสู่ระบบ
          </Typography>
          {errorMessage && (
            <Typography className="text-red-500 text-center mb-4">
              {errorMessage}
            </Typography>
          )}
          <form onSubmit={handleSubmit} >
            <div className="mb-4">
              <Typography variant="h6" style={{ fontFamily: "LINE Seed Sans TH, sans-serif" }}>อีเมล</Typography>
              <input
                type="text"
                className="w-full p-2 border rounded-lg z-50 pointer-events-auto shadow-md"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Typography variant="h6" style={{ fontFamily: "LINE Seed Sans TH, sans-serif" }}>รหัสผ่าน</Typography>
              <input
                type="password"
                className="w-full p-2 border rounded-lg z-50 pointer-events-auto shadow-md"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <Checkbox
                label="จดจำการเข้าสู่ระบบ"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <a href="#">ลืมรหัสผ่าน?</a>
            </div>
            <Button className="w-full bg-[#4EFFF0] text-black text-[15px] hover:cursor-pointer" type="submit" style={{ fontFamily: "LINE Seed Sans TH, sans-serif" }}>
              เข้าสู่ระบบ
            </Button>
          </form>
        </CardBody>
      </Card>
    </Dialog>
  );
};

export default LoginModal;
