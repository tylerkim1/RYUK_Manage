import {React, useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan  } from '@fortawesome/free-regular-svg-icons';
import oc from 'open-color';
import { withStyles, TableRow, TableCell } from "@mui/material";
import { networkrequest } from './Header/XHR.js';


const Td = ({key,item,handleRemove, handleEdit}) => {
    const [teamdata, setteamdata] = useState([]);  
    useEffect(() => {
        networkrequest('team/all/', {}, (data) => {
            setteamdata(data.data.map(({ team_id, name }) => ({ team_id, name })));
        })
    }, []);

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
            <td onClick={onRemove} className='text-center text-black-400 cursor-pointer'>
                <FontAwesomeIcon icon={faTrashCan} />
            </td>  
            </TableRow>

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