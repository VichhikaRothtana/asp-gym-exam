import Layout from './components/Layout'
import Missing from './components/Missing'
import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './views/pages/LandingPage'
import LoginPage from './views/pages/LoginPage'
import PersistLogin from './components/PersistLogin'
import RequireAuth from './components/RequireAuth'
import OurClass from './components/OurClass'
import Appointment from './components/Appointment'
import Settings from './views/pages/Settings'
import Logout from './components/Logout'
import Schedule from './components/Schedule'
import Management from './components/Management'

const ROLES = {
  Supervisor: 'Supervisor',
  Admin: 'Admin',
  Customer: 'Customer',
  Coach: 'Coach',
  HeadCoach: 'Head Coach',
  SeniorCoach: 'Senior Coach',
  SeniorSupervisor: 'Senior Supervisor',
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<RequireAuth allowedRoles={[ROLES.Customer]} />}>
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Customer]} />}>
          <Route path="/schedule" element={<Schedule />} />
        </Route>
        <Route
          element={<RequireAuth allowedRoles={[ROLES.SeniorSupervisor]} />}
        >
          <Route path="/management" element={<Management />} />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[
                ROLES.Coach,
                ROLES.Customer,
                ROLES.Supervisor,
                ROLES.SeniorSupervisor,
              ]}
            />
          }
        >
          <Route path="/logout" element={<Logout />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Customer]} />}>
          <Route path="/ourclass" element={<OurClass />} />
        </Route>
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route> */}

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
