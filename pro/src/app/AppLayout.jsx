import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import ReactTooltip from 'react-tooltip'

import DomainNameBanner from 'new_components/DomainNameBanner'
import GoBackLink from 'new_components/GoBackLink'
import Header from 'new_components/Header/Header'
import TutorialDialog from 'new_components/TutorialDialog'

const AppLayout = props => {
  const { children, layoutConfig } = props

  const defaultConfig = {
    backTo: null,
    fullscreen: false,
    pageName: 'Accueil',
  }

  const { backTo, fullscreen, pageName } = {
    ...defaultConfig,
    ...layoutConfig,
  }
  return (
    <>
      {!fullscreen && <Header />}
      <ReactTooltip
        className="flex-center items-center"
        delayHide={500}
        effect="solid"
        html
      />

      <main
        className={classnames({
          page: true,
          [`${pageName}-page`]: true,
          container: !fullscreen,
          fullscreen,
        })}
      >
        {fullscreen ? (
          children
        ) : (
          <div className="page-content">
            <div
              className={classnames('after-notification-content', {
                'with-padding': backTo,
              })}
            >
              <DomainNameBanner />
              {
                /* istanbul ignore next: DEBT, TO FIX */
                backTo && <GoBackLink to={backTo.path} title={backTo.label} />
              }
              {children}
            </div>
          </div>
        )}
        <TutorialDialog />
      </main>
    </>
  )
}

AppLayout.defaultProps = {
  layoutConfig: {},
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape()),
    PropTypes.shape(),
  ]).isRequired,
  layoutConfig: PropTypes.shape(),
}

export default AppLayout
