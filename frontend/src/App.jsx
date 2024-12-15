// Imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SpectacleBorough from './pages/SpectacleBorough';
import SpectaclesByCategory from './pages/SpectaclesByCategory';
import SalleBorough from './pages/SalleBorough';
import MapWithAddress from './components/map';

import Login from './pages/Login';
import Register from './pages/Register';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/spectacles/:borough" element={<SpectacleBorough />} />
          <Route path="/salles/:borough" element={<SalleBorough />} />
          <Route path="/spectacles-en-cours/:category" element={<SpectaclesByCategory />} />
          <Route path="/map" element={<MapWithAddress />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
