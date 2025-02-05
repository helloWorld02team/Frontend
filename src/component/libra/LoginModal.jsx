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
      const response = await fetch("https://www.melivecode.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password: password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log("ล็อกอินสำเร็จ:", result.message);
        setUserName(result.user.username);
  
        if (rememberMe) {
          localStorage.setItem("userData", JSON.stringify(result.user));
          const userData = {
            token: result.accessToken,
            username: result.user.username,
            expiresIn: result.expiresIn,
          };
          localStorage.setItem("userData", JSON.stringify(userData));
        }
  
        handleOpen(); // ปิดโมดอล
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
    >
      <div className="fixed inset-0 bg-transparent z-40 pointer-events-none"></div>
      <Card className="w-full max-w-4xl flex flex-row shadow-lg rounded-2xl overflow-hidden z-50">
        <BgStart />
        <CardBody className="w-full md:w-1/2 p-20 relative z-50">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-black text-4xl z-50"
            onClick={handleOpen}
          >
            &times;
          </button>
          <Typography variant="h3" className="text-center mb-6">
            เข้าสู่ระบบ
          </Typography>
          {errorMessage && (
            <Typography className="text-red-500 text-center mb-4">
              {errorMessage}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Typography variant="h6">อีเมล</Typography>
              <input
                type="text"
                className="w-full p-2 border rounded-lg z-50 pointer-events-auto shadow-md"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Typography variant="h6">รหัสผ่าน</Typography>
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
            <Button className="w-full bg-[#4EFFF0] text-black text-[15px]" type="submit">
              เข้าสู่ระบบ
            </Button>
          </form>
        </CardBody>
      </Card>
    </Dialog>
  );
};

export default LoginModal;
