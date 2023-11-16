import React, {useState, useRef} from "react";
import Tr from './Tr';
import Post from './Post';
import Modal from './Modal';

const Board = () => {
    const data=[
        {'num': 1,'name':'박쿵야','id':'laj','email':'ii@kaist.ac.kr','password':'lakaj','team':'1'},
        {'num': 2,'name':'박쿵야','id':'alkf','email':'ii@kaist.ac.kr','password':'lakaj','team':'1'},
        {'num': 3,'name':'박쿵야','id':'alkn','email':'ii@kaist.ac.kr','password':'lakaj','team':'1'},
        {'num': 4,'name':'박쿵야','id':'bnlkeja','email':'ii@kaist.ac.kr','password':'lakaj','team':'1'},
        {'num': 5,'name':'박쿵야','id':'nkwnek','email':'ii@kaist.ac.kr','password':'lakaj','team':'1'},
        {'num': 6,'name':'박쿵야','id':'qnkw','email':'ii@kaist.ac.kr','password':'lakaj','team':'1'}
        ];

        const [info, setinfo]= useState(data);
        const [selected, setselected]=useState('');
        const [modalOn, setmodalon] = useState(false);
    
        const nextId = useRef(11);
    
        const handleSave=(data)=>{
            //data 수정하기
            if(data.num){
                setinfo(
                    info.map(row=> data.num===row.num ? {
                        num: data.num,
                        name: data.name,
                        id: data.id,
                        email: data.email,
                        password: data.password,
                        team: data.team
                    }:row))
            }
            else{ //데이터 추가하기
                setinfo(info=> info.concat(
                    {
                        num: nextId.current,
                        name: data.name,
                        id: data.id,
                        email: data.email,
                        pass : data.password,
                        team: data.team
                    }
                ))
                nextId.current +=1;
            }
        }
     
        const handleRemove = (num) => {
            setinfo(info => info.filter(item=> item.num !==num));
        }
    
        const handleEdit= (item) => {
            setmodalon(true);
            const selectedData = {
                num: item.num,
                name : item.name,
                id : item.id, 
                email: item.email,
                password: item.password,
                team: item.team
            };
            console.log(selectedData)
            setselected(selectedData);
        };
    
        const handleCancel = () => {
            setmodalon(false);
        }
    
        const handleEditSubmit = (item) =>{
            console.log(item);
            handleSave(item);
            setmodalon(false);
        }

    return (
        <div className = 'container max-w-screen-lg mx-auto'>
            <div className = 'text-xl font-bold mt-5 mb-3 text-center'>사용자 정보 리스트 </div>
            
            <table className='min-w-full table-auto text-gray-800'>
                <thead clasName='justify-between'>
                    <tr className='bg-gray-800'>
                        <th className = 'text-gray-300 px-4 py-3'>Num</th>
                        <th className = "text-gray-300 px-4 py-3">이름</th>
                        <th className = "text-gray-300 px-4 py-3">ID</th>
                        <th className = "text-gray-300 px-4 py-3">이메일</th>
                        <th className = "text-gray-300 px-4 py-3">비밀번호</th>
                        <th className = "text-gray-300 px-4 py-3">팀</th>
                        <th className = "text-gray-300 px-4 py-3">수정</th>
                        <th className = "text-gray-300 px-4 py-3">삭제</th>
                    </tr>
                </thead>
                <Tr info={info} handleRemove={handleRemove} handleEdit={handleEdit}/>

            </table>
            <Post onSaveData={handleSave}/>
            {modalOn && <Modal selectedData ={selected} handleCancel={handleCancel} handleEditSubmit={handleEditSubmit}/>}
            
            </div>
            
        
    );
};

export default Board;