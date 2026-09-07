import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.jsx";

import "./index.css";

const app = (
  <Router basename="/">
    <App />
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  import.meta.env.DEV ? app : <React.StrictMode>{app}</React.StrictMode>
);
