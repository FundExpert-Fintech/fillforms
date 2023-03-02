import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Paper} from "@material-ui/core";

export default function SignatureDialog({openDialog, setOpenDialog, SignatureCanvas, clearSignaturePad}) {
    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <Dialog
                fullScreen
                maxWidth="xl"
                open={openDialog}
                onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>
                        <Paper elevation={1} variant="outlined" className='signature'>
                            {SignatureCanvas}
                        </Paper>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{textTransform : "capitalize"}} variant="contained" onClick={clearSignaturePad}>Clear Signature</Button>
                    <Button style={{textTransform : "capitalize"}} variant="primary" onClick={handleClose}>Save Signature</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}