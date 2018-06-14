import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'

import { requestData } from '../../reducers/data'
import selectCurrentOccasion from '../../selectors/currentOccasion'
import { NEW } from '../../utils/config'
import { pathToCollection } from '../../utils/translate'

const withCurrentOccasion = WrappedComponent => {
  class _withCurrentOccasion extends Component {

    constructor () {
      super()
      this.state = {
        apiPath: null,
        isLoading: false,
        isNew: false,
        routePath: null
      }
    }

    handleRequestData = () => {
      const {
        match: {
          params: {
            occasionType,
            occasionId
          }
        },
        requestData,
      } = this.props
      const { apiPath } = this.state

      occasionId !== 'nouveau' && requestData(
        'GET',
        apiPath,
        { key: 'occasions' }
      )
    }

    componentDidMount() {
      this.props.user && this.handleRequestData()
    }

    componentDidUpdate(prevProps) {
      const { user } = this.props
      if (user && user !== prevProps.user) {
        this.handleRequestData()
      }
    }

    static getDerivedStateFromProps (nextProps) {
      const {
        occasionId,
        occasionPath
      } = nextProps.match.params
      const {
        id
      } = nextProps
      const isNew = occasionId === 'nouveau'
      const occasionCollection = pathToCollection(occasionPath)
      const apiPath = isNew
        ? `${occasionCollection}`
        : `${occasionCollection}/${occasionId}`
      const routePath = `/offres/${occasionPath}${isNew ? '' : `/${occasionId}`}`
      return {
        apiPath,
        isLoading: !(id || isNew),
        isNew,
        newMediationRoutePath: `${routePath}/accroches/nouveau`,
        occasionCollection,
        occasionIdOrNew: isNew ? NEW : occasionId,
        routePath
      }
    }

    render () {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }

  return compose(
    withRouter,
    connect(
      (state, ownProps) => ({
        occasion: selectCurrentOccasion(state, ownProps),
        user: state.user,
      }),
      { requestData }
    )
  )(_withCurrentOccasion)
}

export default withCurrentOccasion
