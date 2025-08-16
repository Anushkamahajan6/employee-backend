import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Employeeform from "./MyComponents/Employeeform";
import EmployeeList from "./MyComponents/EmployeeList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <EmployeeList />
    </>
  );
}

export default App;
