import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FormView from "./views/FormView";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<FormView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
