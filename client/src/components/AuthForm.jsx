import React, {useContext, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useMutation} from "@apollo/client";
import {LOGIN, REGISTER} from "../mutation/user.jsx";
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE} from "../routes.jsx";

const AuthForm = observer(() => {

    const {user} = useContext(Context);

    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const navigate = useNavigate();

    const [register] = useMutation(REGISTER);
    const [login] = useMutation(LOGIN);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (e) => {
        e.preventDefault();

        let res;

        if(isLogin) {
            res = await login({
                variables: {
                    input: {
                        username,
                        password
                    }
                }
            })
                // .then(() => {
            localStorage.setItem('token', res.data.register.token);
            // }).catch((e) => {alert(e.message)});
        } else {
            res = await register({
                variables: {
                    input: {
                        username,
                        password,
                    }
                }
            })
                // .then(() => {
            localStorage.setItem('token', res.data.register.token);
            // }).catch((e) => {alert(e.message)});
        }
        user.setIsAuth(true);
        user.setUser(res.data.register.token);
        // console.log(user);
        navigate(HOME_ROUTE);
    }

    return (
        <Container className="pt-5">
            <Form className="auth__form">
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control onChange={(e) => setUsername(e.target.value)} name="username" type="text" placeholder="username" />
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control onChange={(e) => setPassword(e.target.value)} name="password" type="text" placeholder="password" />
                <Button onClick={submit} variant="primary" type="submit">Sign In</Button>
            </Form>
        </Container>
    );
});

export default AuthForm;