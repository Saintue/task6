import './styles/app.scss';
import Canvas from "./components/Canvas";
import Settings from "./components/Settings";
import Toolbar from "./components/Toolbar";
import {BrowserRouter, Routes, Navigate, Route} from 'react-router-dom'
import Menu from "./components/Menu";

function App() {
  return (
      <BrowserRouter>
          <div className="app">
              <Routes>
                  <Route path='/task6' element={<><Menu/></>} />
                  <Route path='/:id' element={<><Toolbar/><Settings/><Canvas/></>} />
              </Routes>
    </div>
      </BrowserRouter>
  );
}

export default App;
