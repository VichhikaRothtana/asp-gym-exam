import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import moment from 'moment'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Schedule = () => {
  const [toggleState, setToggleState] = useState(0)
  const [isAppointed, setIsAppointed] = useState(true)
  const [showJoin, setShowJoin] = useState(true)
  const [groups, setGroups] = useState([])
  const [trainers, setTrainers] = useState([])
  const [coach, setCoach] = useState([])
  const [datetime_appoint, setDatetime_appoint] = useState('')

  const handleChangeDatetime_appoint = (event: { target: { value: any } }) => {
    setDatetime_appoint(event.target.value)
  }

  const toggleTab = (index: number) => {
    setToggleState(index)
  }
  const breadcrumb = require('../assets/images/breadcrumb-bg.jpg')

  const handleOnGroupTraining = async () => {
    const { data } = await axios.get(`/api/group`)
    console.log(data)
    setGroups(data)
  }
  const handleOnTrainer = async () => {
    const { data } = await axios.get(`/api/group`)
    console.log(data)
    setTrainers(data)
  }

  const handleOnAppointment = async () => {
    var { data } = await axios.get(`/api/user/?type=stuff&role=coach`)
    console.log(data)
    data.pop()
    data.pop()
    setCoach(data)
    var { data } = await axios.get(`/api/appointment/customer/${id}`)
    console.log(data)
    if (data) {
      setIsAppointed(false)
    }
  }

  const id = JSON.parse(localStorage.getItem('data')!).user.id
  const handleOnJoinTraining = async (group_id: number) => {
    const { data } = await axios.post(`/api/group/addCustomer`, {
      customerId: id,
      groupId: group_id,
    } as any)
    setShowJoin(false)
    handleOnGroupTraining()
    console.log(data)
  }

  const handleOnJoinAppointment = async (
    coach_id: number,
    datetime_app: any
  ) => {
    const { data } = await axios.post(`/api/appointment`, {
      description: '',
      startDate: new Date(),
      endDate: datetime_app,
      coachId: coach_id,
      customerId: id,
    } as any)
    setIsAppointed(true)

    console.log(data)
    if (data) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <strong>Thank you!</strong>,
        html: <i>Appointment has been made!</i>,
        icon: 'success',
      })
      setIsAppointed(true)
    }
  }

  return (
    <>
      <Header />

      {/* Breadcrumb Section Begin */}
      <section
        className="breadcrumb-section set-bg"
        style={{ backgroundImage: `url(${breadcrumb})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb-text">
                <h2>Schedule</h2>
                <div className="bt-option">
                  <a href="/">Home</a>
                  <span>Schedule</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}

      {/* Class Timetable Section Begin */}
      <section className="class-timetable-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-title">
                <span>Find Your Time</span>
                <h2>Find Your Time</h2>
              </div>
            </div>
          </div>
          <div className="row" style={{ color: 'white' }}>
            <div className="col-lg-12">
              <div className="class-timetable">
                <div className="row">
                  <div className="col-5 col-sm-3">
                    <div
                      className="nav flex-column  h-100"
                      id="vert-tabs-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      <a
                        className="nav-link"
                        id="vert-tabs-home-tab"
                        data-toggle="pill"
                        href="#vert-tabs-home"
                        role="tab"
                        aria-controls="vert-tabs-home"
                        onClick={() => {
                          toggleTab(1)
                          handleOnTrainer()
                        }}
                        style={{
                          backgroundColor: toggleState === 1 ? '#f36100' : '',
                          color: 'white',
                          border: '1px solid #363636',
                        }}
                      >
                        Trainer
                      </a>
                      <a
                        className="nav-link"
                        id="vert-tabs-profile-tab"
                        data-toggle="pill"
                        href="#vert-tabs-profile"
                        role="tab"
                        aria-controls="vert-tabs-profile"
                        onClick={() => {
                          toggleTab(2)
                          handleOnGroupTraining()
                        }}
                        style={{
                          backgroundColor: toggleState === 2 ? '#f36100' : '',
                          color: 'white',
                          border: '1px solid #363636',
                        }}
                      >
                        Group Training
                      </a>

                      <a
                        className="nav-link"
                        id="vert-tabs-settings-tab"
                        data-toggle="pill"
                        href="#vert-tabs-settings"
                        role="tab"
                        aria-controls="vert-tabs-settings"
                        onClick={() => {
                          toggleTab(3)
                          handleOnAppointment()
                        }}
                        style={{
                          backgroundColor: toggleState === 3 ? '#f36100' : '',
                          color: 'white',
                          border: '1px solid #363636',
                        }}
                      >
                        Appointment
                      </a>
                    </div>
                  </div>
                  <div className="col-7 col-sm-9">
                    <div className="tab-content" id="vert-tabs-tabContent">
                      <div
                        className="tab-pane text-left fade show active"
                        id="vert-tabs-home"
                        role="tabpanel"
                        aria-labelledby="vert-tabs-home-tab"
                      >
                        {trainers.map((trainer: any) => (
                          <div key={trainer.id}>
                            <div className="card text-white bg-dark ">
                              <h5 className="card-header">
                                {trainer.fullname}
                              </h5>
                              <div className="card-body">
                                {trainer.schedules.map((ts: any) => (
                                  <>
                                    <h5 className="card-title">
                                      Title: {ts.title} <br />
                                    </h5>

                                    <p className="card-text">
                                      Description: {ts.description}
                                      <br />
                                      {ts.startDate} | {ts.endDate}
                                    </p>
                                  </>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="vert-tabs-profile"
                        role="tabpanel"
                        aria-labelledby="vert-tabs-profile-tab"
                      >
                        {groups.map((group: any, index) => (
                          <div key={group.id}>
                            <div className="card text-white bg-dark ">
                              <h5 className="card-header">{group.name}</h5>
                              <div className="card-body">
                                <h5 className="card-title">
                                  By: {group.trainer.fullname}
                                </h5>
                                <p className="card-text">
                                  {group.openDate} | {group.closeDate}
                                  <br /> Total Joined:{' '}
                                  {group.customers.length}/{group.limitation}
                                </p>
                                {showJoin &&
                                  group.limitation >= group.customers.length &&
                                  group.customers.filter(
                                    (e: any) => e.id === id
                                  ).length <= 0 && (
                                    <a
                                      className="btn-sm"
                                      style={{
                                        background: '#f36100',
                                        float: 'right',
                                        padding: '5px 25px',
                                      }}
                                      onClick={() =>
                                        handleOnJoinTraining(group.id)
                                      }
                                    >
                                      JOIN
                                    </a>
                                  )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="vert-tabs-settings"
                        role="tabpanel"
                        aria-labelledby="vert-tabs-settings-tab"
                      >
                        {coach.map((c: any, index) => (
                          <>
                            <div key={c.id}>
                              <div className="card text-white bg-dark ">
                                <h5 className="card-header"></h5>
                                <div className="card-body">
                                  <h5 className="card-title">{c.fullname}</h5>
                                  <p className="card-text">
                                    {c.gender.name}
                                    <br /> {c.phoneNumber}
                                    <br /> {c.email}
                                    <br />
                                    <br />
                                    specialization:
                                    <br />
                                    {c.specialization.map((s: any) => (
                                      <>
                                        - {s.name} <br />
                                      </>
                                    ))}
                                  </p>
                                  {isAppointed === false && (
                                    <div style={{ float: 'right' }}>
                                      <div>
                                        <input
                                          type="datetime-local"
                                          id="birthdaytime"
                                          name="birthdaytime"
                                          onChange={
                                            handleChangeDatetime_appoint
                                          }
                                          value={datetime_appoint}
                                        />
                                      </div>
                                      <br />
                                      <a
                                        className="btn btn-sm"
                                        style={{
                                          background: '#f36100',

                                          padding: '5px 25px',
                                        }}
                                        onClick={() =>
                                          handleOnJoinAppointment(
                                            c.id,
                                            datetime_appoint
                                          )
                                        }
                                      >
                                        APPOINTMENT
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Schedule
