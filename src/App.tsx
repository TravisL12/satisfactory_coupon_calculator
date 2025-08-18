import { Calculator } from './components/Calculator';
import { Sidebar } from './components/Sidebar';
import './styles.css';

function App() {
  return (
    <>
      <header>
        <h1>Satisfactory Coupons Calculator</h1>
      </header>

      <div className="main-container">
        <Calculator />
        <Sidebar />
      </div>
    </>
  );
}

export default App;