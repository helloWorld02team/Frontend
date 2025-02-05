import React from "react";
import Navbar from "./component/Navbar";
import Content from "./component/content";
import CalendarApp from "./component/libra/caren";
import Footer from "./component/Footer";
import RpNotSubmit from "./component/BkNotSubmit";

function App() {
  return (
    <div>
      <Navbar />
      <Content />
      <CalendarApp />
      <Footer />
      {/* <RpNotSubmit /> */}
    </div>
  );
}

export default App;
