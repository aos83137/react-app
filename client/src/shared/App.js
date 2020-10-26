import React, { Component } from 'react';
import {  
    BrowserRouter as Router,
    // Switch,
    Route,
    // Link
} from 'react-router-dom';
import {Home,About} from '../pages';

const App=()=>{
    
    return (
        <Router>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
            </div>
        </Router>
    );
}

export default App;