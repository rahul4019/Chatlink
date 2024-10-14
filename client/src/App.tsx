import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Chat from "./pages/Chat";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element=<Home /> />
        <Route path="/signup" element=<SignUp /> />
        <Route path="/signin" element=<SignIn /> />
        <Route
          path="/chat"
          element={<ProtectedRoutes>{<Chat />}</ProtectedRoutes>}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
