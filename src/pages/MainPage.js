import React, { useEffect, useState } from 'react'
import './MainPage.css'
import Model from '../components/Model';
import axios from 'axios';
import { BASE_URL } from '../constant';

function MainPage(){
    const [inputText, setInputText] = useState("");
    const [allTask, setAlltask] = useState([]);
    const [openModel, setOpenModel] = useState(false);
    const [count, setCount] = useState(0);
    const [modelTask, setModelTask] = useState({});

    useEffect(()=>{
        //get all task
        axios.get(`${BASE_URL}task/getAll`)
            .then(response => {
                setAlltask(response.data.data);
            })
            .catch(error => {
                console.error('Error:', error);
            }
        );
    },[])

    const onChange = (e) => {
        setInputText(e.target.value);
    }

    const getCount = () => {
        //api request to get count data
        axios.get(`${BASE_URL}task/count`)
            .then(response => {
                setCount(response.data.data[0].count)
            })
            .catch(error => {
                console.error('Error:', error);
            }
        );
    }

    const addTask = () => {
        if(inputText === "") return

        //api request to add data
        axios.post(`${BASE_URL}task/add`, {task : inputText})
            .then(response => {
                setAlltask((prev) => [...prev,...response.data.data]);
            })
            .catch(error => {
                console.error('Error:', error);
            }
        );

        setInputText("");
    }

    return(
        <div className='container'>
            <div className='inputdiv'>
                <input value={inputText} onChange={onChange}/>
                <button onClick={addTask}>ADD</button>
                <button onClick={getCount}>GET COUNT</button>
            </div>
            {count !== 0 && <div style={{marginTop: "10px"}}> Total add and update count: {count}</div>}
            <div className='alltask'>
                {
                    allTask.length > 0 ? allTask?.map((task)=>{
                        return(
                            <div key={task._id} className='task'>
                                <div>{task.name}</div>
                                <button onClick={()=> {setOpenModel(true); setModelTask(task)}} >Update</button>
                            </div>
                        )
                    }) : <div>NO TASK FOUND</div>
                }
            </div>
            {openModel && (
                <div className='model'>
                    <Model setOpenModel={setOpenModel} modelTask={modelTask} setAlltask={setAlltask} />
                </div>     
            )}
        </div>

        
    )
}

export default MainPage;