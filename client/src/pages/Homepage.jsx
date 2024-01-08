import React, { useState, useEffect } from 'react'
import './homepage.scss'
import { useSelector, useDispatch } from 'react-redux'
import Table from './table/Table.jsx'
import CreateForm from './createForm/CreateForm.jsx'
import UpdateForm from './updateForm/UpdateForm.jsx'
export default function Homepage() {
    const userStore = useSelector(store => store.userStore)
    const [displayCreateFrom, setDisplayCreateFrom] = useState(false)
    const [displayUpdateFrom, setDisplayUpdateFrom] = useState(false)
    const [id, setId] = useState(null)
    return (
        <>
            <div className='app'>
                <div className='authen'>
                    {
                        localStorage.getItem('token') ? <button
                            onClick={()=>{
                                localStorage.removeItem('token')
                                window.location.reload()
                            }}
                            className='btn_authen_logout'>Logout</button>
                            : <button
                            onClick={()=>{
                                window.location.href = '/authen'
                            }}
                            className='btn_authen_login'>Login</button>
                    }
                </div>
                <div className='app-container'>
                    {
                        (userStore.data?.role == "admin") && <button className='create-button' onClick={() => {
                            setDisplayCreateFrom(!displayCreateFrom)
                        }}>Create Task</button>
                    }
                    {displayCreateFrom && <CreateForm displayCreateFrom={displayCreateFrom} setDisplayCreateFrom={setDisplayCreateFrom} />}
                    {displayUpdateFrom && <UpdateForm id={id} setDisplayUpdateFrom={setDisplayUpdateFrom} displayUpdateFrom={displayUpdateFrom} />}
                    <div className='title'>
                        <h4>Todo List</h4>
                    </div>
                    <div className='table-container'>
                        {
                            userStore.data ? <Table setDisplayUpdateFrom={setDisplayUpdateFrom} displayUpdateFrom={displayUpdateFrom} setId={setId} /> : <h2 style={{margin:"30px"}}>Login to see Todo List!!</h2>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
