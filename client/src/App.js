import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import CandidateDashboard from './pages/CandidateDashboard'
import InstructorDashboard from './pages/InstructorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import QuizPage from './pages/QuizPage'
import Results from './pages/Results'

function App(){
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/candidate" element={<CandidateDashboard/>}/>
          <Route path="/instructor" element={<InstructorDashboard/>}/>
          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/quiz/:id" element={<QuizPage/>}/>
          <Route path="/results" element={<Results/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App