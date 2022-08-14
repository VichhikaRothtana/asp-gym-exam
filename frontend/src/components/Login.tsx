import '../assets/styles/login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useInput from '../hooks/useInput'
import useToggle from '../hooks/useToggle'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const LOGIN_URL = '/api/authentication/login'

const Login = () => {
  const logo = require('../assets/images/logo.png')
  const login = require('../assets/images/login.jpg')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const handleLoginSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const { data } = await axios.post(LOGIN_URL, {
      username,
      password,
    })
    console.log(data)

    const accessToken = data?.accessToken
    localStorage.setItem('data', JSON.stringify(data))
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${data['accessToken']}`

    if (accessToken.length > 0) {
      navigate('/')
    }
  }
  const handleSwitchToLogin = () => {
    $('.signIn').addClass('active-dx')
    $('.signUp').addClass('inactive-sx')
    $('.signUp').removeClass('active-sx')
    $('.signIn').removeClass('inactive-dx')
  }

  const handleSwitchToRegister = () => {
    $('.signUp').addClass('active-sx')
    $('.signIn').addClass('inactive-dx')
    $('.signIn').removeClass('active-dx')
    $('.signUp').removeClass('inactive-sx')
  }

  useEffect(() => {
    try {
      const token = JSON.stringify(localStorage.getItem('accessToken')!)

      if (token.length > 0) {
        const { exp } = jwt_decode(token) as any
        if (Date.now() >= exp * 1000 === false) {
          setIsLoggedIn(true)
          navigate('/')
        }
      }
    } catch (error) {}
  }, [])

  return (
    <>
      <div className="login-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 login-section-wrapper">
              <div className="login-brand-wrapper">
                <a href="/">
                  <img
                    style={{ height: 40 }}
                    src={logo}
                    alt="logo"
                    className="logo"
                  />
                </a>
              </div>
              <div className="login-container">
                <form className="login signUp">
                  <h3>Create Your Account</h3>
                  <p>Create your account. It's free and only takes a minute.</p>
                  <input
                    className="w100 login-input"
                    type="text"
                    placeholder="Username"
                    required
                    autoComplete="off"
                  />
                  <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    required
                  />
                  <input
                    className="login-input"
                    type="password"
                    placeholder="Re-enter Password"
                    required
                  />
                  <button
                    className="form-btn sx log-in"
                    type="button"
                    onClick={handleSwitchToLogin}
                  >
                    Log In
                  </button>
                  <button className="form-btn dx" type="submit">
                    Sign Up
                  </button>
                </form>
                <form onSubmit={handleLoginSubmit} className="login signIn">
                  <h3>
                    Welcome
                    <br />
                    Back !
                  </h3>
                  <span className="btn">
                    <i
                      style={{ fontSize: 30, color: '#DB4437' }}
                      className="fa fa-google"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="btn ">
                    <i
                      style={{ fontSize: 30, color: '#4267B2' }}
                      className="fa fa-facebook-f"
                    />
                  </span>
                  <span className="btn">
                    <i
                      style={{ fontSize: 30, color: '#00acee' }}
                      className="fa fa-twitter"
                      aria-hidden="true"
                    />
                  </span>
                  <p style={{ margin: 15 }}>- or -</p>
                  <input
                    className="login-input"
                    type="text"
                    placeholder="Username"
                    autoComplete="off"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="form-btn sx back"
                    type="button"
                    onClick={handleSwitchToRegister}
                  >
                    Back
                  </button>
                  <button className="form-btn dx" type="submit">
                    Log In
                  </button>
                </form>
              </div>
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img src={login} alt="login image" className="login-img" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
