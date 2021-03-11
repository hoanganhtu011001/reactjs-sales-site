import { Component } from "react";
import AddCate from "./AddCate";
import CateList from "./CateList";
import axios from 'axios'
export default class CategoryManager extends Component {

    constructor(props) {
        super(props)
        this.state = {
            openAddCate: false,
            addCateable: true,
            txtcateid: '',
            txtcatename: '',

            ssfaddcate: false,
            catelist: [],
            errAlert: false
        }
    }

    componentDidMount = () => {
        axios({
            method: 'GET',
            url: "https://60122a3f5fffd80017089462.mockapi.io/v1/cate/"
        }).then((response) => {
            const { data } = response;
            this.setState({
                catelist: [...data]
            })
        }).catch((erro) => {
            console.log(erro, erro.response)
        })
    }

    addCate = (cate) => {
        axios.post('https://60122a3f5fffd80017089462.mockapi.io/v1/cate', cate)
            .then((response) => {
                var { data } = response
                var { catelist } = this.state
                catelist.push(data)
                this.setState({
                    catelist: [...catelist]
                })
            })
            .catch((erro) => {
                console.log(erro, erro.response)
            })
    }

    editCate = (cate) => {
        axios.put('https://60122a3f5fffd80017089462.mockapi.io/v1/cate/' + cate.id, cate)
            .then((response) => {
                var { data } = response
                var { catelist } = this.state
                this.setState({
                    catelist: catelist.map((cateitem, index) => {
                        return cateitem.id === data.id ? data : cateitem
                    })
                })
                console.log(data)
            })
            .catch((erro) => {
                console.log(erro, erro.response)
            })
    }

    deleteCate = (cate) => {
        var url = 'https://60122a3f5fffd80017089462.mockapi.io/v1/cate/' + cate.id
        axios.delete(url)
            .then((response) => {
                var catelist = this.state.catelist.filter((cateitem, index) => {
                    return cate.id === cateitem.id ? false : true
                })
                this.setState({
                    catelist: [...catelist]
                })
            })
            .catch((erro) => {
                console.log(erro, erro.response)
            })
    }

    openAddCate = () => {
        this.setState({
            openAddCate: true,
            ssfaddcate: false
        })
    }

    closeAddCate = () => {
        this.setState({
            openAddCate: false
        })
    }

    onClickAddMoreCate = () => {
        this.openAddCate()
        this.setAddCate(true)
        this.clearForm();
        this.setSsfaddcate(false);
        this.setErrAlert(false)
    }

    setAddCate = (addCateable) => {
        this.setState({
            addCateable: addCateable
        })
    }

    onChangeForm = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    showDetail = (cate) => {
        this.setState({
            txtcateid: cate.id,
            txtcatename: cate.name,
            ssfaddcate: false,
            errAlert: false,
        })
    }

    clearForm = () => {
        this.setState({
            txtcateid: '',
            txtcatename: '',
        })
    }

    setSsfaddcate = (ssf) => {
        this.setState({
            ssfaddcate: ssf
        })
    }

    setErrAlert = (err) => {
        this.setState({
            errAlert: err,
        })
    }

    render() {
        var addCate = this.state.openAddCate ? <AddCate
            ssfaddcate={this.state.ssfaddcate}
            setSsfaddcate={this.setSsfaddcate}
            closeAddCate={this.closeAddCate}
            onChangeForm={this.onChangeForm}
            editCate={this.editCate}
            addCate={this.addCate}
            setErrAlert={this.setErrAlert}
            addCateable={this.state.addCateable}
            txtcateid={this.state.txtcateid}
            txtcatename={this.state.txtcatename}
            catelist={this.state.catelist}
            errAlert={this.state.errAlert}
        /> : ''
        return (
            <div className='row mt-5 ms-5 me-5'>
                <div className='col-sm-4'>
                    {addCate}
                </div>
                <div className={this.state.openAddCate ? 'col-sm-8' : ''}>
                    <button onClick={this.onClickAddMoreCate} className='btn btn-primary'>Thêm danh mục</button>
                    <CateList
                        setAddCate={this.setAddCate}
                        showDetail={this.showDetail}
                        openAddCate={this.openAddCate}
                        catelist={this.state.catelist}
                        deleteCate={this.deleteCate}
                        editCate={this.editCate}
                    ></CateList>
                </div>
            </div>
        )
    }
}