import { Component } from "react";
import CartList from "./CartList";
import CartPay from "./CartPay";
import { Link } from 'react-router-dom'
export default class ShoppingCart extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var totalBill = 0;
        var { shoppingCart } = this.props;

        shoppingCart.map((cartitem, index) => {
            totalBill = totalBill + cartitem.qty * Number(cartitem.shopitem.price);
        })

        return (
            shoppingCart.length > 0 ?
                <div className='row'>
                    <p className='h3 m-5' style={{ color: '#F05023' }}>Giỏ hàng</p>
                    <div className='col-xl-7'>
                        <CartList updateCart={this.props.updateCart} deleteCart={this.props.deleteCart} shoppingCart={this.props.shoppingCart}></CartList>

                    </div>
                    <div className='col-xl-5'><CartPay totalBill={totalBill}></CartPay></div>
                </div>
                :
                <div className="alert alert-primary m-5" role="alert">
                    Bạn chưa thêm sản phẩm nào !
                    <Link to='/Shop'>Thêm ngay</Link>
                </div>
        )
    }
}