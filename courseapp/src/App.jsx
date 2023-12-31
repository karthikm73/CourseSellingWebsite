import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import {
  RecoilRoot
} from 'recoil';
import EditCourse from './components/EditCourse';
import Appbar  from './components/Appbar';

function App() {


  return <>
    

    <RecoilRoot>
      <Router>
        <Appbar />
        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/createcourse" element={<CreateCourse />} />
          <Route path="/course/:id" element={<EditCourse />} />

        </Routes>
      </Router>
    </RecoilRoot>

  </>


}

export default App
