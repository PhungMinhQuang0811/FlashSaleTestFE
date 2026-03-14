import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 className="p-10">Home</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/customer" element={<h1 className="p-10">Customer</h1>} />
        <Route path="/seller" element={<h1 className="p-10">Seller</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;