import { Component } from "react";
import { Link } from 'react-router-dom'
import DropdownMenu from "./DropdownMenu";


export default class NavTop extends Component {

    setClothing = () => {
        this.props.setClothing(-1)
    }
    
    render() {
        var {catelist} = this.props
        var element = catelist.map((clothing, index) => {
            return <DropdownMenu setClothing={this.props.setClothing} key={index} clothing={clothing} />
        })
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">ReactJS</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link active" to={'/'}>Trang chủ</Link></li>
                            <li className="nav-item" onClick={this.setClothing}><Link className="nav-link active" to={'/Shop'}>Tất cả sản phẩm</Link></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle active" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Danh mục
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {element}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page">Liên hệ</a>
                            </li>
                            <li className="nav-item"><Link className="nav-link active" to={'/Sizechart'}>Bảng size</Link></li>
                            <li className="nav-item"><Link className="nav-link active" to={'/ShoppingCart'}>Giỏ hàng</Link></li>
                            
                            <li className="nav-item">
                            <Link className="nav-link active" to={'/login'}>Đăng nhập</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}