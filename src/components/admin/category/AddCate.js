import { Component } from "react";

export default class AddCate extends Component {

    constructor(props) {
        super(props);
    }

    onChangeHand = (event) => {
        var { name, value } = event.target
        this.props.onChangeForm(name, value);
    }

    onSubmitHand = (event) => {
        event.preventDefault();
        var { txtcatename, txtcateid, addCateable } = this.props
        var cate = {
            id: txtcateid,
            name: txtcatename,
            status: true
        }
        if (txtcatename === '') {
            this.props.setErrAlert(true);
            this.props.setSsfaddcate(false)
        }
        else {
            addCateable ? this.props.addCate(cate) : this.props.editCate(cate)
            this.props.setSsfaddcate(true);
            this.props.setErrAlert(false);
        }
    }

    render() {
        var { txtcatename   , txtcateid, addCateable, errAlert,ssfaddcate } = this.props
        return (
            <div>
                <div className='card mb-3'>
                    <div className='card-body'>
                        <h5 className="card-title">{addCateable ? 'Thêm danh mục' : 'Cập nhật danh mục'}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{addCateable ? 'Thêm danh mục' : 'Cập nhật thông tin danh mục'}</h6>
                        <form onSubmit={this.onSubmitHand}>
                            <div className="mb-3">
                                <label className="form-label">Id</label>
                                <input onChange={this.onChangeHand} disabled value={txtcateid} type="text" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tên danh mục</label>
                                <input onChange={this.onChangeHand} value={txtcatename} name='txtcatename' type="text" className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '75px' }}>Lưu</button>
                            <button type="reset" onClick={this.props.closeAddCate} className="btn btn-danger ms-3" style={{ width: '75px' }}>Hủy</button>
                        </form>
                    </div>
                </div>
                <div className={ssfaddcate ? "alert alert-primary" : "unenable"} role="alert">
                    {addCateable ? "Đã thêm !" : "Đã cập nhật !"}
                </div>
                <div className={errAlert ? "alert alert-danger" : "unenable"} role="alert">
                    Thông tin không hợp lệ
                </div>
            </div>
        )
    }
}