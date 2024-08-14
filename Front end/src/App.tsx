import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/index.tsx';
import { AuthPage } from './pages/authPage/index.tsx';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    </Router>
  )
}