/* istanbul ignore file */
import type { Story } from '@storybook/react'
import React from 'react'

import { ReactComponent as CircleArrowLeftIcon } from 'icons/ico-circle-arrow-left.svg'
import { ReactComponent as CircleArrowIcon } from 'icons/ico-circle-arrow.svg'
import { ReactComponent as LinkIcon } from 'icons/ico-external-site-filled.svg'
import { ReactComponent as PenIcon } from 'icons/ico-pen-black.svg'

import { withRouterDecorator } from '../../stories/decorators/withRouter'

import { ButtonVariant, IconPositionEnum, SharedButtonProps } from './types'

import { Button, ButtonLink } from './index'

export default {
  title: 'ui-kit/Button',
  decorators: [withRouterDecorator],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'ternary', 'quaternary', 'box'],
      control: 'radio',
    },
    iconPosition: {
      options: ['left', 'right'],
      control: 'radio',
    },
  },
}

const Template: Story<{
  children: string
  disabled: boolean
  variant: ButtonVariant
  Icon?: SharedButtonProps['Icon']
  iconPosition?: IconPositionEnum
  hasTooltip?: boolean
}> = args => (
  <div style={{ margin: '50px', display: 'flex' }}>
    <Button {...args}>{args.children}</Button>
  </div>
)

const TemplateLink: Story<{
  children: string
  variant: ButtonVariant
  link: {
    to: string
    isExternal: boolean
  }
  Icon?: SharedButtonProps['Icon']
  isDisabled: boolean
}> = args => (
  <div style={{ margin: '50px', display: 'flex' }}>
    <ButtonLink {...args}>{args.children}</ButtonLink>
  </div>
)

export const DefaultButton = Template.bind({})

DefaultButton.args = {
  children: 'Hello world',
  disabled: false,
  variant: ButtonVariant.PRIMARY,
  iconPosition: IconPositionEnum.LEFT,
}

export const DefaultButtonWithIcon = Template.bind({})

DefaultButtonWithIcon.args = {
  ...DefaultButton.args,
  Icon: LinkIcon,
}

export const DefaultSecondaryButton = Template.bind({})

DefaultSecondaryButton.args = {
  children: 'Hello world',
  disabled: false,
  variant: ButtonVariant.SECONDARY,
}

export const LinkButton = TemplateLink.bind({})

LinkButton.args = {
  children: 'Éditer',
  variant: ButtonVariant.TERNARY,
  link: { to: '/my-path', isExternal: false },
}

export const LinkButtonWithIcon = TemplateLink.bind({})

LinkButtonWithIcon.args = {
  ...LinkButton.args,
  Icon: PenIcon,
}

export const LinkQuaternaryButtonWithIcon = TemplateLink.bind({})

LinkQuaternaryButtonWithIcon.args = {
  children: 'Accueil',
  variant: ButtonVariant.QUATERNARY,
  Icon: CircleArrowLeftIcon,
  link: { to: '/my-path', isExternal: false },
}

export const WithTooltip = Template.bind({})
WithTooltip.args = {
  ...DefaultButton.args,
  children: 'Créer une offre réservable pour un établissement scolaire',
  Icon: PenIcon,
  iconPosition: IconPositionEnum.CENTER,
  variant: ButtonVariant.SECONDARY,
  hasTooltip: true,
}

export const BoxButtonWithIcon = Template.bind({})
BoxButtonWithIcon.args = {
  children: 'Hello world',
  disabled: false,
  variant: ButtonVariant.BOX,
  iconPosition: IconPositionEnum.LEFT,
  Icon: CircleArrowIcon,
}
