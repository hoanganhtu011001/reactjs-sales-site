import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Component } from "react";
import ProdItem from "./ProdItem";

export default class ProdList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterdeleted: false,
            rowsperpage: 5,
            page: 0,
            filtername: '',
            filterprice: '0',
            filtercate:'-1'
        }
    }

    onClickRecycleBin = () => {
        this.setState({
            filterdeleted: true
        })
    }

    onClickListProd = () => {
        this.setState({
            filterdeleted: false
        })
    }

    nextPage = () => {
        var { prodList, catelist } = this.props;
        var { filterdeleted, filtername, filterprice, filtercate } = this.state
        var listidcate = catelist.map(val => {
            return val.id
        })
        prodList = prodList
        .filter(prodItem => {
            return listidcate.indexOf(prodItem.cateId) !== -1
        })
        .filter((prodItem) => {
            return prodItem.deleted == filterdeleted ? true : false
        })

        if (filtername) {
            prodList = prodList.filter((prodItem, index) => {
                return prodItem.name.toLowerCase().indexOf(filtername.toLowerCase()) !== -1
            })
        }

        prodList = prodList.filter((prodItem, index) => {
            var price = Number(prodItem.price)
            if(filterprice === '0') {
                return true
            }
            else if (filterprice === '1') {
                return price >= 100000 && price <= 300000
            }
            else if (filterprice === '2') {
                return price > 300000 && price <= 500000
            }
            else {
                return price > 500000
            }
        })

        prodList = prodList.filter((prodItem, index) => {
            if(filtercate === '-1') {
                return true
            }
            return prodItem.cateId === filtercate
        })


        if ((this.state.page + 1) * this.state.rowsperpage >= prodList.length) {
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

    onFilter = (event) => {
        var { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        var { prodList, catelist } = this.props;
        var { filterdeleted, rowsperpage, page, filtername, filterprice, filtercate } = this.state
        var listidcate = catelist.map(val => {
            return val.id
        })
        prodList = prodList
        .filter(prodItem => {
            return listidcate.indexOf(prodItem.cateId) !== -1
        })
        .filter((prodItem) => {
            return prodItem.deleted == filterdeleted ? true : false
        })

        if (filtername) {
            prodList = prodList.filter((prodItem, index) => {
                return prodItem.name.toLowerCase().indexOf(filtername.toLowerCase()) !== -1
            })
        }

        prodList = prodList.filter((prodItem, index) => {
            var price = Number(prodItem.price)
            if(filterprice === '0') {
                return true
            }
            else if (filterprice === '1') {
                return price >= 100000 && price <= 300000
            }
            else if (filterprice === '2') {
                return price > 300000 && price <= 500000
            }
            else {
                return price > 500000
            }
        })

        prodList = prodList.filter((prodItem, index) => {
            if(filtercate === '-1') {
                return true
            }
            return prodItem.cateId === filtercate
        })

        var element = prodList.slice(rowsperpage * page, rowsperpage * page + rowsperpage).map((prodItem, index) => {
            return <ProdItem key={index}
                setFormStatus={this.props.setFormStatus}
                showDetail={this.props.showDetail}
                editProd={this.props.editProd}
                deleteProd={this.props.deleteProd}
                prodItem={prodItem}
                filterdeleted={filterdeleted}
            />
        })
        var cboCateData = catelist.map((cateItem, index) => {
            return <option key = {index} value = {cateItem.id}>{cateItem.name}</option>
        })
        return (
            <div className="card mt-3 mb-3">
                <div className="card-header" style={{ float: 'left' }}>
                    <div style={{ width: '50%', float: 'left' }}>{filterdeleted ? 'Thùng rác' : 'Danh sách sản phẩm'}</div>
                    <div className='text-end' style={{ width: '50%', float: 'left' }}>
                        <button className={filterdeleted ? 'unenable' : 'btn bi bi-trash'} type="button" onClick={this.onClickRecycleBin} />
                        <button className={filterdeleted ? 'btn bi bi-table' : 'unenable'} type="button" onClick={this.onClickListProd} />
                    </div>
                </div>
                <div className="card-body">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className='text-center'>Id</TableCell>
                                    <TableCell className='text-center'>Sản phẩm</TableCell>
                                    <TableCell className='text-center'>Giá</TableCell>
                                    <TableCell className='text-center'>Loại</TableCell>
                                    <TableCell className='text-center'>
                                        Hành động
                            </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className='text-center'></TableCell>
                                    <TableCell className='text-center'><input className='form-control' type='text' placeholder='tìm kiếm theo tên...' name='filtername' onChange={this.onFilter}></input></TableCell>
                                    <TableCell className='text-center'>
                                        <select className="form-control" aria-label="Default select example" name = 'filterprice' value={filterprice} onChange={this.onFilter}>
                                            <option value={0}>Tất cả</option>
                                            <option value={1}>{"100.000 > 300.000"}</option>
                                            <option value={2}>{"300.000 > 500.000"}</option>
                                            <option value={3}>{"> 500.000"}</option>
                                        </select>
                                    </TableCell>
                                    <TableCell className='text-center'>
                                    <select className="form-control" aria-label="Default select example" name = 'filtercate' value={filtercate} onChange={this.onFilter}>
                                            <option value={-1}>Tất cả</option>
                                            {cboCateData}
                                    </select>
                                    </TableCell>
                                    <TableCell className='text-center'></TableCell>
                                </TableRow>
                                {element}
                            </TableBody>
                        </Table>
                        <nav aria-label="Page navigation example" className='mt-3'>
                            <ul className="pagination">
                                <li className="page-item" onClick={this.prevPage}><a className="page-link">Trang trước</a></li>
                                <li className="page-item"><a className="page-link">{page + 1}</a></li>
                                <li className="page-item" onClick={this.nextPage}><a className="page-link">Trang sau</a></li>
                            </ul>
                        </nav>
                    </TableContainer>
                </div>
            </div>
        )
    }
}