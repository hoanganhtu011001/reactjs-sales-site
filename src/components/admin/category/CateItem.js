import { Dialog, DialogActions, DialogContent, DialogTitle, TableCell, TableRow, Button, DialogContentText } from "@material-ui/core";
import { Component } from "react";
export default class CateItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    onDeleteForv = () => {
        this.props.deleteCate(this.props.cateitem);
        this.handleClose()
    }

    onEdit = () => {
        var cateitem = this.props.cateitem
        this.props.openAddCate();
        this.props.showDetail(cateitem)
        this.props.setAddCate(false)
    }

    onDeleCate = () => {
        var cateitem = this.props.cateitem
        cateitem.status = false;
        this.props.editCate(cateitem);
        this.handleClose()
    }

    onRestore = () => {
        var cateitem = this.props.cateitem
        cateitem.status = true;
        this.props.editCate(cateitem)
        this.props.setAddCate(false)
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
        var { cateitem, filterStatus } = this.props
        return (
            <TableRow>
                <TableCell className='text-center'>{cateitem.id}</TableCell>
                <TableCell className='text-center'>{cateitem.name}</TableCell>
                <TableCell className='text-center'>
                    <span className={cateitem.status ? "badge bg-success" : 'badge bg-danger'}> </span>
                </TableCell>
                <TableCell className='text-center'>
                    <button onClick={this.onEdit} className={filterStatus ? 'btn btn-warning p-1' : 'unenable'} style={{ width: '75px' }}>Sửa</button>
                    <button onClick={this.onRestore} className={filterStatus ? 'unenable' : 'btn btn-success p-1'} style={{ width: '75px' }}>H.tác</button>
                    <button type="button" onClick={this.handClickOpen} className={'btn btn-danger m-1 p-1'} data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ width: '75px' }}>
                        Xóa
                    </button>
                    <Dialog
                        open={this.state.open}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">Thông báo</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                {filterStatus? 'Bạn vẫn có thể hoàn tác sau khi xóa': 'Sau khi xóa sẽ không thể hoàn tác'}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Hủy bỏ
                            </Button>
                            <Button onClick={filterStatus ? this.onDeleCate : this.onDeleteForv} color="primary">
                                Vẫn xóa
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TableCell>
            </TableRow>
        )
    }
}