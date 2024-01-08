import React, { useEffect, useState } from 'react'
import RouterIndex from './routes/RouteIndex'
import api from "./services"
import { todoListAction } from './store/slices/todoList.slice'
import { userAction } from './store/slices/user.slice'
import { useDispatch, useSelector } from 'react-redux'
export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await api.todoList.findAll();
        dispatch(todoListAction.setData(result?.data?.data));
      } catch (err) {
        console.log('err', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.user.decodeToken(localStorage.getItem('token'));
        if(result.status == 200){
          dispatch(userAction.setUser(result?.data?.data));
        } 
      } catch (err) {
        localStorage.removeItem('token');
        dispatch(userAction.setUser(null));
      }
    }
    fetchData()
  }, [])
  return (
    <RouterIndex />
  )
}
