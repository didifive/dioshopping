import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/home';
import Mensagens from './Pages/mensagens';

const MainRoutes = () => {
    return(
        <Routes>
            <Route
                path="/"
                element={<HomePage />}
            />
            <Route
                path="/mensagens"
                element={<Mensagens />}
            />
        </Routes>
    )
}

export default MainRoutes;
