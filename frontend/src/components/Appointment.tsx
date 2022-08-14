import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
const Appointment = () => {
  const team1 = require('../assets/images/team/team-1.jpg')
  const team2 = require('../assets/images/team/team-2.jpg')
  const team3 = require('../assets/images/team/team-3.jpg')
  const team4 = require('../assets/images/team/team-4.jpg')
  const team5 = require('../assets/images/team/team-5.jpg')
  const team6 = require('../assets/images/team/team-6.jpg')
 

  const options = {
    loop: true,
    margin: 20,
    items: 3,
    dots: true,
    dotsEach: 2,
    smartSpeed: 1200,
    autoplay: true,
    responsive: {
      320: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  }
  return (
    <>
      <section className="team-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="team-title">
                <div className="section-title">
                  <span>Our Team</span>
                  <h2>TRAIN WITH EXPERTS</h2>
                </div>
                <a href="#" className="primary-btn btn-normal appoinment-btn">
                  appointment
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <OwlCarousel
              className="ts-slider owl-carousel"
              readOnly
              {...options}
            >
              <div className="col-lg-12">
                <div
                  className=" item ts-item set-bg"
                  style={{
                    height: `450px`,
                    position: `relative`,
                    overflow: `hidden`,
                    backgroundImage: `url(${team1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: `cover`,
                    backgroundPosition: ` top center`,
                  }}
                >
                  <div className="ts_text">
                    <h4>Athart Rachel</h4>
                    <span>Gym Trainer</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div
                  className="item ts-item set-bg"
                  style={{ backgroundImage: `url(${team2})` }}
                >
                  <div className="ts_text">
                    <h4>Athart Rachel</h4>
                    <span>Gym Trainer</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div
                  className="item ts-item set-bg"
                  style={{ backgroundImage: `url(${team3})` }}
                >
                  <div className="ts_text">
                    <h4>Athart Rachel</h4>
                    <span>Gym Trainer</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div
                  className="item ts-item set-bg"
                  style={{
                    backgroundImage: `url(${team4})`,
                  }}
                >
                  <div className="ts_text">
                    <h4>Athart Rachel</h4>
                    <span>Gym Trainer</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div
                  className="item ts-item set-bg"
                  style={{ backgroundImage: `url(${team5})` }}
                >
                  <div className="ts_text">
                    <h4>Athart Rachel</h4>
                    <span>Gym Trainer</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div
                  className="item ts-item set-bg"
                  style={{ backgroundImage: `url(${team6})` }}
                >
                  <div className="ts_text">
                    <h4>Athart Rachel</h4>
                    <span>Gym Trainer</span>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </section>
    </>
  )
}
export default Appointment
