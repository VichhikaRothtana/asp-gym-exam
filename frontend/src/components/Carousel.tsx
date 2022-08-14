import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
const Carousel = () => {
  const hero1 = require('../assets/images/hero/hero-1.jpg')
  const hero2 = require('../assets/images/hero/hero-2.jpg')

  return (
    <>
      <section className="hero-section" style={{ margin: 0 }}>
        <OwlCarousel
          style={{ margin: 0 }}
          className="hs-slider owl-carousel"
          items={1}
          loop
          autoplay
          nav
          navText={[
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>",
          ]}
          dots={false}
        >
          <div
            className="item hs-item set-bg"
            style={{ backgroundImage: `url(${hero1})` }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6 offset-lg-6">
                  <div className="hi-text">
                    <span>Shape your body</span>
                    <h1>
                      Be <strong>strong</strong> traning hard
                    </h1>
                    <a href="#" className="primary-btn">
                      Get info
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="item hs-item set-bg"
            style={{ backgroundImage: `url(${hero2})` }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6 offset-lg-6">
                  <div className="hi-text">
                    <span>Shape your body</span>
                    <h1>
                      Be <strong>strong</strong> traning hard
                    </h1>
                    <a href="#" className="primary-btn">
                      Get info
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OwlCarousel>
      </section>
    </>
  )
}

export default Carousel
