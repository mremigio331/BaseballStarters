import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './navigation/NavBar';
import Home from './pages/Home';

const BaseballStarters = () => {
    document.title = 'Baseball Starters';
    return (
        <div>
            <div style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
                <NavBar />
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
};

export default BaseballStarters;
