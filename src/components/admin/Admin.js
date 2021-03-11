import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import CategoryManager from './category/CategoryManager'
import NavAdmin from './NavAdmin'
import ProdManager from "./product/ProdManager";

export default class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            catelist: [],
        }
    }

    render() {
        return (
            <div>
                <NavAdmin affterLogin={this.props.affterLogin}></NavAdmin>
                <Switch>
                    <Route exact path='/category'>
                        <CategoryManager editCate={this.editCate} deleteCate={this.deleteCate} addCate={this.addCate} catelist={this.state.catelist}></CategoryManager>
                    </Route>
                    <Route exact path='/product'>
                        <ProdManager/>
                    </Route>
                    <Route exact path='/order'>
                        
                    </Route>
                </Switch>
            </div>
        )
    }
}