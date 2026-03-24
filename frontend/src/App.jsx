import { useState } from "react";
import Header from './pages/Header'
import Content from './pages/Content'

function App() {

  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(prev => !prev);
  };

  return (
    <div className="bg-linear-to-t from-[#ff8830] to-[#000117] text-[#ff8830] min-h-screen">
      <Header onProductSaved={handleReload} />
      <Content reload={reload}/>
    </div>

  );
}

export default App
