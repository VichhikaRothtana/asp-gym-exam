import Header from '../../components/Header'
import Footer from '../../components/Footer'
import GetInTouch from '../../components/GetInTouch'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Settings = () => {
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [genderId, setGenderId] = useState()
  const [dateOfBirth, setDateOfBirth] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [email, setEmail] = useState()
  const breadcrumb = require('../../assets/images/breadcrumb-bg.jpg')
  const testimonial1 = require('../../assets/images/testimonial/testimonial-1.jpg')

  const id = JSON.parse(localStorage.getItem('data')!).user.id
  const handleOnUpdate = async () => {
    const { data } = await axios.put(`/api/user/${id}`, {
      firstname,
      lastname,
      dateOfBirth,
      phoneNumber,
      email,
      genderId,
    } as any)
    console.log(data)
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: <strong>Upated!</strong>,
      html: <i>Your data has been updated!</i>,
      icon: 'success',
    })
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data')!).user
    setFirstName(data.firstname)
    setLastName(data.lastname)
    setGenderId(data.gender.id)
    setDateOfBirth(data.dateOfBirth)
    setPhoneNumber(data.phoneNumber)
    setEmail(data.email)
  }, [])
  return (
    <>
      <Header />
      <section
        className="breadcrumb-section set-bg"
        style={{ backgroundImage: `url(${breadcrumb})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb-text">
                <h2>Settings</h2>
                <div className="bt-option">
                  <a href="/">Home</a>
                  <span>Settings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section Begin */}
      <section className="testimonial-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Profile</span>
                <h2>
                  {firstname} {lastname}
                </h2>
              </div>
            </div>
          </div>
          <div className="ts_slider owl-carousel">
            <div className="ts_item">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <div className="ti_pic">
                    <img src={testimonial1} alt="" />
                  </div>
                  <div className="ti_text">
                    <h5>Marshmello Gomez</h5>
                    <p>@rothtana • Member since October 04, 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonial Section End */}

      {/* Contact Section Begin */}
      <section className="contact-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="leave-comment">
                <form action="#">
                  <input
                    type="text"
                    placeholder="Firstname"
                    defaultValue={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <select
                    value={genderId}
                    style={{
                      width: '300px',
                      height: '40px',
                      marginBottom: '25px',
                      background: '#151515',
                      color: '#c4c4c4',
                      border: '1px solid #363636',
                      padding: '0px 20px',
                    }}
                  >
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Phone number"
                    defaultValue={phoneNumber}
                  />
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="leave-comment">
                <form action="#">
                  <input
                    type="text"
                    placeholder="Lastname"
                    defaultValue={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Date of Birth"
                    defaultValue={dateOfBirth}
                  />
                  <input type="text" placeholder="Email" defaultValue={email} />
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="leave-comment">
                <form action="javascript:;" onSubmit={handleOnUpdate}>
                  <button type="submit">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section End */}
      <Footer />
    </>
  )
}

export default Settings
