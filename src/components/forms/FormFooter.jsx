import PropTypes, { bool, shape, string } from 'prop-types'
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

class FormFooter extends PureComponent {
  renderSubmitButton = options => {
    const attributes = {
      className: `flex-1 ${options.className || ''}`,
      disabled: options.disabled,
      id: options.id,
    }
    return (
      <button
        type="submit"
        {...attributes}
      >
        {options.label}
      </button>
    )
  }

  renderLink = options => {
    const attributes = {
      className: `flex-1 ${options.className || ''}`,
      disabled: options.disabled,
      id: options.id,
      to: options.url,
    }
    return (<Link {...attributes}>
      {options.label}
    </Link>)
  }

  handleTracking = () => {
    if (window.location.href === 'https://app.passculture.beta.gouv.fr/beta') {
      window.gtag_report_conversion(window.location.href)
    }
  }

  renderExternalLink = options => {
    const attributes = {
      className: `flex-1 ${options.className || ''}`,
      href: options.url,
      id: options.id,
      title: options.title,
    }
    return (
      <a
        {...attributes}
        onClick={this.handleTracking}
        onKeyPress={this.handleTracking}
        target="_blank"
      >
        {options.label}
      </a>
    )
  }

  render() {
    const { cancel, externalLink, submit } = this.props
    const isCancelLink = Boolean(cancel && cancel.url)
    const isExternalLink = Boolean(externalLink && externalLink.url)
    const isInnerLink = Boolean(submit && submit.url)
    const isSubmitButton = Boolean(submit && !submit.url)
    const hideSeparator = !(isCancelLink || isExternalLink) || !submit

    return (
      <footer className="logout-form-footer">
        {isCancelLink && this.renderLink(cancel)}
        {isExternalLink && this.renderExternalLink(externalLink)}
        {!hideSeparator && <hr className="dotted-left-2x-white flex-0" />}
        {isInnerLink && this.renderLink(submit)}
        {isSubmitButton && this.renderSubmitButton(submit)}
      </footer>
    )
  }
}

FormFooter.defaultProps = {
  cancel: null,
  externalLink: null,
  submit: null,
}

FormFooter.propTypes = {
  cancel: shape({
    className: string,
    disabled: bool,
    id: string,
    label: string.isRequired,
    url: string,
  }),
  externalLink: PropTypes.shape({
    className: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    title: PropTypes.string,
    url: PropTypes.string,
  }),
  submit: shape({
    className: string,
    disabled: bool,
    id: string,
    label: string.isRequired,
    url: string,
  }),
}

export default FormFooter
