import React from 'react';
import { Router,Route,Redirect,hashHistory } from 'react-router';
import FaleConosco from '../pages/FaleConosco/FaleConosco';



export default props => (
    <Router history={hashHistory}>
        
    <Route path='/faleconosco' component={FaleConosco} />

    </Router>
)