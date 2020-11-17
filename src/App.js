import RPSSolverInterface from './rps';
import Navbar from './components/navbar';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <RPSSolverInterface />
    </div>
  );
}

export default App;
