import './App.css'
import MenuAppBar from './components/MenuAppBar'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Tambah from './pages/Tambah'
import Test from './pages/Test'
import Cari from './pages/Cari'
import Error from './pages/Error'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <MenuAppBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tambah" element={<Tambah />} />
            <Route path='/test' element={<Test />} />
            <Route path="/cari" element={<Cari />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </Router>
      </header>
    </div>
  )
}

export default App