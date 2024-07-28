
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ImplementCard from '../components/implementcard'; 
import getImplements from '../services/implements.service.js';

function App() {
  const [implement, setImplement] = useState([]);

  useEffect(() => {
    const implementSubmit = async () => {
      const dataImplement = await getImplements();
      setImplement(dataImplement);
    };
    implementSubmit();
  }, []);

  return (
    <div className="implement-container">
      <Navbar />
      <ImplementCard data={implement} />

    </div>
  );
}

export default App;

