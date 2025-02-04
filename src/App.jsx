import React from "react";
import Navbar from "./component/Navbar";
import Content from "./component/content";
import CalendarApp from "./component/libra/caren";
import Footer from "./component/Footer";
import HelpCenter from "./component/HelpCenter";
import Rules from "./component/Rules";
import RpNotSubmit from "./component/RpNotSubmit";

function App() {
  return (
    <div>
      <Navbar />
      <Content />
      <CalendarApp />
      <Footer /> 
      {/* <Rules  />
      <RpNotSubmit /> */}
    </div>
  );
}

export default App;
