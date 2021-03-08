import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Mood from '@material-ui/icons/Mood'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import ShoppingCart from '@material-ui/icons/ShoppingCartOutlined'
import Button from '@material-ui/core/Button'

import {logout} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export const NavBar = ({isLoggedIn, handleLogout}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = evt => {
    setAnchorEl(evt.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* menu icon (currently no functionality) */}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          {/* site name */}
          <Typography variant="h6" className={classes.title}>
            Graceful Jeans
          </Typography>

          {/* if user is logged in, render account button, else render login button  */}
          {isLoggedIn ? (
            <div>
              {/* user account button (with drop down menu) */}
              <IconButton
                aria-label="account of current user"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <Mood />
              </IconButton>
              {/* drop down menu functionality */}
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My Account</MenuItem>
                <MenuItem component={Link} to="/orderhistory">
                  Order History
                </MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </div>
          ) : (
            // login button
            <Link to="/login">
              <Button color="primary" variant="contained" disableElevation>
                Login
              </Button>
            </Link>
          )}

          <div>
            {/* cart button */}
            <Link to="/cart" style={{color: 'white'}}>
              <IconButton
                aria-label="cart of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                variant="contained"
              >
                <ShoppingCart />
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapState = state => ({
  isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
  handleLogout: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(NavBar)
