import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PaginaLogin from './pages/Login/PaginaLogin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaLogin />} />
        <Route path="/login" element={<PaginaLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App