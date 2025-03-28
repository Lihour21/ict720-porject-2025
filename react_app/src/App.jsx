import { Route, Routes } from "react-router-dom";
import FloorOnePage from "./pages/FloorOne";
import FloorTwoPage from "./pages/FloorTwo";
import FloorThreePage from "./pages/FloorThree";
import FloorFourPage from "./pages/FloorFour";
import FloorFivePage from "./pages/FloorFive";
import Sidebar from "./components/Sidebar";



function App() {
  return <div className='flex h-screen bg-gray-900 text-gray-700 overflow-auto'>
    {/* BG */}
    <div className='fixed inset-0 z-0'>
      <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
      <div className='absolute inset-0 backdrop-blur-sm' />
    </div>
    <Sidebar />
    <Routes>
      <Route path='/' element={<FloorOnePage />} />
      <Route path='/two' element={<FloorTwoPage />} />
      <Route path='/three' element={<FloorThreePage />} />
      <Route path='/four' element={<FloorFourPage />} />
      <Route path='/five' element={<FloorFivePage />} />
    </Routes>
  </div>;
}

export default App;