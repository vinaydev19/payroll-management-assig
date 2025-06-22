import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import Dashboard from './components/dashboard/Dashboard';
import DashBoardLayout from './pages/DashBoardLayout';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashBoardLayout />} />
            {/* Add more sub-routes as needed */}
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
