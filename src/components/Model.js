import React, { useEffect, useState } from 'react'
import './Model.css'
import axios from 'axios';
import { BASE_URL } from '../constant';

function Model({setOpenModel, modelTask, setAlltask}){
    const [inputText, setInputText] = useState("");

    useEffect(()=>{
        if(modelTask.name){
            setInputText(modelTask.name);
        }
    },[])

    const onChange = (e) => {
        setInputText(e.target.value);
    }

    const updateTask = () => {
        if(inputText === "") return

        //api request to add data
        axios.put(`${BASE_URL}task/update`, {task : inputText, id: modelTask._id})
            .then(response => {
                setAlltask((prev) => {
                    let newList = prev.filter((e) => e._id !== response.data.data[0]._id);
                    return [...newList,...response.data.data]
                });
            })
            .catch(error => {
                console.error('Error:', error);
            }
        );

        setInputText("");

        setOpenModel(false);
    }

    return(
        <div className='modelcontainer'>
            <div className='close'>
                <span></span>
                <button onClick={()=> setOpenModel((prev)=> !prev)}>x</button>
            </div>
            <div className='inputdiv'>
                <input value={inputText} onChange={onChange}/>
                <button onClick={updateTask}>UPDATE</button>
            </div>
        </div>
    )
}

export default Model;