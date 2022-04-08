import React, { Component } from 'react';
import {Navigate} from "react-router-dom"
class Logout extends Component {

    render() {
        

        return (
            <div className='logout'>
                <Navigate to={`/login`}/>
            </div>
        );
    }

}

export default Logout;