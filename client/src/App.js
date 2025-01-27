import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  
} from "react-router-dom";


import "./styles/App.css";
import "preline/preline";

import ActivityLog from "./pages/ActivityLog";
import AddRoom from "./pages/AddRoom";
import AddSchedule from "./pages/AddSchedule";
import AdminViewRoom from "./pages/AdminViewRoom";
import BrowsingRoom from "./pages/BrowsingRoom";
import EditAccount from "./pages/EditAccount";
import EditRoom from "./pages/EditRoom";
import EditSchedule from "./pages/EditSchedule";
import EmailAuth from "./pages/EmailAuth.js";
import Faq from "./pages/Faq";
import GuestReservationTracking from "./pages/GuestReservationTracking";
import Inquiry from "./pages/Inquiry";
import LandingPage from "./pages/LandingPage";
import LogIn from "./pages/LogInPage";
import Notice from "./pages/NoticePage";
import PaymentPage from "./pages/PaymentPage";
import PrivacyPolicy from "./pages/PrivacyPolicy.js";
import RegistrationRequest from "./pages/RegistrationRequest";
import ReportSummary from "./pages/ReportSummary";
import Reservation from "./pages/Reservation";
import ReservationDetails from "./pages/ReservationDetails";
import ReservationManagement from "./pages/ReservationManagement";
import ReservationPolicy from "./pages/ReservationPolicy";
import RoomSchedule from "./pages/RoomSchedule";
import RoomDetails from "./pages/RoomDetails";
import RoomManagement from "./pages/RoomManagement";
import SignUp from "./pages/SignUpPage";
import TrackReservation from "./pages/TrackReservations";
import UserAccounts from "./pages/UserAccounts";
import AdminCalendar from "./pages/AdminCalendar";
import AdminCalendarRooms from "./pages/AdminCalendarRooms";
import ReservationDetailsUser from "./pages/ReservationDetailsUser.js";
import OhohPage from "./pages/OhohPage.js";
import OopsPage from "./pages/OopsPage.js";

function App() {
  // const [user, setUser] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] =useState(false);

  // Won't work unless App is wrapped inside a Router
  const location = useLocation();

  useEffect(() => {
    // Reinitialize components every time the location changes
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, [location.pathname]);

  return (

    <div className="App">
  
      <Routes>
       
      
        {/* Changed the route to the landing page so that it will go straight to that */}

        {/* PAGES FREE FOR GUESTS */}
        <Route path = '/' element={<LandingPage />}></Route>
        <Route path = '/room/:id' element={<RoomDetails />}></Route>
        <Route path = '/inquiry' element={<Inquiry />}></Route>
        <Route path = '/log-in' element={<LogIn />}></Route>
        <Route path = '/sign-up' element={<SignUp />}></Route>
        <Route path = '/sign-up/notice' element={<Notice />}></Route>
        <Route path = '/privacy-policy' element={<PrivacyPolicy />}></Route>
        <Route path = '/reservation' element={<Reservation />}></Route>
        <Route path = '/reservation-details/:id' element={<ReservationDetails />}></Route>

        {/* PAGES FREE FOR STUDENT ORG /. FACULTY */}


      
           {/* PAGES FREE FOR ADMINS */}
          <Route path = '/admin-view-room-info' element={<AdminViewRoom />}></Route>
         <Route path = '/room-management' element={<RoomManagement />}></Route>
      
        <Route path = '/edit-room' element={<EditRoom />}></Route>
        <Route path = '/add-room' element={<AddRoom />}></Route>
      
        <Route path = '/reservation-management' element={<ReservationManagement />}></Route>
      
        <Route path = '/upload-payment' element={<PaymentPage />}></Route>
        
        <Route path = '/browsing-room' element={<BrowsingRoom />}> </Route>   
        <Route path = '/registration-requests' element={<RegistrationRequest />}></Route>  
        <Route path = '/user-accounts' element={<UserAccounts />}></Route>
        <Route path = '/room-schedule' element={<RoomSchedule />}></Route>
        <Route path = '/edit-account' element={<EditAccount />}></Route>
        <Route path = '/browsing-room' element={<BrowsingRoom />}> </Route>    
        <Route path = '/add-sched' element={<AddSchedule/>}></Route>
        <Route path = '/edit-sched' element={<EditSchedule/>}></Route>
        <Route path = '/registration-requests' element={<RegistrationRequest />}></Route>  
        <Route path = '/user-accounts' element={<UserAccounts />}></Route>
        <Route path = '/edit-account' element={<EditAccount />}></Route>
        <Route path = '/reservation-policy' element={<ReservationPolicy />}> </Route>
        <Route path = '/faq' element={<Faq />}> </Route> 
        <Route path = '/guest-reservation-details' element={<GuestReservationTracking />}> </Route>
        <Route path = '/report-summary' element={<ReportSummary />}> </Route>
        <Route path = '/track-reservation' element={<TrackReservation />}> </Route>
        <Route path = '/reservation-details-user' element={<ReservationDetailsUser />}></Route>
        <Route path = '/report-activity-log' element={<ActivityLog/>}></Route>
        <Route
          path="/email-auth"
          element={<EmailAuth />}
          render={(props) => <EmailAuth {...props} />}
        />
        <Route path="/admin-calendar" element={<AdminCalendar />}></Route>
        <Route
          path="/admin-calendar/rooms"
          element={<AdminCalendarRooms />}
        ></Route>
        <Route path = '/unauthorized' element={<OhohPage />}></Route>
        <Route path = '/error' element={<OopsPage />}></Route>
        {/* Below is the calendar page */}
        <Route path = '/room-schedule/:id' element={<RoomSchedule/>}></Route>

      </Routes>
    </div>


  );
}

function AppWithRouter() {
  return (
    
    <Router>
      <App />
    </Router>
   
  );
}
export default AppWithRouter;