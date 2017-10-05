import { StackNavigator } from "react-navigation"

import Signup from "./Components/Signup/Signup"
import Login from "./Components/Login/Login"
import HomePage from "./Components/HomePage/homePage"
import Drawer from "./drawer"
import Polyline from "./Components/polyLine/polyLine"

const Nav = StackNavigator({


    AppRoute: { screen: Login },
    drawerRoute: { screen: Drawer },
    route: { screen: Signup },
    PolyLineRoute: { screen: Polyline }

})

export default Nav;
