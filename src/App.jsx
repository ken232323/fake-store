import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Settings from './Settings'


const App = () => {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/Settings" element={<Settings/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
