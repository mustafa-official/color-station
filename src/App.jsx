import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";

function App() {
  return (
    <div>
      <TopNavbar />
      <div>
        <Sidebar />
        <section id="content">
          <Main />
        </section>
      </div>
    </div>
  );
}

export default App;
