import './styles/app.scss';
import Canvas from "./components/Canvas";
import Settings from "./components/Settings";
import Toolbar from "./components/Toolbar";

function App() {
  return (
    <div className="app">
        <Toolbar></Toolbar>
        <Settings></Settings>
      <Canvas></Canvas>
    </div>
  );
}

export default App;
