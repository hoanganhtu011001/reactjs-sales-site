import { Component } from "react";
import AddProd from './AddProd'
import ProdList from './ProdList'
import axios from 'axios';
export default class ProdManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitalert: false,
            openAddProd: false,
            addable: true,
            prodList: [],
            txtprodid: '',
            txtprodname: '',
            txtprodprice: 0,
            txturl: '',
            cbocate: '-1',
            errAlert: false,
            catelist: []
        }
    }

    componentDidMount = () => {
        axios({
            method: 'GET',
            url: "https://60122a3f5fffd80017089462.mockapi.io/v1/product"
        }).then((response) => {
            const { data } = response;
            this.setState({
                prodList: [...data]
            })
        }).catch((erro) => {
            console.log(erro, erro.response)
        });

        axios({
            method: 'GET',
            url: "https://60122a3f5fffd80017089462.mockapi.io/v1/cate?status=true"
        }).then((response) => {
            const { data } = response;
            this.setState({
                catelist: [...data],
            })
        }).catch((erro) => {
            console.log(erro, erro.response)
        })
    }

    addProd = (prod) => {
        axios.post('https://60122a3f5fffd80017089462.mockapi.io/v1/product', prod)
            .then((response) => {
                var { data } = response
                var { prodList } = this.state
                prodList.push(data)
                this.setState({
                    prodList: [...prodList]
                })
                console.log(prod)
            })
            .catch((erro) => {
                console.log(erro, erro.response)
            })
    }

    editProd = (prod) => {
        axios.put('https://60122a3f5fffd80017089462.mockapi.io/v1/product/' + prod.id, prod)
            .then((res) => {
                var { data } = res;
                var { prodList } = this.state;
                this.setState({
                    prodList: prodList.map((prodItem, index) => {
                        return prodItem.id === data.id ? data : prodItem
                    })
                })
            })
            .catch((err) => {
                console.log(err, err.response)
            })
    }

    deleteProd = (prod) => {
        axios.delete('https://60122a3f5fffd80017089462.mockapi.io/v1/product/' + prod.id)
            .then((res) => {
                var { prodList } = this.state
                this.setState({
                    prodList: prodList.filter((prodItem, index) => {
                        return prodItem.id === prod.id ? false : true
                    })
                })
            })
            .catch((err) => {
                console.warn(err, err.response)
            })
    }

    onClickAddMoreProd = () => {
        this.setFormStatus(true);
        this.clearForm();
        this.setAddAble(true);
        this.setSubmitAlert(false)
        this.setErrAlert(false)
    }

    setFormStatus = (status) => {
        this.setState({
            openAddProd: status
        })
    }

    setFormData = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    setAddAble = (addable) => {
        this.setState({
            addable: addable
        })
    }

    showDetail = (prod) => {
        this.setState({
            addable: false,
            txtprodid: prod.id,
            txtprodname: prod.name,
            txtprodprice: prod.price,
            txturl: prod.url,
            cbocate: prod.cateId,
            submitalert: false,
            errAlert: false
        })
    }

    clearForm = () => {
        this.setState({
            txtprodid: '',
            txtprodname: '',
            txtprodprice: 0,
            txturl: '',
            cbocate: '-1'
        })
    }

    setSubmitAlert = (status) => {
        this.setState({
            submitalert: status
        })
    }

    setErrAlert = (err) => {
        this.setState({
            errAlert: err
        })
    }

    render() {
        var { prodList, catelist, submitalert, errAlert, addable, openAddProd, txtprodid, txtprodname, txtprodprice, txturl, cbocate } = this.state
        var element = openAddProd ? <AddProd
            addProd={this.addProd}
            setFormData={this.setFormData}
            editProd={this.editProd}
            setFormStatus={this.setFormStatus}
            clearForm={this.clearForm}
            setSubmitAlert={this.setSubmitAlert}
            setErrAlert={this.setErrAlert}
            txtprodid={txtprodid}
            txtprodname={txtprodname}
            txtprodprice={txtprodprice}
            txturl={txturl}
            cbocate={cbocate}
            addable={addable}
            submitalert={submitalert}
            errAlert={errAlert}
            catelist={catelist}
        /> : ''
        return (
            <div className='row mt-5 ms-5 me-5'>
                <div className='col-sm-4'>
                    {element}
                </div>
                <div className={this.state.openAddProd ? 'col-sm-8' : ''}>
                    <button onClick={this.onClickAddMoreProd} className='btn btn-primary'>Thêm sản phẩm</button>
                    <ProdList
                        editProd={this.editProd}
                        setFormStatus={this.setFormStatus}
                        showDetail={this.showDetail}
                        deleteProd={this.deleteProd}
                        prodList={prodList}
                        catelist={catelist}
                    />
                </div>
            </div>
        )
    }
}