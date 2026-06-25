import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ProtectedRoute  from './components/ProtectedRoute'

import CreateQuiz from './pages/CreateQuiz'
import Login from './pages/Login'
import Register from './pages/Register'
import CandidateDashboard from './pages/CandidateDashboard'
import InstructorDashboard from './pages/InstructorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import QuizPage from './pages/QuizPage'
import Results from './pages/Results'
import EditQuiz from './pages/EditQuiz'


function App(){
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/candidate"  element={
    <ProtectedRoute allowedRoles={['candidate']}>
      <CandidateDashboard />
    </ProtectedRoute>
  }/>
          <Route path="/instructor" element={
    <ProtectedRoute allowedRoles={['instructor']}>
      <InstructorDashboard />
    </ProtectedRoute>
  }/>
          <Route path="/admin" element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminDashboard />
    </ProtectedRoute>
  }/>
          <Route
          path="/create-quiz"
          element={
          <ProtectedRoute allowedRoles={['instructor']}>
            <CreateQuiz />
           </ProtectedRoute>
         }
/>
          <Route path="/edit-quiz/:id" element={
            <ProtectedRoute allowedRoles={['instructor']}>
                <EditQuiz/>
            </ProtectedRoute>
          }/>
          <Route path="/quiz/:id" element={<QuizPage/>}/>
          <Route path="/results" element={<Results/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App