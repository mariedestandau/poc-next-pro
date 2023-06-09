import { Card } from '@material-ui/core'
import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import React from 'react'

import {
  SubscriptionItemModel,
  SubscriptionStep,
  UserRole,
} from '../../../TypesFromApi'

import { BeneficiaryBadge } from './BeneficiaryBadge'
import { StatusAvatar } from './StatusAvatar'

type Props = {
  role: UserRole
  subscriptionItem: Array<SubscriptionItemModel>
}

export const UserHistoryCard = ({ role, subscriptionItem }: Props) => {
  const cardStyle = {
    width: '100%',
    marginTop: '20px',
    padding: 30,
  }
  const gridStyle = { width: '100%', height: '100%', overflow: 'auto' }
  const beneficiaryBadge = <BeneficiaryBadge role={role} />

  return (
    <Card style={cardStyle}>
      <Typography variant={'h5'}>
        Parcours d'inscription
        <span style={{ marginLeft: '3rem' }}>{beneficiaryBadge}</span>
      </Typography>
      {subscriptionItem.length > 0 && (
        <Grid container spacing={5} sx={{ mt: 4 }} style={gridStyle}>
          <Grid item xs={6}>
            <List sx={{ width: '50%' }}>
              <ListItem>
                <ListItemText> Validation email</ListItemText>
                <ListItemAvatar>
                  <StatusAvatar
                    item={subscriptionItem.find(
                      subscriptionItem =>
                        subscriptionItem.type ===
                        SubscriptionStep.EmailValidation
                    )}
                  />
                </ListItemAvatar>
              </ListItem>
              <ListItem>
                <ListItemText>Validation Téléphone</ListItemText>
                <ListItemAvatar>
                  <StatusAvatar
                    item={subscriptionItem.find(
                      item => item.type === SubscriptionStep.PhoneValidation
                    )}
                  />
                </ListItemAvatar>
              </ListItem>
              <ListItem>
                <ListItemText>Profil Utilisateur</ListItemText>
                <ListItemAvatar>
                  <StatusAvatar
                    item={subscriptionItem.find(
                      item => item.type === SubscriptionStep.UserProfiling
                    )}
                  />
                </ListItemAvatar>
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={6}>
            <List sx={{ width: '50%' }}>
              <ListItem>
                <ListItemText>Complétion Profil</ListItemText>
                <ListItemAvatar>
                  <StatusAvatar
                    item={subscriptionItem.find(
                      item => item.type === SubscriptionStep.ProfileCompletion
                    )}
                  />
                </ListItemAvatar>
              </ListItem>
              <ListItem>
                <ListItemText>ID Check</ListItemText>
                <ListItemAvatar>
                  <StatusAvatar
                    item={subscriptionItem.find(
                      item => item.type === SubscriptionStep.IdentityCheck
                    )}
                  />
                </ListItemAvatar>
              </ListItem>
              <ListItem>
                <ListItemText>Honor Statement</ListItemText>
                <ListItemAvatar>
                  <StatusAvatar
                    item={subscriptionItem.find(
                      item => item.type === SubscriptionStep.HonorStatement
                    )}
                  />
                </ListItemAvatar>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    </Card>
  )
}
