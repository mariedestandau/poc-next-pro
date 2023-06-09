import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, Menu, MenuItem } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useNotify } from 'react-admin'

import {
  getGenericHttpErrorMessage,
  getHttpApiErrorMessage,
  PcApiHttpError,
} from '../../../providers/apiHelpers'
import { apiProvider } from '../../../providers/apiProvider'

import { RejectOffererModal } from './RejectOffererModal'
import { SetPendingOffererModal } from './SetPendingOffererModal'

type Props = {
  id: number
  onContextMenuChange: () => void
}

export const OfferersToValidateContextTableMenu = React.memo(
  ({ id, onContextMenuChange }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const notify = useNotify()
    const open = Boolean(anchorEl)
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
      },
      [setAnchorEl]
    )
    const handleClose = useCallback(() => {
      setAnchorEl(null)
    }, [setAnchorEl])
    const onMenuItemClicked = useCallback(() => {
      handleClose()
      onContextMenuChange()
    }, [handleClose, onContextMenuChange])
    return (
      <>
        <IconButton
          aria-label={'more'}
          id={'long-button' + id}
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          color={'error'}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            key="valider"
            onClick={async () => {
              try {
                await apiProvider().validateOfferer({
                  offererId: id,
                })
                notify('Le rattachement a été validé avec succès !', {
                  type: 'success',
                })
              } catch (error) {
                if (error instanceof PcApiHttpError) {
                  notify(getHttpApiErrorMessage(error), { type: 'error' })
                } else {
                  notify(await getGenericHttpErrorMessage(error as Response), {
                    type: 'error',
                  })
                }
              } finally {
                onMenuItemClicked()
              }
            }}
          >
            Valider
          </MenuItem>
          <RejectOffererModal
            offererId={id}
            onContextMenuChange={onMenuItemClicked}
          />
          <SetPendingOffererModal
            offererId={id}
            onContextMenuChange={onMenuItemClicked}
          />
        </Menu>
      </>
    )
  }
)
