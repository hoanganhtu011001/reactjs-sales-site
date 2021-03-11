import { Component } from "react";

export default class CartItem extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            qty: this.props.cartItem.qty
        }
    }

    onChangeQty = (event) => {
        var qty = event.target.value
        this.setState({
            qty: qty,
        })
        var updatecartitem = {
            shopitem: this.props.cartItem.shopitem,
            qty: qty
        }
        this.props.updateCart(updatecartitem);
    }
    
    onDeleteCart = () => {
        this.props.deleteCart(this.props.cartItem)
    }
    
    render() {
        var { cartItem } = this.props
        return (
            <tr>
                <th>
                    <img src={cartItem.shopitem.url} className='rounded float-start' style={{width:'20%'}}></img>
                    <p>{ cartItem.shopitem.name }</p>
                </th>
                <th> { cartItem.shopitem.price } vnđ</th>
                <th><input onChange = {this.onChangeQty} type="number" className="form-control" value={this.state.qty}/></th>
                <th>{this.state.qty*Number(cartItem.shopitem.price)} vnđ</th>
                <th><button onClick={this.onDeleteCart} className='btn btn-warning' style={{backgroundColor:'#F05023', color:'white'}}>Remove</button></th>
            </tr>
        )
    }
}