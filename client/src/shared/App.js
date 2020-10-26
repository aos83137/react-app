import React from 'react';
import {  
    BrowserRouter as Router,
    Switch,
    Route,
    // Link
} from 'react-router-dom';
import {Home} from '../pages';

const App=()=>{
    
    return (
        <Router>
            <Switch>
                <div>
                    <Route path="/" component={Home}/>
                    {/* <Route path="/login" component={Login}/> */}
                </div>
            </Switch>
        </Router>
    );
}

export default App;