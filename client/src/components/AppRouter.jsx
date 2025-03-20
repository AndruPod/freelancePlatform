import React, {useContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../utils/consts.jsx";
import {Context} from "../main.jsx";

const AppRouter = () => {

    const {user} = useContext(Context);

    return (
        <Routes>
            {user._isAuth && authRoutes.map(({path, Component}) => (
                <Route key={path} path={path} element={<Component/>}/>
            ))}
            {publicRoutes.map(({path, Component}) => (
                <Route key={path} path={path} element={<Component/>} />
            ))}
        </Routes>
    );
};

export default AppRouter;