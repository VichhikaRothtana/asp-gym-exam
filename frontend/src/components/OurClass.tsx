const OurClass = () => {
  const class1 = require('../assets/images/classes/class-1.jpg')
  const class2 = require('../assets/images/classes/class-2.jpg')
  const class3 = require('../assets/images/classes/class-3.jpg')
  const class4 = require('../assets/images/classes/class-4.jpg')
  const class5 = require('../assets/images/classes/class-5.jpg')

  return (
    <section className="classes-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>Our Classes</span>
              <h2>WHAT WE CAN OFFER</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="class-item">
              <div className="ci-pic">
                <img src={class1} alt="" />
              </div>
              <div className="ci-text">
                <span>STRENGTH</span>
                <h5>Weightlifting</h5>
                <a href="#">
                  <i className="fa fa-angle-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="class-item">
              <div className="ci-pic">
                <img src={class2} alt="" />
              </div>
              <div className="ci-text">
                <span>Cardio</span>
                <h5>Indoor cycling</h5>
                <a href="#">
                  <i className="fa fa-angle-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="class-item">
              <div className="ci-pic">
                <img src={class3} alt="" />
              </div>
              <div className="ci-text">
                <span>STRENGTH</span>
                <h5>Kettlebell power</h5>
                <a href="#">
                  <i className="fa fa-angle-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="class-item">
              <div className="ci-pic">
                <img src={class4} alt="" />
              </div>
              <div className="ci-text">
                <span>Cardio</span>
                <h4>Indoor cycling</h4>
                <a href="#">
                  <i className="fa fa-angle-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="class-item">
              <div className="ci-pic">
                <img src={class5} alt="" />
              </div>
              <div className="ci-text">
                <span>Training</span>
                <h4>Boxing</h4>
                <a href="#">
                  <i className="fa fa-angle-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurClass
