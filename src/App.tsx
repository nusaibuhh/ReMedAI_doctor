import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import PatientsPage from './pages/PatientsPage';
import PrescriptionCheckerPage from './pages/PrescriptionCheckerPage';
import ChatbotPage from './pages/ChatbotPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="prescription-checker" element={<PrescriptionCheckerPage />} />
          <Route path="chatbot" element={<ChatbotPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
