import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppLayout from "./components/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MyResume from "./pages/MyResume.jsx";
import SkillGap from "./pages/SkillGap.jsx";
import Jobs from "./pages/Jobs.jsx";
import LearningPath from "./pages/LearningPath.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<MyResume />} />
          <Route path="/skill-gap" element={<SkillGap />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/learning-path" element={<LearningPath />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
