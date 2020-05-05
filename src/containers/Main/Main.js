import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import FingerprintIcon from '@material-ui/icons/Fingerprint'

import config from '../../config'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 72,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 88
    }
  },
  shiftContent: {
    paddingLeft: 264
  },
  appBar: {
    boxShadow: 'none'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  logo: {
    height: 36
  },
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  drawerContent: {
    backgroundColor: theme.palette.white,
    height: '100%',
    padding: theme.spacing(2)
  }
}))

const MenuOption = ({ ual, handleSidebarOpen }) => {
  const { appUseUAL } = config

  if (!appUseUAL || ual.activeUser)
    return (
      <IconButton color="inherit" onClick={handleSidebarOpen}>
        <MenuIcon />
      </IconButton>
    )

  return (
    <IconButton color="inherit" onClick={() => ual.showModal()}>
      <FingerprintIcon />
    </IconButton>
  )
}

const Main = ({ children, sidebarContent, topbarContent, ual }) => {
  const classes = useStyles()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  })

  const [openSidebar, setOpenSidebar] = useState(false)

  const handleSidebarOpen = () => {
    setOpenSidebar(true)
  }

  const handleSidebarClose = () => {
    setOpenSidebar(false)
  }

  const shouldOpenSidebar = isDesktop ? true : openSidebar

  return (
    <Container
      component="main"
      maxWidth="xl"
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <RouterLink to="/">
            <img
              className={classes.logo}
              alt="Logo"
              src="https://eoscostarica.io/wp-content/uploads/2019/07/EOSCRlogo-main-darkOverWhite-1.png"
            />
          </RouterLink>
          <Hidden mdDown>{topbarContent}</Hidden>
          <Hidden lgUp>
            <MenuOption ual={ual} handleSidebarOpen={handleSidebarOpen} />
          </Hidden>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawer }}
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      >
        <div className={classes.drawerContent}>{sidebarContent}</div>
      </Drawer>
      {children}
    </Container>
  )
}

Main.propTypes = {
  children: PropTypes.node,
  sidebarContent: PropTypes.node,
  topbarContent: PropTypes.node,
  ual: PropTypes.object
}

MenuOption.propTypes = {
  ual: PropTypes.object,
  handleSidebarOpen: PropTypes.func
}

export default Main
