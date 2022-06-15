import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CharacterDetail from './gallery/CharacterDetail';
import Gallery from './gallery/Gallery';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/detail/:characterId" element={<CharacterDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
