import React, { useEffect } from "react";
import "./Home.css";

import UserIcon1 from "../../assets/user1.jpg";
import UserIcon2 from "../../assets/user2.jpg";

// components
import Navbar from "../../components/Navbar/Navbar";
import Search from "../../components/Search/Search";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="home">
        <Navbar />
        <div className="main-heading">
          <Search />
        </div>
      </div>
      <div className="locations">
        <div className="city-section">
          <h4>Find By Locations</h4>
          <p>Check out the property listings in the best cities here.</p>
          <div className="cities">
            <Link to="/hostel-pg-flats/noida">
              <div className="city-box noida">
                <div className="city">
                  <h4>Noida</h4>
                  <p>216 Room</p>
                </div>
              </div>
            </Link>
            <Link to="/hostel-pg-flats/patna">
              <div className="city-box patna">
                <div className="city">
                  <h4>Patna</h4>
                  <p>56 Room</p>
                </div>
              </div>
            </Link>
            <Link to="/hostel-pg-flats/varanasi">
              <div className="city-box varanasi">
                <div className="city">
                  <h4>Varanasi</h4>
                  <p>16 Room</p>
                </div>
              </div>
            </Link>
            <Link to="/hostel-pg-flats/jaipur">
              <div className="city-box jaipur">
                <div className="city">
                  <h4>Jaipur</h4>
                  <p>20 Room</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="more">
          <button>View More</button>
        </div>
      </div>
      <div className="site-datails">
        <div className="first">
          <p className="small">More than</p>
          <p className="big">4000 Students</p>
        </div>
        <div className="second">
          <p className="small">From over</p>
          <p className="big">5 Cities</p>
        </div>
        <div className="third">
          <p className="small">Book one of</p>
          <p className="big">300+ Verified Places</p>
        </div>
      </div>
      <div className="reviews">
        <h4>We don’t just claim. The testimonials speak for us.</h4>
        <p>
          Hear it from the people who have experienced a stay listed on our
          StudentCosy website. Here’s a glimpse of the quality of our listed
          properties.
        </p>
        <div className="user-review-section">
          <div className="user-review">
            <div className="img-section">
              <div className="user-img">
                <img src={UserIcon1} alt="user-review" />
              </div>
              <div className="user-detail">
                <h5>Altaf Raja</h5>
                <p>Galgotias University</p>
              </div>
            </div>
            <div className="review-text">
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              repellendus tempora quasi aspernatur dolorum cum velit blanditiis
              dolor esse iure! Illo eum consectetur assumenda voluptatum neque
              commodi quas, perferendis perspiciatis ex dolorum eius possimus ad
              pariatur ipsa porro non, itaque corporis veniam sunt culpa saepe.
              Nihil eius odit sint laudantium!"
            </div>
          </div>
          <div className="user-review">
            <div className="img-section">
              <div className="user-img">
                <img src={UserIcon2} alt="user-review" />
              </div>
              <div className="user-detail">
                <h5>Babu Ali</h5>
                <p>Noida International Univesity</p>
              </div>
            </div>
            <div className="review-text">
              "Consectetur assumenda voluptatum neque commodi quas, perferendis
              perspiciatis ex dolorum eius possimus ad pariatur ipsa porro non,
              itaque corporis veniam sunt culpa saepe. Nihil eius odit sint
              laudantium"
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
