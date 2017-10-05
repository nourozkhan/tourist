import { DrawerNavigator } from "react-navigation"
import HomePage from "./Components/HomePage/homePage"
import Nearby from "./Components/nearby/nearby"


const Drawer = DrawerNavigator({

    homeRoute: {
        screen: HomePage
    },
    NearbyRoute :{
        screen : Nearby
    },



})

export default Drawer;
