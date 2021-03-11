import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Component } from "react";
import CateItem from "./CateItem";

export default class CateList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsperpage: 5,
            filtername: '',
            filterStatus: true
        }
    }

    nextPage = () => {
        if ((this.state.page + 1) * this.state.rowsperpage >= this.props.catelist.length) {
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

    onClickListCate = () => {
        this.setState({
            filterStatus: true,
        })
    }

    onClickRecycleBin = () => {
        this.setState({
            filterStatus: false,
        })
    }

    render() {
        var { catelist } = this.props
        var { filtername, filterStatus } = this.state

        catelist = catelist.filter((cateItem, index) => {
            return cateItem.status === filterStatus ? true : false
        })

        if (filtername) {
            catelist = catelist.filter((cate, index) => {
                return cate.name.toLowerCase().indexOf(filtername.toLowerCase()) !== -1
            })
        }
        var { page, rowsperpage } = this.state
        var element = catelist.slice(page * rowsperpage, page * rowsperpage + rowsperpage).map((cateitem, index) => {
            return (
                <CateItem key={index}
                    setAddCate={this.props.setAddCate}
                    showDetail={this.props.showDetail}
                    openAddCate={this.props.openAddCate}
                    deleteCate={this.props.deleteCate}
                    editCate={this.props.editCate}
                    cateitem={cateitem}
                    filterStatus={filterStatus}
                ></CateItem>
            )
        })
        return (
            <div className="card mt-3 mb-3">
                <div className="card-header">
                    <div style={{ width: '50%', float: 'left' }}>{filterStatus ? 'Danh sách danh mục' : 'Thùng rác'}</div>
                    <div className='text-end' style={{ width: '50%', float: 'left' }}>
                        <button className={filterStatus ? 'btn bi bi-trash' : 'unenable'} type="button" onClick={this.onClickRecycleBin} />
                        <button className={filterStatus ? 'unenable' : 'btn bi bi-table'} type="button" onClick={this.onClickListCate} />
                    </div>
                </div>
                <div className="card-body">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className='text-center'>Id</TableCell>
                                    <TableCell className='text-center'>Tên danh mục</TableCell>
                                    <TableCell className='text-center'>Trạng thái</TableCell>
                                    <TableCell className='text-center'>
                                        Hành động
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className='text-center'></TableCell>
                                    <TableCell className='text-center'><input onChange={this.onFilter} className='form-control' type='text' name='filtername' placeholder='tìm kiếm theo tên...'></input></TableCell>
                                    <TableCell className='text-center'>
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