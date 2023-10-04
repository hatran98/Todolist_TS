import TodoPage from "./pages/TodoPage"
import {Routes, Route} from "react-router-dom"
function App() {
  return (
    <>
 <Routes>
  <Route path ="/" element = {<TodoPage/>}></Route>
 </Routes>
    </>
  )
}

export default App
