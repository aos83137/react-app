import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Create from '@material-ui/icons/Create';


function UpdateDialog(data) {
  const [open, setOpen] = React.useState(false);
  const board = data.data;
  const onChangeHandler = data.onChangeHandler;
  const modifyHandler=data.modifyHandler;
  const fieldData = data.fieldData;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button startIcon={<Create/>} variant="outlined" color="primary" onClick={handleClickOpen}>
        수정
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" key={"ltet"}>
        <DialogTitle id="form-dialog-title">글 수정</DialogTitle>
        <DialogContent>

            <TextField
                label="title"
                fullWidth
                margin="dense"
                defaultValue={board.title}
                onChange={onChangeHandler.titleChangeHandler}
            />
            <TextField
                label="content"
                multiline
                rows={6}
                // variant="outlined"
                fullWidth
                margin="dense"
                defaultValue={board.content}
                onChange={onChangeHandler.contentChangeHandler}
            />
            <TextField
                label="cardContent"
                fullWidth
                margin="dense"
                defaultValue={board.cardContent}
                onChange={onChangeHandler.cardContentChangeHandler}
            />
            <input
                accept="image/*"
                // className={classes.input}
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={(e)=>{
                // return onChangeHandler.FileInputHandler(e);
                }}
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" color="default" startIcon={<CloudUploadIcon />} component="span" >
                    사진 등록
                </Button>
            </label> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={
                            (e)=>{
                              console.log('수정 시작');
                              console.log('id,',board.id);
                              console.log('id,',fieldData);
                            return modifyHandler(board.id, fieldData)}
                          } 
                          color="primary">
            수정
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default React.memo(UpdateDialog);