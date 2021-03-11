import { Component } from "react"
import { Route, Switch } from "react-router-dom"
import NavTop from './NavTop'
import Login from './Login';
import HomePage from './HomePage';
import ShoppingCart from './ShoppingCart';
import Shop from './Shop';
import ShopItemInfo from './ShopItemInfo';
import axios from 'axios'

export default class Guest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shopiteminfo: {},
            shoppingCart: localStorage && localStorage.getItem('ShoppingCart') ? JSON.parse(localStorage.getItem('ShoppingCart')) : [],
            clothing: -1,
            catelist: [],
        };
    }

    componentDidMount = () => {
        axios({
            method: 'GET',
            url: "https://60122a3f5fffd80017089462.mockapi.io/v1/cate?status=true"
        }).then((response) => {
            const { data } = response;
            this.setState({
                catelist: [...data]
            })
        }).catch((erro) => {
            console.log(erro, erro.response)
        })
    }

    setShopItemInfo = (shopiteminfo) => {
        this.setState({
            shopiteminfo: shopiteminfo
        })
    }

    addToCart = (newcartitem) => {
        var shoppingCart = this.state.shoppingCart;
        shoppingCart.push(newcartitem)
        this.setState({
            shoppingCart: [...shoppingCart]
        })
        localStorage.setItem('ShoppingCart', JSON.stringify(shoppingCart))
    }
 
    updateCart = (updatecartitem) => {
        var shoppingCart = this.state.shoppingCart;
        var updateCart = shoppingCart.map((cartitem, index) => {
            if (cartitem.shopitem.id == updatecartitem.shopitem.id) {
                updatecartitem.qty = Number(cartitem.qty) + Number(updatecartitem.qty);
                return updatecartitem
            }
            else {
                return cartitem
            }
        })
        this.setState({
            shoppingCart: [...updateCart]
        })
        localStorage.setItem('ShoppingCart', JSON.stringify(shoppingCart))
    }

    deleteCart = (deletecart) => {
        var shoppingCart = this.state.shoppingCart;
        shoppingCart.splice(shoppingCart.indexOf(deletecart), 1)
        this.setState({
            shoppingCart: [...shoppingCart]
        })
        localStorage.setItem('ShoppingCart', JSON.stringify(shoppingCart))
    }

    setClothing = (clothing) => {
        this.setState({
            clothing: clothing
        })
    }
    
    render() {
        return (
            <div>
                <NavTop setClothing={this.setClothing} catelist={this.state.catelist}></NavTop>
                <Switch>
                    <Route exact path='/'>
                        <HomePage></HomePage>
                    </Route>
                    <Route exact path='/Shop'>
                        <Shop clothing={this.state.clothing} catelist={this.state.catelist} setShopItemInfo={this.setShopItemInfo}></Shop>
                    </Route>
                    <Route exact path='/Sizechart'>
                        <p className='h3 ms-5 mt-3' style={{ color: '#F05023' }}>Size chart</p>
                        <img className='img-fluid' src='https://file.hstatic.net/1000344185/file/size-chart-web_834fc4c2d12d43d68e55bb40dbfd8b13_1024x1024.jpg'></img>
                    </Route>
                    <Route exact path='/ShoppingCart'>
                        <ShoppingCart updateCart={this.updateCart} deleteCart={this.deleteCart} shoppingCart={this.state.shoppingCart}></ShoppingCart>
                    </Route>
                    <Route exact path='/ShopItemInfo'>
                        <ShopItemInfo shopiteminfo={this.state.shopiteminfo} addToCart={this.addToCart} updateCart={this.updateCart} shoppingCart={this.state.shoppingCart}></ShopItemInfo>
                    </Route>
                    <Route exact path='/login'>
                        <Login affterLogin={this.props.affterLogin} />
                    </Route>
                </Switch>
            </div>
        )
    }
}