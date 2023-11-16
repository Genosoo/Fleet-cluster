import { Routes, Route } from 'react-router-dom'
import Map from "./pages/Map/Map"

export default function App() {
  return (
    <Routes>
      <Route path='' element={<Map />} />
    </Routes>
  )
}
