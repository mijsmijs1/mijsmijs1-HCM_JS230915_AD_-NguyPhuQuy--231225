import React from 'react'
import api from '../../services'
import './updateForm.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import { todoListAction } from '../../store/slices/todoList.slice'
export default function UpdateForm({ id, setDisplayUpdateFrom, displayUpdateFrom }) {
    const todoListStore = useSelector(store => store.todoListStore)
    let task = todoListStore.data.find(s => s.id === id)
    const dispatch = useDispatch()
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            if (e.target.name.value == '' || e.target.desc.value == '') {
                Modal.warn({
                    title: 'Warning',
                    content: 'Please fill all the fields',
                })
                return
            }
            if (e.target.desc.value.length > 255) {
                Modal.warn({
                    title: 'Warning',
                    content: 'Description is too long!',
                })
                return
            }
            let task = {
                name: e.target.name.value,
                decs: e.target.desc.value
            }
            let result = await api.todoList.update(id, task)
            dispatch(todoListAction.update(result?.data?.data))
            e.target.name.value = ''
            e.target.desc.value = ''
            setDisplayUpdateFrom(!displayUpdateFrom)
        } catch (err) {
            console.log('err', err);
        }
    }
    return (
        <>
            <div className='update-form'>
                <form onSubmit={(e) => {
                    handleUpdate(e)
                }}>
                    <i onClick={() => {
                        setDisplayUpdateFrom(!displayUpdateFrom)
                    }} className="fa-solid fa-xmark"></i>
                    <p>Update Task!!!</p>
                    <label>Name</label>
                    <input type='text' id='name' defaultValue={task.name}></input>
                    <label>Description</label>
                    <textarea name="desc" defaultValue={task.decs}></textarea>
                    <button type='submit'>Save</button>
                </form>
            </div>
        </>
    )
}
