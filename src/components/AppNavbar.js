import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function AppNavbar() {

	const { user } = useContext(UserContext);

	return (
		<Navbar bg="dark" data-bs-theme="dark">
	        <Container>
	         	<Navbar.Brand>Fitness</Navbar.Brand>
	          	<Nav className="me-auto">
	          		{(user.token !== null) ?
	          			<>
	          			<Nav.Link as={NavLink} to="/workouts" exact="true">Workouts</Nav.Link>
	          			<Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
	          			</>
	          			:
	          			<>
	          			<Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
	          			<Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
	          			</>
	          		}
	          	</Nav>
	        </Container>
	    </Navbar>
	)
}

export default AppNavbar;