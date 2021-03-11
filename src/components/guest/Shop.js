import { Component } from "react";
import ShopItem from "./ShopItem";
import axios from 'axios'
import PropTypes from 'prop-types'
export default class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            itemperpage: 8,
            shop: [],
            filterprice: '0',
            search: ''
        }
    }

    componentDidMount = () => {
        axios({
            method: 'GET',
            url: "https://60122a3f5fffd80017089462.mockapi.io/v1/product?deleted=false"
        }).then((response) => {
            const { data } = response;
            this.setState({
                shop: [...this.state.shop, ...data]
            })
        }).catch((erro) => {
            console.log(erro, erro.response)
        });
    }

    nextPage = () => {
        if ((this.state.page + 1) * this.state.itemperpage >= this.state.shop.length) {
            return
        }
        this.setState({
            page: this.state.page + 1
        })
    }

    prevPage = () => {
        if (this.state.page === 0) {
            return
        }
        this.setState({
            page: this.state.page - 1
        })
    }

    onChange = (event) => {
        var { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        var { shop, page, itemperpage, filterprice } = this.state
        var { clothing, catelist } = this.props
        var listidcate = catelist.map(val => {
            return val.id
        })
        shop = shop.filter(shopitem => {
            if (clothing === -1) {
                return listidcate.indexOf(shopitem.cateId) !== -1
            }
            return shopitem.cateId === clothing.id
        }).filter(shopitem => {
            if (filterprice === '0') {
                return true
            }
            else if (filterprice === '1') {
                return shopitem.price >= 100000 && shopitem.price < 300000
            }
            else if (filterprice === '2') {
                return shopitem.price >= 300000 && shopitem.price < 500000
            }
            else {
                return shopitem.price >= 500000
            }
        }).filter(shopitem => {
            return shopitem.name.toLowerCase().indexOf(this.state.search) !== -1
        })

        var element = shop.slice(page * itemperpage, page * itemperpage + itemperpage).map((shopitem, index) => {
            return <ShopItem setShopItemInfo={this.props.setShopItemInfo} key={index} shopitem={shopitem} />
        })
        return (
            <div className='row m-5'>
                <div className='col-md-3'>
                    <select className="form-control" aria-label="Default select example"
                        name='filterprice'
                        onChange={this.onChange}
                        value={filterprice}
                    >
                        <option value={0}>Tất cả</option>
                        <option value={1}>{"100.000 > 300.000"}</option>
                        <option value={2}>{"300.000 > 500.000"}</option>
                        <option value={3}>{"> 500.000"}</option>
                    </select>
                </div>
                <div className = 'col-md-6'/>
                <div className='col-md-3'>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name = 'search' onChange={this.onChange}/>
                    </form>
                </div>
                {element}
                <nav aria-label="Page navigation example" className='mt-3'>
                    <ul className="pagination" style={{ width: '175px', margin: '3px auto' }}>
                        <li className="page-item" onClick={this.prevPage}><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item"><a className="page-link">{page + 1}</a></li>
                        <li className="page-item" onClick={this.nextPage}><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

Shop.propTypes = {

}
