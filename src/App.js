
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Routes/Router';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Router></Router>
      </BrowserRouter>
    </div>
  );
}

export default App;
