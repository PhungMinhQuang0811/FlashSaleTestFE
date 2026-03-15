import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Thêm cái này để hiện thông báo đẹp
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      {/* Toaster giúp hiện thông báo login thành công/thất bại mà không dùng alert */}
      <Toaster position="top-right" reverseOrder={false} />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;