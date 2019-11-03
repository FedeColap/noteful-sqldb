import React, {Component} from 'react'
import ApiContext from '../ApiContext';
import { Link  } from 'react-router-dom'


class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true        
        };
    }
    
    render () {
        if (this.state.hasError) {      
            return (
                <div>
                    <h2>Could not display this element </h2>
                    <p>
                        <Link to={'/'}>
                            Go to the home page
                        </Link>
                    </p>
                </div>
            );
        } return this.props.children;
    }
}


 
export default ErrorBoundary;