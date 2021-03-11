import { Component } from "react";
import { Link } from "react-router-dom";

export default class ShopItemInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
            open: false
        }
    }

    onAddToCart = () => {
        var newcartitem = [];
        newcartitem = {
            shopitem: this.props.shopiteminfo,
            qty: this.state.qty
        }
        var shoppingCart = this.props.shoppingCart;
        var check = -1;
        shoppingCart.map((cartItem, index) => {
            if (cartItem.shopitem.id == newcartitem.shopitem.id) {
                check = index;
                return;
            }
        })
        check == -1 ? this.props.addToCart(newcartitem) : this.props.updateCart(newcartitem)
        this.setState({
            open: true
        })
    }

    onChangeQty = (event) => {
        this.setState({
            qty: event.target.value
        })
    }

    render() {
        return (
            <div className='row  m-5'>
                <div className='col-sm-4'>
                    <img className='img-fluid' src={this.props.shopiteminfo.url}></img>
                </div>
                <div className='col-sm-6 mt-5'>
                    <p className='h3' style={{ color: '#F05023' }}>{this.props.shopiteminfo.name}</p>
                    <p className='h4'>{this.props.shopiteminfo.price} vnd</p>
                    <input onChange={this.onChangeQty} type="number" className="form-control mt-3" style={{ width: '20%' }} value={this.state.qty} />
                    <button className='btn btn-warning mt-5' onClick={this.onAddToCart} style={{ backgroundColor: '#F05023', color: 'white' }}>Thêm vào giỏ</button>
                    {/* <div className={this.state.open === true ? "alert alert-primary me-10 mt-5" : "unenable"} role="alert">
                        Đã thêm!<Link to={'/ShoppingCart'}>Xem giỏ hàng?</Link>
                    </div> */}
                    <div className={this.state.open === true ?"alert alert-primary alert-dismissible fade show me-10 mt-5" : 'unenable'} role="alert">
                        <strong>Đã thêm vào giỏ hàng!</strong> <Link to={'/ShoppingCart'}>Xem giỏ hàng?</Link>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
                <p className='h3'>Size chart</p>
                <img className='col-sm-6' src='https://file.hstatic.net/1000344185/file/size-chart-web_834fc4c2d12d43d68e55bb40dbfd8b13_1024x1024.jpg'></img>
            </div>
        )
    }
}