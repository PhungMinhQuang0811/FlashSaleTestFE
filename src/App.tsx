import { HashRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Thêm cái này để hiện thông báo đẹp
import AppRoutes from './routes';

function App() {
  return (
    <HashRouter>
      {/* Toaster giúp hiện thông báo login thành công/thất bại mà không dùng alert */}
      <Toaster position="top-right" reverseOrder={false} />
      <AppRoutes />
    </HashRouter>
  );
}

export default App;