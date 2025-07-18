import { Outlet } from 'react-router-dom'; // Importăm componenta Outlet
import { Navigation } from './components/Navigation';

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-8 gap-16 aurora-background">
      
      {/* Meniul va fi afișat pe toate paginile */}
      <Navigation />

      {/* Outlet este locul unde React Router va randa pagina curentă 
        (HomePage, ServicesPage, etc.)
      */}
      <Outlet />

    </div>
  );
}

export default App;