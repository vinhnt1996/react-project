import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "./components/HeaderComponent";
import TableUserListComponent from "./components/TableUserListComponent";
function App() {
  return (
    <div className="app-container">
      <HeaderComponent></HeaderComponent>
      <TableUserListComponent />
    </div>
  );
}

export default App;
