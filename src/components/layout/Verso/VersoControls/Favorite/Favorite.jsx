import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { toast } from 'react-toastify'

const iconClass = isFavorite => `icon-ico-like${isFavorite ? '-on' : ''}`

const alternativeText = isFavorite => (isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris')

const showFailModal = () => {
  toast('La gestion des favoris ne fonctionne pas pour le moment, veuillez ré-essayer plus tard.')
}

class Favorite extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { isWaitingApi: false }
  }

  componentDidMount() {
    const { loadFavorites } = this.props

    loadFavorites()
  }

  handleSuccess = () => {
    this.setState({ isWaitingApi: false })
  }

  handleFavorite = (offerId, mediationId, isFavorite) => () => {
    const { handleFavorite } = this.props

    this.setState(
      { isWaitingApi: true },
      handleFavorite(offerId, mediationId, isFavorite, showFailModal, this.handleSuccess)
    )
  }

  render() {
    const { isFavorite, mediationId, offerId } = this.props
    const { isWaitingApi } = this.state

    return (
      <button
        aria-label={alternativeText(isFavorite)}
        className="fav-button"
        disabled={isWaitingApi}
        onClick={this.handleFavorite(offerId, mediationId, isFavorite)}
        title={alternativeText(isFavorite)}
        type="button"
      >
        <i
          aria-hidden
          className={`font-icon ${iconClass(isFavorite)}`}
        />
      </button>
    )
  }
}

Favorite.defaultProps = {
  isFavorite: true,
  mediationId: null,
}

Favorite.propTypes = {
  handleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
  loadFavorites: PropTypes.func.isRequired,
  mediationId: PropTypes.string,
  offerId: PropTypes.string.isRequired,
}

export default Favorite
