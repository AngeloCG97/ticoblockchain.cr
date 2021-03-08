import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import IconButton from '@material-ui/core/IconButton'
import { useTranslation } from 'react-i18next'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import LanguageSelector from 'components/LanguageSelector'

import styles from './styles'

const useStyles = makeStyles(styles)

const DashboardTopbar = ({ user, onLogout, onLogin }) => {
  const classes = useStyles()
  const { t } = useTranslation('translations')

  return (
    <Box className={classes.box}>
      <LanguageSelector />
      {user && (
        <Box>
          <IconButton color="inherit">
            <AccountCircleIcon />
            <Typography className={classes.sessionText} variant="subtitle1">
              {user.accountName}
            </Typography>
          </IconButton>
          <IconButton color="inherit" onClick={onLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      )}
      {!user && (
        <IconButton color="inherit" onClick={onLogin}>
          <FingerprintIcon />
          <Typography className={classes.sessionText} variant="subtitle1">
            {t('login')}
          </Typography>
        </IconButton>
      )}
    </Box>
  )
}

DashboardTopbar.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
  onLogin: PropTypes.func
}

export default DashboardTopbar
