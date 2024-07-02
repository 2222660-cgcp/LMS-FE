import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MainRoutes from "./components/MainRoutes";

function App() {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
}

export default App;
