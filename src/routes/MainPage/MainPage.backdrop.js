import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useLocation } from 'react-router-dom'
import { Backdrop } from '@eoscostarica/eoscr-components'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import FrontLayer from '../FrontLayer'
import styles from '../styles'

const STATIC_PAGES = ['/product']

const useStyles = makeStyles(styles)

const MainPageBackdrop = () => {
  const { t, i18n } = useTranslation('translations')
  const theme = useTheme()
  const classes = useStyles()
  const location = useLocation()
  const [title, setTitle] = useState('headerTitle')
  const [layerHeightUp, setLayerHeightUp] = useState(51)
  const [isStaticPage, setIsStaticPage] = useState(false)
  const [message, setMessage] = useState()
  const isLandscape = useMediaQuery('(orientation: landscape)')
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'), {
    defaultMatches: true
  })

  const height = window.innerHeight

  useEffect(() => {
    if (STATIC_PAGES.includes(location.pathname)) {
      setLayerHeightUp(isLandscape && height < 450 ? 150 : 270)
      setTitle('')
      setIsStaticPage(true)

      return
    }

    setIsStaticPage(false)

    if (isMobile) {
      setTitle('headerTitle')
      setLayerHeightUp(60)

      return
    }

    setLayerHeightUp(isLandscape && height < 450 ? 80 : 470)
    setTitle('headerTitle')
  }, [isMobile, location.pathname, isLandscape, height])

  useEffect(() => {
    if (STATIC_PAGES.includes(location.pathname)) {
      setTitle('')
    } else {
      setTitle('headerTitle')
    }
  }, [i18n.language, location.pathname])

  return (
    <Backdrop
      className={classes.backdrop}
      classes={{
        frontLayer: classes.frontLayerRoot,
        root: classes.root,
        backLayer: classes.backLayer,
        headerBox:
          isStaticPage || isMobile || (isLandscape && height < 450)
            ? classes.headerBox
            : classes.headerBoxNone
      }}
      backLayer={
        <>
          <Snackbar
            open={!!message}
            autoHideDuration={30000}
            onClose={() => setMessage(null)}
          >
            <Alert
              onClose={() => setMessage(null)}
              severity={message?.type}
              className={classes?.alert}
            >
              {message?.content}
            </Alert>
          </Snackbar>
        </>
      }
      frontLayer={<FrontLayer />}
      headerText={
        <Typography className={classes.labelBackdrop}>{t(title)}</Typography>
      }
      layerHeightUp={layerHeightUp}
      isStaticPage={isStaticPage}
    />
  )
}

export default MainPageBackdrop
