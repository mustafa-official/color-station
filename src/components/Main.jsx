const Main = () => {
    return (
        <main>
        <div className="head-title">
          <div className="left">
            <h1>Dashboard</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>›</li>
              <li>
                <a className="active" href="#">Home</a>
              </li>
            </ul>
          </div>
          <a href="#" className="btn-download">
            <span className="text">Download PDF</span>
          </a>
        </div>
    
        <ul className="box-info">
          <li>
            <span className="text">
              <h3>1020</h3>
              <p>New Order</p>
            </span>
          </li>
          <li>
            <span className="text">
              <h3>2834</h3>
              <p>Visitors</p>
            </span>
          </li>
          <li>
            <span className="text">
              <h3>$2543</h3>
              <p>Total Sales</p>
            </span>
          </li>
        </ul>
    
        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Recent Orders</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Date Order</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src="img/people.png" alt="User" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td><span className="status completed">Completed</span></td>
                </tr>
                <tr>
                  <td>
                    <img src="img/people.png" alt="User" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td><span className="status pending">Pending</span></td>
                </tr>
                <tr>
                  <td>
                    <img src="img/people.png" alt="User" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td><span className="status process">Process</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="todo">
            <div className="head">
              <h3>Todos</h3>
            </div>
            <ul className="todo-list">
              <li className="completed">
                <p>Todo List</p>
              </li>
              <li className="completed">
                <p>Todo List</p>
              </li>
              <li className="not-completed">
                <p>Todo List</p>
              </li>
            </ul>
          </div>
        </div>
      </main>
    );
};

export default Main;