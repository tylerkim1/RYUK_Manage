import React, {useState} from 'react';
import { networkrequest}  from './Header/XHR.js';

const Modal = ({selectedData, handleCancel, handleEditSubmit})=> {
    const [edited, setEdited] = useState(selectedData);
    const [changedFields, setChangedFields] = useState([]);
    const [name, setName] = useState([]);
    const [teamLists, setTeamLists] = useState();

    if(teamLists === undefined) networkrequest('team/all/', {}, (data) => {setTeamLists(data.data);});

    const onCancel = () => {
        handleCancel();
    }

    const onEditChange = (e) => {
        setEdited({
            ...edited,
            [e.target.name]: e.target.value
        });

        if (!name.includes(e.target.name)) {
            setName((prevNames) => [...prevNames, e.target.name]);
          }
    }
    
    const onSubmitEdit = (e) => {
        e.preventDefault();
                
        // const n = name[i];
        var res = {
            userId : edited.user_id,
            password: edited.password,
            user_name : edited.user_name,
            nickname: edited.nickname,
            email : edited.email
        }
        networkrequest('user/changeInfo/', res, console.log);
        console.log('end');

        handleEditSubmit(edited);
    }

    return(
        <div className ='h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70'>
            <div className='bg-white rounded shaow-lg w-10/12 md:w-1/3'>
                <div className = 'border-b px-4 py-2 flex justify-between items-center'>
                    <h3 className = "font-semibold text-lg">사용자 정보 수정하기</h3>
                    <i className = "fas fa-times cursor-pointer" onClick={onCancel}></i>
                </div>
                <form onSubmit ={onSubmitEdit}>
                    <div class='p-3'>
                        <div># : {edited.user_id}</div>
                        <div>이름: <input className='border-2 border-gray-100' type='text' name='user_name' 
                        value={edited.user_name} onChange={onEditChange}/>
                        </div>
                        <div>닉네임: <input className='border-2 border-gray-100' type='text' name='nickname' 
                        value={edited.nickname} onChange={onEditChange}/>
                        </div>
                        <div>ID: <input className='border-2 border-gray-100' type='text' name='login_id' 
                        value={edited.login_id} onChange={onEditChange}/>
                        </div>
                        <div>이메일: <input className='border-2 border-gray-100' type='email' name='email' 
                        value={edited.email} onChange={onEditChange}/>
                        </div>
                        <div>비밀번호: <input className='border-2 border-gray-100' type='password' name='password' 
                        value={edited.password} onChange={onEditChange}/>
                        </div>
                        <div>팀:
                            
                            <select
                            className='border-2 border-gray-100'
                            name='team_id'
                            value={edited.team_id}
                            onChange={onEditChange}
                            >
                            {teamLists && teamLists.map((team) => (
                                <option key={team.id} value={team.id}>
                                {team.name}
                                </option>
                            ))}
                            </select> 
                            {/* <input className='border-2 border-gray-100' type='text' name='team_id' 
                        value={edited.team_id} onChange={onEditChange}/> */}
                        </div>
                    </div>
                    <div className = "flex justify-end items-center w-100 border-t p-3">
                        <button className='bg-red-600 hover: bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal'
                        onClick={onCancel}>취소</button>
                        <button type="submit" className='bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white'>수정</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;