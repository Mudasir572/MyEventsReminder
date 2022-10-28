
import './App.css';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Events from './components/Events';
import Calander from './components/Calander';
import { Routes, Route, } from "react-router-dom";
function App() {
  return (
    <div>
     <Navbar />
     
     
     <Routes>
     <Route  exact path="/"  element={ < Events/>}/>
     <Route  exact path="/events"  element={ < Events/>}/>
        <Route  exact path="/calander" element={< Calander/> }/>
        <Route  exact path="/createevent"  element={ <Form /> }/> 
     </Routes>
    </div>
  );
}

export default App;
