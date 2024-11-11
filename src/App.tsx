import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import LandingPage from "pages/LandingPage"
import ProjectsPage from "pages/ProjectsPage"
import ProjectPage from "pages/ProjectPage"
import TokenPage from "pages/TokenPage"
import UserPage from "pages/UserPage"
import Providers from "components/Providers"
import EventsPage from "./pages/EventsPage"
import AboutPage from "./pages/AboutPage"
import TermsOfServicePage from "./pages/TermsOfServicePage"
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage"

function App() {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route index element={<LandingPage/>}/>
          <Route path="collection" element={<ProjectsPage/>}/>
          <Route path="project/:contractAddress/:projectId" element={<ProjectPage/>}/>
          <Route path="token/:contractAddress/:id" element={<TokenPage/>}/>
          <Route path="user/:walletAddress" element={<UserPage/>}/>
          <Route path="events" element={<EventsPage/>}/>
          <Route path="about" element={<AboutPage/>}/>
          <Route path="termsOfService" element={<TermsOfServicePage/>}/>
          <Route path="privacyPolicy" element={<PrivacyPolicyPage/>}/>
        </Routes>
      </Router>
      <ToastContainer
        autoClose={10000}
        position="bottom-right"
        theme="dark"
        newestOnTop
        pauseOnHover
        pauseOnFocusLoss
      />
    </Providers>
  )
}

export default App
