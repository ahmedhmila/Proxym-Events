import React from 'react'
import {Route,  Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import NewEvenmt from './evenmts/NewEvenmt'

import Evenmt from './evenmts/Evenmt'
import EditEvenmt from './evenmts/EditEvenmt'
import Enrollment from './enrollment/Enrollment'
import MyEvenmts from './evenmts/MyEvenmts.js'

const MainRouter = () => {
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
        <Route path="/evenmt/:evenmtId" component={Evenmt}/>
        <PrivateRoute path="/teach/evenmts" component={MyEvenmts}/>
        
        <PrivateRoute path="/teach/evenmt/new" component={NewEvenmt}/>
        <PrivateRoute path="/teach/evenmt/edit/:evenmtId" component={EditEvenmt}/>
        <PrivateRoute path="/teach/evenmt/:evenmtId" component={Evenmt}/>
        <PrivateRoute path="/learn/:enrollmentId" component={Enrollment}/>

      </Switch>
    </div>)
}

export default MainRouter
