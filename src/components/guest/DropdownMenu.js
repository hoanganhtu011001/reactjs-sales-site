import { Component } from "react";
import { Link } from 'react-router-dom'
export default class DropdownMenu extends Component {

    setClothing = () => {
        var {clothing} = this.props
        this.props.setClothing(clothing)
    }
    
    render() {
        var {clothing} = this.props
        return (
                <li onClick={this.setClothing}><Link to={'/Shop'} className="dropdown-item">{clothing.name}</Link></li>
        )
    }
}