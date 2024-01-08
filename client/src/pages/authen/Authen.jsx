import React, { useEffect, useRef, useState } from 'react'
import { Button, Table, Form } from 'react-bootstrap'
import './authen.scss'
import { Modal } from 'antd'
import api from '../../services'
export default function Authen() {
    const [displayRegisterForm, setDisplayRegisterForm] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            window.location.href = "/"
        }
    }, [])
    return (
        <div >
            <section className="container">
                <div className="login-container">
                    <div className="circle circle-one" />
                    <div className="form-container">
                        <img
                            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
                            alt="illustration"
                            className="illustration"
                        />
                        <h1 className="opacity">LOGIN</h1>
                        <form onSubmit={async (e) => {
                            try {
                                e.preventDefault()
                                if (e.target.loginId.value == "" || e.target.password.value == "") {
                                    Modal.error({
                                        title: 'Error',
                                        content: "Please fill in your login information completely",
                                        onOk: () => {
                                        }
                                    })
                                    return
                                }
                                let user = {
                                    loginId: e.target.loginId.value,
                                    password: e.target.password.value,
                                }
                                let result = await api.user.login(user)
                                console.log(result);
                                if (result.status == 200) {
                                    Modal.success({
                                        title: 'Success',
                                        content: result.data.message,
                                        onOk: () => {
                                            localStorage.setItem('token', result.data.token)
                                            window.location.href = "/"
                                        }
                                    })
                                    localStorage.setItem('token', result.data.token)
                                }
                            } catch (err) {
                                Modal.error({
                                    title: 'Error',
                                    content: err.response?.data?.message || 'loi Sever',
                                    onOk: () => {
                                    }
                                })
                            }
                        }}>
                            <input type="text" placeholder="USERNAME" id='loginId' />
                            <input type="password" placeholder="PASSWORD" id='password' />
                            <button className="opacity" type="submit">
                                LOGIN
                            </button>
                        </form>
                        <div className="register-forget opacity">
                            <span onClick={() => {
                                setDisplayRegisterForm(!displayRegisterForm)
                            }}>REGISTER</span>
                        </div>
                    </div>
                    <div className="circle circle-two" />
                </div>
                <div className="theme-btn-container" />
            </section >
            {displayRegisterForm &&
                <div className='form_container'>
                    <Form onSubmit={async (e) => {
                        try {
                            e.preventDefault()
                            if (e.currentTarget.registerId.value == "" || e.currentTarget.registerPassword.value == "" || e.currentTarget.role.value == "") {
                                Modal.error({
                                    title: 'Error',
                                    content: "Please fill in your register information completely",
                                    onOk: () => {
                                    }
                                })
                                return
                            }
                            let user = {
                                loginId: e.currentTarget.registerId.value,
                                password: e.currentTarget.registerPassword.value,
                                role: e.currentTarget.role.value
                            }
                            console.log(user);
                            let result = await api.user.register(user)
                            if (result.status == 200) {
                                Modal.success({
                                    title: 'Success',
                                    content: result.data.message,
                                    onOk: () => {
                                        setDisplayRegisterForm(!displayRegisterForm)
                                    }
                                })
                            }
                        } catch (err) {
                            console.log(err);
                            Modal.error({
                                title: 'Error',
                                content: err.response?.data?.message || 'loi Sever!',
                                onOk: () => {
                                }
                            })
                        }
                    }}>
                        <h2>Register Form</h2>
                        <h4
                            onClick={() => {
                                setDisplayRegisterForm(!displayRegisterForm)
                            }}
                        >X</h4>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="registerId">Login ID:</Form.Label>
                            <Form.Control id="registerId" placeholder="LOGIN ID" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="registerPassword">Password:</Form.Label>
                            <Form.Control type='password' id="registerPassword" placeholder="PASSWORD" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="role">Role:</Form.Label>
                            <Form.Select id="role">
                                <option value='admin'>Admin</option>
                                <option value='user'>User</option>
                            </Form.Select>
                        </Form.Group>
                        <button className="Btn" type='submit'>
                            REGISTER
                        </button>
                    </Form>
                </div>
            }

        </div >

    )
}
