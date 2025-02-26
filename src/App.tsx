import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
