import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Mood from '@material-ui/icons/Mood'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import ShoppingCart from '@material-ui/icons/ShoppingCartOutlined'

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

export const NavBar = () => {
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
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Graceful Jeans
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <Mood />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Order History</MenuItem>
              <MenuItem onClick={handleClose}>My Account</MenuItem>
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>

            <IconButton
              aria-label="cart of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              // onClick={console.log('cart clikced!')}
              color="inherit"
            >
              <ShoppingCart />
            </IconButton>
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
  handleClick: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(NavBar)
