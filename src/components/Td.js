import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan  } from '@fortawesome/free-regular-svg-icons';
import oc from 'open-color';
import { withStyles, TableRow, TableCell } from "@mui/material";

// const StyledTableCell = withStyles((theme) => ({
//     head: {
//       backgroundColor: oc.teal[9],
//       color: theme.palette.common.white,
//     },
//     body: {
//       fontSize: 14,
//     },
//   }))(TableCell);
  
//   const StyledTableRow = withStyles((theme) => ({
//     root: {
//       '&:nth-of-type(odd)': {
//         backgroundColor: oc.lime[1],
//       },
//       '&:nth-of-type(even)': {
//         backgroundColor: oc.lime[2],
//       },
//     },
//   }))(TableRow);

const Td = ({key,item,handleRemove, handleEdit}) => {
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
            <TableCell align="left">{item.email}</TableCell>
            {/* <TableCell align="left">  </TableCell> */}
            <TableCell align="left">{item.team_id}</TableCell>
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

            <TableRow key={item.user_id}>
            <TableCell align="left">{item.user_id}</TableCell>
            <TableCell align="left">{item.user_name}</TableCell>
            <TableCell align="left">{item.login_id}</TableCell>
            <TableCell align="left">{item.email}</TableCell>
            {/* <TableCell align="left">  </TableCell> */}
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