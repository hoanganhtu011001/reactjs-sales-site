import { Component } from "react";
import logo from './../../../src/logo.svg'
import axios from "axios";
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            txtusername: '',
            txtpassword: '',
            loginAlert: true
        }
    }

    onChangeHand = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    onLogin = (event) => {
        event.preventDefault();
        axios({
            method: 'GET',
            url: "https://60122a3f5fffd80017089462.mockapi.io/v1/user?username=" + this.state.txtusername + "&password=" + this.state.txtpassword
        }).then((response) => {
            var { data } = response
            if (data.length == 1) {
                if (data[0].username === this.state.txtusername && data[0].password === this.state.txtpassword) {
                    this.props.affterLogin(data[0].isAdmin)
                    this.setState({
                        loginAlert: true
                    })
                }
                else {
                    this.setState({
                        loginAlert: false
                    })
                }
            }
            else {
                this.setState({
                    loginAlert: false
                })
            }
        }).catch((erro) => {
            console.log(erro, erro.response)
        });
    }
    
    render() {
        return (
            <div className='text-center mt-5 row'>
                <div className='col-sm-4'></div>
                <div className='form-signin col-sm-4'>
                    <form onSubmit={this.onLogin} style={{ width: '60%', margin: '0px auto' }}>
                        <img className="mb-4 App-logo" src={logo} alt="" width="100" height="100"/>
                        <h1 className="h3 mb-3 fw-normal">Đăng nhập</h1>
                        <label className="visually-hidden">Tên đăng nhập</label>
                        <input onChange={this.onChangeHand} type="text" className="form-control mb-3" name='txtusername' placeholder="Tên đăng nhập" />
                        <label className="visually-hidden">Mật khẩu</label>
                        <input onChange={this.onChangeHand} type="password" className="form-control" name='txtpassword' placeholder="Mật khẩu" />
                        <div className="checkbox mt-3 mb-3">
                            <label>
                                <input type="checkbox" value="remember-me" /> Nhớ mật khẩu
                            </label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Đăng nhập</button>
                        <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
                    </form>
                    <div className={this.state.loginAlert ? "unenable" : "alert alert-danger mt-3"} style={{ width: '60%', margin: '0px auto' }} role="alert">
                        Tên đăng nhập hoặc mật khẩu không chính xác
                    </div>
                </div>
                <div className='col-sm-4'></div>
            </div>
        )
    }
}