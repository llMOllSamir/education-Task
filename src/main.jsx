import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import { ApiProvider } from "./Context/ConfigeApi.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApiProvider>
    <App />
  </ApiProvider>
);
