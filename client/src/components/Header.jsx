import React, {useContext} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Context} from "../main.jsx";
import {observer} from "mobx-react-lite";
import {HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE} from "../routes.jsx";
import {useNavigate} from "react-router-dom";

const Header = observer(() => {

    const {user} = useContext(Context);

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('token');
        user.setIsAuth(false);
        user.setUser(null);
        navigate(HOME_ROUTE);
    }

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>PET</Navbar.Brand>
                    <Nav>
                        {user.isAuth ?
                            <>
                                <Nav.Link to="/">Offers</Nav.Link>
                                <Nav.Link to="/">Profile</Nav.Link>
                                <Nav.Link onClick={logOut} to="/">Log Out</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link to="/">Offers</Nav.Link>
                                <Nav.Link to='/'>Contact us</Nav.Link>
                                <Nav.Link as={Link} to={REGISTER_ROUTE}>Sign In</Nav.Link>
                            </>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
});

export default Header;