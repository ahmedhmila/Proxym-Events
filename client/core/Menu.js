import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Library from '@material-ui/icons/LocalLibrary'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'

const isPartActive = (history, path) => {
  if (history.pathname.includes(path))
    return {color: '#fffde7', backgroundColor: '#f57c00', marginRight:10}
  else
    return {color: '#616161', backgroundColor: '#fffde7', border:'1px solid #f57c00', marginRight:10}
}
const Menu = ({history}) => (
  <AppBar position="fixed" style={{zIndex:12343455}}>
    <Toolbar>
      <Typography variant="h6" color="inherit"> Proxym Clubs management </Typography>
      <div>
        <Link to="/">
          <IconButton aria-label="Home">
            <HomeIcon/>
          </IconButton>
        </Link>
      </div>
      <div style={{'position':'absolute', 'right': '10px'}}><span style={{'float': 'right'}}>
      {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button >Sign up
            </Button>
          </Link>
          <Link to="/signin">
            <Button>Sign In</Button>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
          {auth.isAuthenticated().user.admin && (<Link to="/teach/evenmts"><Button><Library/>Create</Button></Link>)}
          <Link to={"/user/" + auth.isAuthenticated().user._id}><Button>My Profile</Button></Link>
          <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      }
      </span></div>
    </Toolbar>
  </AppBar>
)

export default Menu
