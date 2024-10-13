const Navbar = () => {
  return (
    <nav>
      <a href="#" className="nav-link">
        Categories
      </a>
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn">
            Search
          </button>
        </div>
      </form>
      <input type="checkbox" id="switch-mode" hidden />
      <label htmlFor="switch-mode" className="switch-mode"></label>
      <a href="#" className="notification">
        <span className="num">8</span>
      </a>
      <a href="#" className="profile">
        <img src="img/people.png" alt="Profile" />
      </a>
    </nav>
  );
};

export default Navbar;
