import { Component } from "react"
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
export default class ShopItem extends Component {

    constructor(props) {
        super(props);
    }

    setShopItemInfo = () => {
        this.props.setShopItemInfo(this.props.shopitem)
    }

    render() {
        var { shopitem } = this.props;
        return (
            <div className='col-sm-3 mt-3'>
                <div>
                    <Link onClick={this.setShopItemInfo} to={'/shopiteminfo'}><img src={shopitem.url} className="card-img-top" alt={shopitem.url} /></Link>
                    <div className="card-body text-center">
                        <h5 className="card-title" style={{ color: '#F05023' }} >{shopitem.name}</h5>
                        <p className="card-text">{shopitem.price} vnd</p>
                    </div>
                </div>
            </div>
        )
    }
}

ShopItem.propTypes = {
    shopitem: PropTypes.object
}