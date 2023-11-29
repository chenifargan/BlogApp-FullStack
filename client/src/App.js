import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Componnent/Layout";
import HomePage from "./Pages/HomePage";
import LogInPage from "./Pages/LogInPage";
import RegisterPage from "./Pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
