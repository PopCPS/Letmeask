import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/index.tsx';
import { AuthPage } from './pages/authPage/index.tsx';
import { ProfilePage } from './pages/profile/index.tsx';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}