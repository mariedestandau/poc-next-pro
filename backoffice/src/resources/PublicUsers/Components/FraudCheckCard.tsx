import { Card } from '@material-ui/core'
import {
  Collapse,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import React, { useState } from 'react'

import { snakeCaseToTitleCase } from '../../../helpers/textTools'
import {
  EligibilitySubscriptionHistoryModel,
  IdCheckItemModel,
  UserRole,
} from '../../../TypesFromApi'

import { BeneficiaryBadge } from './BeneficiaryBadge'
import { FraudCheckStatusBadge } from './FraudCheckStatusBadge'

type Props = {
  role: UserRole
  eligibilityFraudCheck: EligibilitySubscriptionHistoryModel
}

export const FraudCheckCard = ({ role, eligibilityFraudCheck }: Props) => {
  const cardStyle = {
    maxwidth: '99vw',
    width: '100%',
    marginTop: '20px',
    padding: 30,
  }
  const gridStyle = {
    maxwidth: '99vw',
    width: '100%',
    height: '100%',
    overflow: 'scroll',
  }

  const [checked, setChecked] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const fraudCheckItem: IdCheckItemModel =
    eligibilityFraudCheck.idCheckHistory[0]

  let fraudCheckCreationDate = ''
  try {
    fraudCheckCreationDate = format(
      fraudCheckItem.dateCreated,
      'dd/MM/yyyy à HH:mm:s'
    )
  } catch (RangeError) {
    console.log(`unable to format date ${fraudCheckItem.dateCreated} as string`)
  }

  return (
    <Card style={cardStyle}>
      <Grid container spacing={1}>
        <Typography variant={'h5'}>
          {fraudCheckItem.type &&
            snakeCaseToTitleCase(fraudCheckItem.type as string)}
          <span style={{ marginLeft: '3rem' }}>
            <BeneficiaryBadge role={role} />
          </span>
        </Typography>
        <Grid container spacing={1} sx={{ mt: 4 }}>
          <Stack spacing={2} direction={'row'} style={{ width: '100%' }}>
            <Grid item xs={6}>
              <p>Date de création</p>
            </Grid>
            <Grid item xs={6}>
              <p data-testid="fraudCheckCreationDate">
                {fraudCheckCreationDate}
              </p>
            </Grid>
          </Stack>
          <Stack spacing={3} direction={'row'} style={{ width: '100%' }}>
            <Grid item xs={6}>
              <p>ID Technique</p>
            </Grid>
            <Grid item xs={6}>
              <p>{fraudCheckItem.thirdPartyId}</p>
            </Grid>
          </Stack>
          <Stack spacing={3} direction={'row'} style={{ width: '100%' }}>
            <Grid item xs={6}>
              <p>Statut</p>
            </Grid>
            <Grid>
              <div>
                {fraudCheckItem && fraudCheckItem.status && (
                  <>
                    <FraudCheckStatusBadge
                      fraudCheckStatus={fraudCheckItem.status}
                    />
                  </>
                )}
              </div>
            </Grid>
          </Stack>
          <Stack spacing={3} direction={'row'} style={{ width: '100%' }}>
            <Grid item xs={6}>
              <p>Explication</p>
            </Grid>
            <Grid item xs={6}>
              <p>{fraudCheckItem.reason}</p>
            </Grid>
          </Stack>
          <Stack spacing={3} direction={'row'} style={{ width: '100%' }}>
            <Grid item xs={6}>
              <p>Code d'erreurs</p>
            </Grid>
            <Grid item xs={6}>
              <p>{fraudCheckItem.reasonCodes && fraudCheckItem.reasonCodes}</p>
            </Grid>
          </Stack>

          <Stack spacing={3} direction={'row'} style={{ width: '100%' }}>
            <Grid item xs={6}>
              <p>Détails techniques</p>
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    name={fraudCheckItem.type}
                  />
                }
                label="Afficher les détails techniques"
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={0}>
                <Grid item style={gridStyle}>
                  <Collapse in={checked}>
                    <pre>
                      <code
                        data-testid="fraudCheckTechnicalDetails"
                        style={{ overflow: 'scroll' }}
                      >
                        {fraudCheckItem.technicalDetails &&
                          JSON.stringify(
                            fraudCheckItem.technicalDetails,
                            undefined,
                            4
                          )}
                      </code>
                    </pre>
                  </Collapse>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  )
}
