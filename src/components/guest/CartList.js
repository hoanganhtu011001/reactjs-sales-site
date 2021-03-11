import { Component } from "react";
import CartItem from "./CartItem";

export default class CartList extends Component {
    
    render() {
        var { shoppingCart } = this.props
        var element = shoppingCart.map((cartItem, index) => {
            return <CartItem updateCart={this.props.updateCart} deleteCart={this.props.deleteCart} key = { index } cartItem = {cartItem}/>
        })
        return (
            <div className="table-responsive m-5">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tổng</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        { element }
                    </tbody>
                </table>
            </div>
        )
    }
}