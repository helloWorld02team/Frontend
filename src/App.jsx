import React from "react";
import Navbar from "./component/Navbar";
import Content from "./component/Content";
import CalendarApp from "./component/libra/caren";
import Footer from "./component/Footer";
import "./App.css"; 


function App() {
  return (
    <div>
      <Navbar />
      <Content />
      <CalendarApp />
      <Footer />
      
    </div>
  );
}

export default App; 

