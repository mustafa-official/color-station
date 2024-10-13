import wp from "../assets/wp.png";
import home from "../assets/home.png";
import chart from "../assets/chart.png";
import avater from "../assets/Avatar.png";
const TopNavbar = () => {
  return (
    <div className="top-nav">
      <div className="sidebar-logo">
        <img id="wp-img" src={wp} alt="" />
        <img id="home-img" src={home} alt="" />
        <p className="academylmsrevamp">Academylmsrevamp</p>
        <div className="sidebar-insights">
          <img id="home-img" src={chart} alt="" />
          <p className="academylmsrevamp">Insights</p>
        </div>
      </div>
      <div className="wptest">
        <p className="academylmsrevamp">Wptest1</p>
        <img id="avater-img" src={avater} alt="" />
      </div>
    </div>
  );
};

export default TopNavbar;
