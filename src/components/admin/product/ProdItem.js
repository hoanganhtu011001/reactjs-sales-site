import { Dialog, DialogActions, DialogContent, DialogTitle, TableCell, TableRow, Button, DialogContentText } from "@material-ui/core";
import { Component } from "react";
export default class ProdItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    onEdit = () => {
        this.props.setFormStatus(true);
        this.props.showDetail(this.props.prodItem)
    }

    onDelete = () => {
        var prod = this.props.prodItem;
        prod.deleted = true
        this.props.editProd(prod)
        this.handleClose()
    }

    onRestore = () => {
        var prod = this.props.prodItem;
        prod.deleted = false
        this.props.editProd(prod)
    }

    onDeleteForv = () => {
        this.props.deleteProd(this.props.prodItem);
        this.handleClose()
    }


    handClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }
    render() {
        var { prodItem, filterdeleted } = this.props;
        return (
            <TableRow>
                <TableCell className='text-center'>{prodItem.id}</TableCell>
                <TableCell className='text-center'>{prodItem.name}</TableCell>
                <TableCell className='text-center'>{prodItem.price}</TableCell>
                <TableCell className='text-center'>{prodItem.cateId}</TableCell>
                <TableCell className='text-center'>
                    <button onClick={this.onEdit} className={filterdeleted ? 'unenable' : 'btn btn-warning p-1'} style={{ width: '75px' }}>Sửa</button>
                    <button onClick={this.onRestore} className={filterdeleted ? 'btn btn-success p-1' : 'unenable'} style={{ width: '75px' }}>H.tác</button>
                    <button type="button" onClick={this.handClickOpen} className={'btn btn-danger m-1 p-1'} style={{ width: '75px' }}>
                        Xóa
                    </button>
                    <Dialog
                        open={this.state.open}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Thông báo"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                {filterdeleted ? "Sau khi xóa sẽ không thể hoàn tác":"Bạn vẫn có thể hoàn tác sau khi xóa"}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Hủy bỏ
                            </Button>
                            <Button onClick={filterdeleted ? this.onDeleteForv : this.onDelete} color="primary">
                                Vẫn xóa
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TableCell>
            </TableRow>
        )
    }
}