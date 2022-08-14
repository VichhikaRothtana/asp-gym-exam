import { useState, useEffect } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import axios from 'axios'

const Header = () => {
  const logo = require('../assets/images/logo.png')
  const [isActive, setIsActive] = useState(true)
  const [fullname, setFullname] = useState('')
  const [role, setRole] = useState('')
  const handleClick = () => {
    setIsActive((current) => !current)
  }
  const handleSearch = () => {
    $('.search-model').fadeIn(400)
  }
  const getData = async () => {
    try {
      const id = JSON.parse(localStorage.getItem('data')!).user.id
      console.log(id)
      const { data } = await axios.get(`/api/user/${id}`)
      console.log(data)
      data ? setFullname(data.fullname) : setFullname('')
      data ? setRole(data.roles[0]) : setRole('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
    $('.loader').delay(600).fadeOut()
    $('#preloder').delay(600).fadeOut('slow')
  }, [])
  return (
    <>
      <div id="preloder">
        <div className="loader" />
      </div>
      <div>
        <div
          className={
            isActive
              ? 'offcanvas-menu-overlay'
              : 'offcanvas-menu-overlay active'
          }
          onClick={handleClick}
        ></div>
        <div
          className={
            isActive
              ? 'offcanvas-menu-wrapper'
              : 'offcanvas-menu-wrapper show-offcanvas-menu-wrapper'
          }
        >
          <div className="canvas-close" onClick={handleClick}>
            <i className="fa fa-close" />
          </div>
          <div className="canvas-search search-switch" onClick={handleSearch}>
            <i className="fa fa-search" />
          </div>
          <nav className="canvas-menu mobile-menu">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/schedule">schedule</a>
              </li>
              <li>
                <a href="/management">Management</a>
              </li>

              <li>
                <a href="#">Pages</a>
                <ul className="dropdown">
                  <li>
                    <a href="./about-us.html">About us</a>
                  </li>
                  <li>
                    <a href="./class-timetable.html">Classes timetable</a>
                  </li>
                  <li>
                    <a href="./bmi-calculator.html">Bmi calculate</a>
                  </li>
                  <li>
                    <a href="./team.html">Our team</a>
                  </li>
                  <li>
                    <a href="./gallery.html">Gallery</a>
                  </li>
                  <li>
                    <a href="./blog.html">Our blog</a>
                  </li>
                  <li>
                    <a href="./404.html">404</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="./contact.html">Contact</a>
              </li>
            </ul>
          </nav>
          <div id="mobile-menu-wrap" />
          <div className="canvas-social">
            <a href="#">
              <i className="fa fa-facebook" />
            </a>
            <a href="#">
              <i className="fa fa-twitter" />
            </a>
            <a href="#">
              <i className="fa fa-youtube-play" />
            </a>
            <a href="#">
              <i className="fa fa-instagram" />
            </a>
          </div>
        </div>
        {/* Offcanvas Menu Section End */}
        {/* Header Section Begin */}
        <header className="header-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3">
                <div className="logo">
                  <a href="./index.html">
                    <img src={logo} alt="" />
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <nav className="nav-menu">
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    {role === 'Customer' && (
                      <li>
                        <a href="/schedule">schedule</a>
                      </li>
                    )}
                    {role === 'Senior Supervisor' && (
                      <li>
                        <a href="/management">Management</a>
                      </li>
                    )}
  
                    {fullname.length <= 0 && (
                      <li>
                        <a href="#">
                          <i
                            style={{ fontSize: 20 }}
                            className="fa fa-lock"
                            aria-hidden="true"
                          />
                        </a>
                        <ul className="dropdown">
                          <li>
                            <a href="/login">Login </a>
                          </li>
                          <li>
                            <a href="#">Register</a>
                          </li>
                        </ul>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
              {fullname && (
                <div className="col-lg-3">
                  <div className="top-option">
                    <div className="btn-group">
                      <a
                        href="/settings"
                        className="btn btn-secondary btn-sm dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style={{ backgroundColor: '#f36100' }}
                      >
                        {fullname}
                      </a>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="/settings">
                          SETTINGS
                        </a>
                        <a className="dropdown-item" href="/logout">
                          LOGOUT
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="canvas-open" onClick={handleClick}>
              <i className="fa fa-bars" />
            </div>
          </div>
        </header>
      </div>
    </>
  )
}

export default Header
