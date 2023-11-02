import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { Route, Routes } from 'react-router-dom';
import { Login } from '../../pages/login/login';
import { Home } from '../../pages/home/home';

function App() {

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.burgers}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </div >
  );
}

export default App;
