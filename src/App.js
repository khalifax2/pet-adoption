import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import AboutScreen from './screens/AboutScreen'
import PetListScreen from './screens/PetListScreen'
import PetProfileScreen from './screens/PetProfileScreen'
import ContactScreen from './screens/ContactScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import VerifyEmailScreen from './screens/VerifyEmailScreen'
import ProfileScreen from './screens/ProfileScreen'
import ReservationScreen from './screens/ReservationScreen'
import DashboardScreen from './screens/DashboardScreen'
import AccountListScreen from './screens/AccountListScreen'
import AdminPetListScreen from './screens/AdminPetListScreen'
import AdminReservationList from './screens/AdminReservationList'
import EditAccountScreen from './screens/EditAccountScreen'
import EditPetScreen from './screens/EditPetScreen'
import MessageScreen from './screens/MessageScreen'
import MessageViewScreen from './screens/MessageViewScreen'

const App = () => {
   return (
      <Router>
         <Header />
         <main>
            <Route path='/' exact component={HomeScreen} />
            <Route path='/about' exact component={AboutScreen} />
            <Route path='/pets' exact component={PetListScreen} />
            <Route path='/pets/:id' exact component={PetProfileScreen} />
            <Route path='/contact' exact component={ContactScreen} />
            <Route path='/register' exact component={RegisterScreen} />
            <Route path='/login' exact component={LoginScreen} />
            <Route path='/profile' exact component={ProfileScreen} />
            <Route path='/r/:id' exact component={ReservationScreen} />
            <Route path='/r/:id/edit' exact component={ReservationScreen} />
            <Route path='/admin' exact component={DashboardScreen} />
            <Route path='/admin/accounts' exact component={AccountListScreen} />
            <Route
               path='/admin/accounts/:id'
               exact
               component={EditAccountScreen}
            />
            <Route path='/admin/animals' exact component={AdminPetListScreen} />
            <Route path='/admin/animals/:id' exact component={EditPetScreen} />
            <Route
               path='/admin/reservations'
               exact
               component={AdminReservationList}
            />
            <Route
               path='/admin/reservations'
               exact
               component={AdminReservationList}
            />
            <Route path='/admin/messages' exact component={MessageScreen} />
            <Route
               path='/admin/messages/:id'
               exact
               component={MessageViewScreen}
            />
            <Route path='/email-verification' component={VerifyEmailScreen} />
         </main>
         <Footer />
      </Router>
   )
}

export default App
