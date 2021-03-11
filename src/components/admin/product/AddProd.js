import { Component } from "react";
import axios from 'axios'
export default class AddProd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            catelist: []
        }
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

    onSubmitHand = (event) => {
        event.preventDefault();
        var { addable, txtprodid, cbocate, txtprodname, txturl, txtprodprice } = this.props
        var prod = {
            id: txtprodid,
            cateId: cbocate === '-1' ? this.state.catelist[0].id : cbocate,
            name: txtprodname,
            price: txtprodprice,
            url: txturl,
            deleted: false
        }
        if (txtprodname === '' || txtprodprice === '' || Number(txtprodprice) <= 0 || isNaN(txtprodprice) ) {
            this.props.setErrAlert(true);
            this.props.setSubmitAlert(false);
        }
        else {
            addable ? this.props.addProd(prod) : this.props.editProd(prod)
            this.props.setSubmitAlert(true);
            this.props.setErrAlert(false);
        }

    }

    onChange = (event) => {
        var name = event.target.name;
        var value = ''
        if (event.target.type === 'file') {
            console.log('upimage')
            var file = event.target.files
            var reader = new FileReader()
            reader.readAsDataURL(file[0])
            reader.onload = (e) => {
                this.props.setFormData(name, e.target.result)
            }
        } else {
            value = event.target.value
        }
        console.log(value)
        this.props.setFormData(name, value)
    }

    onClose = () => {
        this.props.setFormStatus(false)
        this.props.clearForm()
    }

    render() {
        var { txtprodid, addable, cbocate, txtprodname, txturl, txtprodprice, submitalert, errAlert } = this.props
        var { catelist } = this.state
        var element = catelist.map((cateitem, index) => {
            return <option key={index} value={cateitem.id}>{cateitem.name}</option>
        })
        return (
            <div>
                <div className='card mb-3'>
                    <div className='card-body'>
                        <h5 className="card-title">{addable ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            {addable ? 'Thêm sản phẩm' : 'Cập nhật thông tin sản phẩm'}
                        </h6>
                        <form onSubmit={this.onSubmitHand}>
                            <div className="mb-3">
                                <label className="form-label">Id</label>
                                <input disabled type="text" className="form-control"
                                    value={txtprodid}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tên sản phẩm</label>
                                <input type="text" className="form-control"
                                    onChange={this.onChange}
                                    name='txtprodname'
                                    value={txtprodname}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Giá</label>
                                <input type="text" className="form-control"
                                    onChange={this.onChange}
                                    name='txtprodprice'
                                    value={txtprodprice}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Loại</label>
                                <select className="form-select"
                                    onChange={this.onChange}
                                    name='cbocate'
                                    value={cbocate}
                                >
                                    {element}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Chọn ảnh</label>
                                <input onChange={this.onChange} name='txturl' className="form-control" type="file" id="formFile" />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '75px' }}>Lưu</button>
                            <button type="reset" onClick={this.onClose} className="btn btn-danger ms-3" style={{ width: '75px' }}>Hủy</button>
                        </form>
                    </div>
                </div>
                <div className={submitalert ? "alert alert-primary" : "unenable"} role="alert">
                    {addable ? 'Đã thêm!' : 'Đã cập nhật!'}
                </div>
                <div className={ errAlert ? "alert alert-danger" : "unenable"} role="alert">
                    Thông tin không hợp lệ
                </div>
            </div>
        )
    }
}