import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const style = {
  background: 'green',
  color: '#000000',
  padding: '2%',
};

const navLinkStyle = {
  color: 'white', // Cambia el color de fuente a azul
  // Agrega otros estilos según tus preferencias
};

function Navigation() {
  return (
    <Navbar expand="lg" strong style={style}>
      <Container>
        <Navbar.Brand href="#home" style={navLinkStyle}>HOME</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" style={navLinkStyle}>Reportes</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
