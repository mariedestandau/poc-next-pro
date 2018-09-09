import PropTypes from 'prop-types'
import { Icon, requestData } from 'pass-culture-shared'
import React from 'react'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { Transition } from 'react-transition-group'
import { Scrollbars } from 'react-custom-scrollbars'
import { withRouter } from 'react-router-dom'

import MenuLink from './menu/MenuLink'
import { ROOT_PATH } from '../utils/config'
import { toggleMainMenu } from '../reducers/menu'
import routes from '../utils/routes'
import { getMainMenuItems } from '../utils/routes-utils'

const transitionDelay = 250
const transitionDuration = 250
const menuitems = getMainMenuItems(routes)

const defaultStyle = {
  opacity: '0',
  top: '100vh',
  transitionDuration: `${transitionDuration}ms`,
  transitionProperty: 'opacity, top',
  transitionTimingFunction: 'ease',
}

const transitionStyles = {
  entered: { opacity: 1, top: 0 },
  entering: { opacity: 0, top: '100vh' },
}

class MainMenu extends React.PureComponent {
  constructor(props) {
    super(props)
    const { dispatch } = props
    this.actions = bindActionCreators({ requestData }, dispatch)
  }

  onSignOutClick = () => {
    const { history } = this.props
    this.actions.requestData('GET', 'users/signout', {
      handleSuccess: () => {
        history.push('/connexion')
        this.toggleMainMenu()
      },
    })
  }

  toggleMainMenu = () => {
    const { dispatch } = this.props
    dispatch(toggleMainMenu())
  }

  renderSignOutLink() {
    return (
      <button
        type="button"
        className="navlink flex-columns"
        onClick={this.onSignOutClick}
      >
        <span className="has-text-centered menu-icon">
          <Icon svg="ico-deconnect-w" alt="" />
        </span>
        <span>
Déconnexion
        </span>
      </button>
    )
  }

  renderCloseButton = () => (
    <button
      type="button"
      className="close-button is-overlay"
      onClick={this.toggleMainMenu}
    >
      <Icon svg="ico-close" alt="Fermer" />
    </button>
  )

  renderMenuHeader = () => {
    const { user } = this.props
    const avatar = `${ROOT_PATH}/icons/avatar-default-w-XL.svg`
    return (
      <React.Fragment>
        <div className="profile has-text-centered">
          <p className="avatar">
            <img alt="" src={avatar} />
          </p>
          <p className="username is-clipped">
            <span>
              {user && user.publicName}
            </span>
          </p>
        </div>
        <div className="account items-center flex-center flex-rows">
          <p>
            <span>
Mon Pass
            </span>
          </p>
          <p>
            <strong>
              {'—— €'}
            </strong>
          </p>
        </div>
      </React.Fragment>
    )
  }

  render() {
    const { isVisible } = this.props
    return (
      <Transition in={isVisible} timeout={transitionDelay}>
        {state => (
          <div
            id="main-menu"
            className="is-overlay is-clipped flex-columns items-end p12"
            style={{ ...defaultStyle, ...transitionStyles[state] }}
          >
            <div className="inner is-relative is-clipped flex-rows">
              <div className="header flex-columns is-relative p16">
                {this.renderCloseButton()}
                {this.renderMenuHeader()}
              </div>
              <div className="scroll-container is-clipped">
                <Scrollbars>
                  <nav className="navigation flex-rows mt16 pb0">
                    {menuitems &&
                      menuitems.map(
                        obj =>
                          obj && (
                            <MenuLink
                              key={obj.path || obj.href}
                              item={obj}
                              clickHandler={this.toggleMainMenu}
                            />
                          )
                      )}
                    {this.renderSignOutLink()}
                  </nav>
                </Scrollbars>
              </div>
            </div>
          </div>
        )}
      </Transition>
    )
  }
}

MainMenu.defaultProps = {
  user: null,
}

MainMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
}

const mapStateToProps = state => ({
  isVisible: state.menu,
  user: state.user,
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(MainMenu)
