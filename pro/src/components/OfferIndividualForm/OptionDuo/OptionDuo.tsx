import { useFormikContext } from 'formik'
import React from 'react'

import FormLayout from 'components/FormLayout'
import { Checkbox } from 'ui-kit'

import { IOfferIndividualFormValues } from '../types'

export interface IOptionDuo {
  readOnlyFields?: string[]
}

const OptionDuo = ({ readOnlyFields }: IOptionDuo): JSX.Element | null => {
  const {
    values: { subCategoryFields },
  } = useFormikContext<IOfferIndividualFormValues>()

  if (!subCategoryFields.includes('isDuo')) {
    return null
  }

  return (
    <FormLayout.Section title="Réservations “duo“">
      <FormLayout.Row>
        <Checkbox
          label="Accepter les réservations “duo“"
          description="En activant cette option, vous permettez au bénéficiaire du pass Culture de venir accompagné. La seconde place sera délivrée au même tarif que la première, quel que soit l‘accompagnateur."
          name="isDuo"
          hideFooter
          disabled={readOnlyFields?.includes('isDuo')}
        />
      </FormLayout.Row>
    </FormLayout.Section>
  )
}

export default OptionDuo
