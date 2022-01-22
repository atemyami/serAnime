import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import App from '../App';
import Auth from './Auth';

function Routs(){
    return(
        <Router>

        <Routes>
          <Route exact path="/" element={<App/>}/>
          <Route   path="/register" element={<Auth/>}/>        
        </Routes>
    
      </Router>
    )
}
export default Routs;