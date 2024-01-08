import React, { useEffect, useState } from 'react'
import api from '../../services'
import './table.scss'
import { useDispatch, useSelector } from 'react-redux'
import { todoListAction } from '../../store/slices/todoList.slice'
import { Modal } from 'antd'
export default function Table({ setDisplayUpdateFrom, displayUpdateFrom, setId }) {
    const todoListStore = useSelector(store => store.todoListStore)
    const userStore = useSelector(store => store.userStore)
    const dispatch = useDispatch()
    const handleDelete = async (userId) => {
        try {
            await api.todoList.delete(userId)
            dispatch(todoListAction.delete(userId))
        } catch (err) {
            console.log('err', err);

        }
    }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th
                        >Id <i className="fa-solid fa-sort-down"></i></th>
                        <th>Name</th>
                        <th>Decs</th>
                        <th>Tools</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todoListStore.data?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td className='decs'>{item.decs}</td>
                                {
                                    (userStore.data?.role == "admin") ? <td className='button'><button className='update'
                                        onClick={() => {
                                            setId(item.id)
                                            setDisplayUpdateFrom(!displayUpdateFrom)
                                        }}
                                    >Update</button>

                                        <button className='delete'
                                            onClick={() => {
                                                Modal.confirm({
                                                    title: 'Delete',
                                                    content: 'Are you sure you want to delete this task?',
                                                    okText: 'Yes',
                                                    cancelText: "Close",
                                                    onOk: () => { handleDelete(item.id) },
                                                    onCancel: () => {
                                                    }
                                                })

                                            }}
                                        >Delete</button>
                                    </td> : <td><p style={{color:"red"}}>Permission Denied</p></td>
                                }

                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
        </>
    )
}
