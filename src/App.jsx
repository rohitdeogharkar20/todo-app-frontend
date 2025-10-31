import "./App.css";
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Registration from "./pages/Registration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { useState } from "react";
import Privateroute from "./routes/Privateroute";
import Mytodos from "./pages/Mytodos";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/ThemeContext";
import Chat from "./pages/Chat";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />{" "}
      {/* toast notification */}
      <BrowserRouter>
        <ThemeProvider>
          {" "}
          {/* context api */}
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />

            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />

            <Route path="/register" element={<Registration />} />

            <Route element={<Layout />}>
              <Route
                path="/mytodo"
                element={
                  <Privateroute isAuthenticated={isAuthenticated}>
                    <Mytodos />
                  </Privateroute>
                }
              />

              <Route
                path="/chat"
                element={
                  <Privateroute isAuthenticated={isAuthenticated}>
                    <Chat />
                  </Privateroute>
                }
              />
            </Route>

            <Route path="*" element={<h1>404 Page Not Found!</h1>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
