import { BrowserRouter as Router,Routes, Route } from "react-router-dom"
import { Main } from "./Pages/main/Main"
import { Login } from "./Pages/Login"
import { Navbar } from "./Components/Navbar"
import { CreatePost } from "./Pages/createpost/CreatePost"

function App() {


  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element ={<Main/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path="createpost" element = {<CreatePost/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
