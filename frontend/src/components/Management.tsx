import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import moment from 'moment'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Management = () => {
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [genderId, setGenderId] = useState()
  const [dateOfBirth, setDateOfBirth] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [email, setEmail] = useState()
  const [toggleState, setToggleState] = useState(0)
  const [isAppointed, setIsAppointed] = useState(true)
  const [showJoin, setShowJoin] = useState(true)
  const [groups, setGroups] = useState([])
  const [customer, setCustomer] = useState([])
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
    const { data } = await axios.get(`/api/user/?type=stuff&role=coach`)
    data.pop()
    data.pop()
    setTrainers(data)
  }
  const handleCustomer = async () => {
    const { data } = await axios.get(`/api/user/?type=customer&role=customer`)
    console.log(data)
    setCustomer(data)
  }

  const handleOnAppointment = async () => {
    var { data } = await axios.get(`/api/user/?type=stuff&role=coach`)
    console.log(data)
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
  const hanldeOnCustomerEdit = async (fn: any, ln: any, cus_id: any) => {
    const { data } = await axios.put(`/api/user/${cus_id}`, {
      firstname: fn,
      lastname: ln,
      username: `${fn}${ln}`,
      password: '@ASDasd123@',
      email: 'customer3@gym.com',
      phoneNumber: '987654321',
      dateOfBirth: '2022-06-29',
      genderId: '1',
    } as any)
    setShowJoin(false)
    handleCustomer()
    console.log(data)
  }
  const handleAddCustomer = async () => {
    const { data } = await axios.post(`/api/authentication/registercustomer`, {
      firstname,
      lastname,
      username: `${firstname}${lastname}`,
      password: '@ASDasd123@',
      email: 'customer3@gym.com',
      phoneNumber: '987654321',
      dateOfBirth: '2022-06-29',
      genderId: '1',
    } as any)
    setShowJoin(false)
    handleCustomer()
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
                <h2>Management</h2>
                <div className="bt-option">
                  <a href="/">Home</a>
                  <span>Management</span>
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
                <span>Administration</span>
                <h2>Administration</h2>
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
                        id="vert-tabs-trainer-tab"
                        data-toggle="pill"
                        href="#vert-tabs-trainer"
                        role="tab"
                        aria-controls="vert-tabs-trainer"
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
                        id="vert-tabs-group-training-tab"
                        data-toggle="pill"
                        href="#vert-tabs-group-training"
                        role="tab"
                        aria-controls="vert-tabs-group-training"
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
                        id="vert-tabs-customer-tab"
                        data-toggle="pill"
                        href="#vert-tabs-customer"
                        role="tab"
                        aria-controls="vert-tabs-customer"
                        onClick={() => {
                          toggleTab(4)
                          handleCustomer()
                        }}
                        style={{
                          backgroundColor: toggleState === 4 ? '#f36100' : '',
                          color: 'white',
                          border: '1px solid #363636',
                        }}
                      >
                        Customer
                      </a>
                    </div>
                  </div>
                  <div className="col-7 col-sm-9">
                    <div className="tab-content" id="vert-tabs-tabContent">
                      <div
                        className="tab-pane text-left fade show active"
                        id="vert-tabs-trainer"
                        role="tabpanel"
                        aria-labelledby="vert-tabs-trainer-tab"
                      >
                        {trainers.length > 0 && (
                          <button
                            className="btn btn-sm"
                            style={{
                              color: 'white',
                              background: '#f36100',
                              padding: '5px 25px',
                              marginBottom: '10px',
                            }}
                          >
                            ADD
                          </button>
                        )}

                        {trainers.map((trainer: any) => (
                          <div key={trainer.id}>
                            <div className="card text-white bg-dark ">
                              <h5 className="card-header">
                                {trainer.fullname}
                              </h5>
                              <div className="card-body">
                                <p className="card-text">
                                  Date of Birth: {trainer.dateOfBirth} <br />
                                </p>
                                <p className="card-text">
                                  Phone number: {trainer.phoneNumber} <br />
                                </p>
                                <p className="card-text">
                                  Email: {trainer.email} <br />
                                </p>
                                <p className="card-text">
                                  Gender: {trainer.gender.name} <br />
                                </p>
                                <p className="card-text">
                                  specialization:
                                  {trainer.specialization.map((ts: any) => (
                                    <> {ts.name} </>
                                  ))}
                                </p>
                                <a
                                  className="btn-sm"
                                  style={{
                                    background: '#f36100',
                                    float: 'right',
                                    padding: '5px 25px',
                                  }}
                                  onClick={() =>
                                    handleOnJoinTraining(trainer.id)
                                  }
                                >
                                  EDIT
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="vert-tabs-group-training"
                        role="tabpanel"
                        aria-labelledby="vert-tabs-group-training-tab"
                      >
                        <button
                          className="btn btn-sm"
                          style={{
                            color: 'white',
                            background: '#f36100',
                            padding: '5px 25px',
                            marginBottom: '10px',
                          }}
                        >
                          ADD
                        </button>
                        {groups.map((group: any, index) => (
                          <div key={group.id}>
                            <div className="card text-white bg-dark ">
                              <h5 className="card-header">{group.name}</h5>
                              <div className="card-body">
                                <h5 className="card-title">
                                  By: {group.trainer.fullname}
                                </h5>
                                <p className="card-text">
                                  Limitation: {group.limitation} <br />
                                </p>
                                <a
                                  className="btn-sm"
                                  style={{
                                    background: '#f36100',
                                    float: 'right',
                                    padding: '5px 25px',
                                  }}
                                  onClick={() => handleOnJoinTraining(group.id)}
                                >
                                  EDIT
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="vert-tabs-customer"
                        role="tabpanel"
                        aria-labelledby="vert-tabs-customer-tab"
                      >
                        <button
                          type="button"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                          className="btn btn-sm"
                          style={{
                            color: 'white',
                            background: '#f36100',
                            padding: '5px 25px',
                            marginBottom: '10px',
                          }}
                        >
                          ADD
                        </button>

                        {/* Modal */}
                        <div
                          className="modal fade"
                          id="exampleModalCenter"
                          tabIndex={-1}
                          role="dialog"
                          aria-labelledby="exampleModalCenterTitle"
                          aria-hidden="true"
                        >
                          <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                          >
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLongTitle"
                                >
                                  Add Customer
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                {' '}
                                <div className="col-lg-6">
                                  <div className="leave-comment">
                                    <form action="#">
                                      <input
                                        type="text"
                                        style={{ color: 'black' }}
                                        placeholder="Firstname"
                                        defaultValue={firstname}
                                        onChange={(e) =>
                                          setFirstName(e.target.value)
                                        }
                                      />

                                      <input
                                        type="text"
                                        style={{ color: 'black' }}
                                        placeholder="Lastname"
                                        defaultValue={lastname}
                                        onChange={(e) =>
                                          setLastName(e.target.value)
                                        }
                                      />
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  data-dismiss="modal"
                                  onClick={handleAddCustomer}
                                >
                                  Save changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {customer.map((customer: any, index) => (
                          <div
                            key={customer.id}
                            style={{ marginBottom: '10px' }}
                          >
                            <div className="card text-white bg-dark ">
                              <h5 className="card-header">
                                {customer.fullname}
                              </h5>
                              <div className="card-body">
                                <p className="card-text">
                                  Firstname: {customer.firstname}
                                </p>
                                <p className="card-text">
                                  Lastname: {customer.lastname}
                                </p>
                                <a
                                  className="btn-sm"
                                  data-toggle="modal"
                                  data-target={`#exampleModalCenter${customer.id}`}
                                  style={{
                                    background: '#f36100',
                                    float: 'right',
                                    padding: '5px 25px',
                                  }}
                                >
                                  EDIT
                                </a>

                                {/* Modal */}
                                <div
                                  className="modal fade"
                                  id={`exampleModalCenter${customer.id}`}
                                  tabIndex={-1}
                                  role="dialog"
                                  aria-labelledby="exampleModalCenterTitle12"
                                  aria-hidden="true"
                                >
                                  <div
                                    className="modal-dialog modal-dialog-centered"
                                    role="document"
                                  >
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id="exampleModalLongTitle"
                                        >
                                          Edit Customer
                                        </h5>
                                        <button
                                          type="button"
                                          className="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                        >
                                          <span aria-hidden="true">×</span>
                                        </button>
                                      </div>
                                      <div className="modal-body">
                                        {' '}
                                        <div className="col-lg-6">
                                          <div className="leave-comment">
                                            <form action="#">
                                              <input
                                                type="text"
                                                style={{ color: 'black' }}
                                                placeholder="Firstname"
                                                defaultValue={
                                                  customer.firstname
                                                }
                                                onChange={(e) =>
                                                  setFirstName(e.target.value)
                                                }
                                              />

                                              <input
                                                type="text"
                                                style={{ color: 'black' }}
                                                placeholder="Lastname"
                                                defaultValue={customer.lastname}
                                                onChange={(e) =>
                                                  setLastName(e.target.value)
                                                }
                                              />
                                            </form>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          data-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          data-dismiss="modal"
                                          onClick={() =>
                                            hanldeOnCustomerEdit(
                                              firstname,
                                              lastname,
                                              customer.id
                                            )
                                          }
                                        >
                                          Save changes
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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

export default Management
