import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './Account.module.css'
import Navbar from './NavBar'
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const[edit,setEdit]=React.useState(false)
  const[order,setOrder]=React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (<>
    <Navbar/>
    <div>
      <Button onClick={()=>{
        handleOpen()
        setEdit(true)
        }} className={styles.editbtn}>Edit Account</Button>
      <Button onClick={()=>{
handleOpen()
setOrder(true)
      }} className={styles.editbtn}>Order History</Button>
      {edit? <Modal
        open={open}
        onClose={()=>{handleClose()
        setEdit(false)
        setOrder(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <TextField/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Edit
          </Typography>
        </Box>
      </Modal>:order?<Modal
        open={open}
        onClose={()=>{handleClose()
        setEdit(false)
        setOrder(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <TextField/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Edit
          </Typography>
        </Box>
      </Modal>:null}
    </div>
    </>);
}

export default BasicModal