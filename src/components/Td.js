import {React, useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan  } from '@fortawesome/free-regular-svg-icons';
import oc from 'open-color';
import { withStyles, TableRow, TableCell, Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { networkrequest } from './Header/XHR.js';

const Td = ({key,item,handleRemove, handleEdit}) => {
    const [teamdata, setteamdata] = useState([]);  
    const [openDelete, setOpenDelete] = useState(false);
    useEffect(() => {
        networkrequest('team/all/', {}, (data) => {
            setteamdata(data.data.map(({ team_id, name }) => ({ team_id, name })));
        })
    }, []);

    const toggleConfirmDialog = () => {
        setOpenDelete((prev) => !prev);
    }

    // console.log('td',item);
    const onRemove = () => {
        handleRemove(item.user_id);
    }
    const onEdit=() => {
      handleEdit(item);
    }
    if(item.is_manager ===0){
      return ( 
        <>
            <TableRow key={item.user_id}>
            <TableCell align="left">{item.user_id}</TableCell>
            <TableCell align="left">{item.user_name}</TableCell>
            <TableCell align="left">{item.login_id}</TableCell>
            <TableCell align="left">{item.nickname}</TableCell>
            <TableCell align="left">{item.email}</TableCell>
            {/* <TableCell align="left">  </TableCell> */}
            <TableCell align="left">{teamdata.find((team) => team.team_id == item.team_id)?.name}</TableCell>
            <td onClick={onEdit} className='text-center text-black-400 cursor-pointer show-modal'>
                <FontAwesomeIcon icon={faPenToSquare} />
            </td>
            <td onClick={toggleConfirmDialog} className='text-center text-black-400 cursor-pointer'>
                <FontAwesomeIcon icon={faTrashCan} />
            </td>  
            </TableRow>
            
            <Dialog onClose={() => setOpenDelete(false)} open={openDelete}>
                <DialogContent>
                정말 삭제하시겠습니까?
                </DialogContent>
                <DialogActions>
                <Button onClick={onRemove}>네</Button>
                <Button onClick={() => setOpenDelete(false)}>취소</Button>
                </DialogActions>
            </Dialog>

        </>
    )
    }
    else {
      return ( 
        <>

            <TableRow key={item.user_id} >
            <TableCell align="left">{item.user_id}</TableCell>
            <TableCell align="left">{item.user_name}</TableCell>
            <TableCell align="left">{item.login_id}</TableCell>
            <TableCell align="left">{item.nickname}</TableCell>
            <TableCell align="left">{item.email}</TableCell>
            <td onClick={onEdit} className='text-center text-black-400 cursor-pointer show-modal'>
                <FontAwesomeIcon icon={faPenToSquare} />
            </td>
            <td onClick={onRemove} className='text-center text-black-400 cursor-pointer'>
                <FontAwesomeIcon icon={faTrashCan} />
            </td>    
            </TableRow>

        </>
    )

    }

};

export default Td;