import React, { Component } from 'react'
import { connect } from 'react-redux'

import FormInput from './FormInput'
import { mergeForm } from '../reducers/form'
import { NEW } from '../utils/config'

class PriceForm extends Component {
  componentWillMount () {
    const { mergeForm, offerId } = this.props
    mergeForm('prices', NEW, 'offerId', offerId)
  }
  render () {
    const { endDate, startDate, size, value } = this.props
    return (
      <div className='price-form mb3 col-9 mx-auto p2'>

        <label className='mr1'>
          début
        </label>
        <FormInput className='input price-form__form-input mb1'
          collectionName='prices'
          defaultValue={startDate}
          isRequired
          name='startDate' />
        <br />

        <label className='mr1'>
          fin
        </label>
        <FormInput className='input price-form__form-input mb1'
          collectionName='prices'
          defaultValue={endDate}
          isRequired
          name='endDate' />
        <br />

        <label className='mr1'>
          groupe
        </label>
        <FormInput className='input price-form__form-input mb1'
          collectionName='prices'
          defaultValue={size}
          isRequired
          name='size' />
        <br />

        <label className='mr1'>
          prix
        </label>
        <FormInput className='input price-form__form-input'
          collectionName='prices'
          defaultValue={value}
          isRequired
          name='value' />
      </div>
    )
  }
}

export default connect(null, { mergeForm })(PriceForm)
