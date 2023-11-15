import { NavLink, useLocation  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import styles from './Navigation.module.css'
function Navigation() {
  const location = useLocation();

  return (
    <nav>
      <ButtonGroup size="lg" aria-label="Basic example">
        <NavLink to="/Categorias" className={styles.option} >
           <Button 
            variant={location.pathname === '/Categorias' ? "dark" : "light"}
          >
            Categorias
          </Button>
        </NavLink>
        <NavLink to="/Productos" className={styles.option}>
          <Button 
            variant={location.pathname === '/Productos' ? "dark" : "light"}
          >
            Productos
          </Button>
        </NavLink>
        <NavLink to="/Empleados" className={styles.option}>
          <Button 
            variant={location.pathname === '/Empleados' ? "dark" : "light"}
          >
            Empleados
          </Button>
        </NavLink>
      </ButtonGroup>
    </nav>
  );
}

export default Navigation;