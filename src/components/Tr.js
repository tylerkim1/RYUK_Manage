import React from 'react';
import Td from './Td';

const Tr = ({info, handleRemove, handleEdit})=> {

    const sortedinfo = info.sort((a, b) => (a.user_name > b.user_name ? 1 : -1));
    // console.log('sort',sortedinfo);
    
    return (
        <tbody>
            {
                sortedinfo.map(item => {
                    return ( 
                        <Td key={item.user_id} item = {item} handleRemove = {handleRemove}
                        handleEdit ={handleEdit}/>
                    )
                })
            }
        </tbody>
    );
};

export default Tr;