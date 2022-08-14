import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ChooseUs from '../../components/ChooseUs'
import Appointment from '../../components/Appointment'
import Carousel from '../../components/Carousel'
import GetInTouch from '../../components/GetInTouch'
import OurClass from '../../components/OurClass'
import RegisterHere from '../../components/RegisterHere'
import OurPlan from '../../components/OurPlan'

export const LandingPage = () => {
  return (
    <>
      <Header />
      <Carousel />
      <ChooseUs />
      <OurClass />
      <RegisterHere />
      <OurPlan />
      <Appointment/>
      <GetInTouch />
      <Footer />
    </>
  )
}
