import { Component } from "react";

export default class CartPay extends Component {
    
    render() {
        var {totalBill} = this.props
        return (
            <div className="table-responsive m-5">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Tổng tiền</th>
                            <th>{totalBill} vnđ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-center'>
                            <th colSpan='2'><button className='btn btn-warning' style={{backgroundColor:'#F05023', color:'white'}}>Pay now</button></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}