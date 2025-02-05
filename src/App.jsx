import React from "react";
import Navbar from "./component/Navbar";
import Content from "./component/content";
import CalendarApp from "./component/libra/caren";
import Footer from "./component/Footer";
import Test from "./component/Test";


function App() {
  return (
    <div>
      <Navbar />
      <Content />
      <CalendarApp />
      <Footer />
      <Test />
    </div>
  );
}

export default App;
