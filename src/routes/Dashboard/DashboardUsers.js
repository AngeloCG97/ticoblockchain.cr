import React from 'react'
import { useTranslation } from 'react-i18next'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const Users = (props) => {
  const { t } = useTranslation('translations')

  return (
    <Grid item lg={12} sm={12} xl={12} xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h1">{t('commingSoon')}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

Users.propTypes = {}

export default Users
