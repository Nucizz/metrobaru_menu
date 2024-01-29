import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Menu from './Menu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/' element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
