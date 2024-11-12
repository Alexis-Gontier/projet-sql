// Imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts


// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MapWithAddress from './components/map';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MapWithAddress address="7 bis rue du Progrès, Montreuil, France" />
      </BrowserRouter>
  )
}

export default App
