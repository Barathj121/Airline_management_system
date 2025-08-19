import { Link, Route, Routes } from "react-router-dom";
import CheckIn from "./pages/CheckIn";
import InFlightServices from "./pages/InFlightServices";

function App() {
  return (
    <div className="App">
      <h1>Flight Staff Portal</h1>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/checkin">
          <button style={{ marginRight: "10px" }}>Check-In</button>
        </Link>
        <Link to="/inflight-services">
          <button>In-Flight Services</button>
        </Link>
      </div>

      <Routes>
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/inflight-services" element={<InFlightServices />} />
      </Routes>
    </div>
  );
}

export default App;
