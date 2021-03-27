import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import AboutScreen from './screens/AboutScreen'
import PetListScreen from './screens/PetListScreen'
import ContactScreen from './screens/ContactScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import VerifyEmailScreen from './screens/VerifyEmailScreen'

const App = () => {
   return (
      <Router>
         <Header />
         <main>
            <Route path='/' exact component={HomeScreen} />
            <Route path='/about' exact component={AboutScreen} />
            <Route path='/pets' exact component={PetListScreen} />
            <Route path='/contact' exact component={ContactScreen} />
            <Route path='/register' exact component={RegisterScreen} />
            <Route path='/login' exact component={LoginScreen} />
            <Route
               path='/email-verification'
               exact
               component={VerifyEmailScreen}
            />
         </main>
         <Footer />
      </Router>
   )
}

export default App
