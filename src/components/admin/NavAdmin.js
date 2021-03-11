import { Component } from "react";
import { Link } from 'react-router-dom'
export default class NavAdmin extends Component {
    
    onLogOut = (event) => {
        event.preventDefault()
        this.props.affterLogin(false)
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">ManagerPage</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Trang chủ</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Quản lý
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><Link to={'/product'} className="dropdown-item">Sản phẩm</Link></li>
                                    <li><Link to={'/category'} className="dropdown-item">Danh mục</Link></li>
                                    <li><Link to={'/order'} className="dropdown-item">Order</Link></li>
                                </ul>
                            </li>
                            <li onClick={this.onLogOut} className="nav-item"><Link className="nav-link active" to={'/login'}>Đăng xuất</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
} 