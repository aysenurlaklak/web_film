import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Reducer";
import Home from "./Home";
import ShowDetail from "./ShowDetail";
import Footer from "./Footer";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/show/:id" element={<ShowDetail />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
