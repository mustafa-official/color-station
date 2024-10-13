import dashboard from "../assets/dashboard.png";
import group from "../assets/Group.png";
const Sidebar = () => {
  return (
    <section id="sidebar">
      <div>
        <ul className="side-menu top">
          <li>
            <a href="#" className="dashboard-logo">
              <img className="dashboard-icon" src={dashboard} alt="" />
              <a className="text">Dashboard</a>
            </a>
          </li>
          <li className="active">
            <a href="#" className="dashboard-logo">
              <img className="group-icon" src={group} alt="" />
              <a className="text">Academy LMS</a>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="text analytics">Analytics</span>
            </a>
          </li>
          <hr className="line" />
          <li>
            <a href="#">
              <span className="text">Analytics</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="text">Course</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="text">Lessons</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="text">Quizzes</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="text">Meeting</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="text">Tutor booking</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="text">Assignment</span>
            </a>
          </li>
          <hr className="line" />
          <li>
            <a href="#">
              <span className="text">Announcement</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="text">Question & Answer</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="text">Withdraw Requests</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="text">Instructors</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="text">Students</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="text">Add-ons</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="text">Tools</span>
            </a>
          </li>
          <hr className="line" />
          <li>
            <a href="#">
              <span className="text">Settings</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;
