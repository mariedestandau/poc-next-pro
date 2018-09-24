import { Field, Form, SubmitButton } from 'pass-culture-shared'
import get from 'lodash.get'
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Logo from '../layout/Logo'
import Main from '../layout/Main'

const SignupPage = ({ errors, sirenName }) => {
  return (
    <Main name="sign-up" fullscreen>
      <div className="logo-side">
        <Logo noLink signPage />
      </div>
      <div className="container">
        <div className="columns">
          <div className="column is-offset-6 is-two-fifths">
            <section className="has-text-grey">
              <div className="hero-body">
                <h1 className="title is-spaced is-1">Créez votre compte</h1>
                <h2 className="subtitle is-2">
                  Nous vous invitons à prendre connaissance des{' '}
                  <a
                    className="is-secondary"
                    href="/BrochurePCPro.pdf"
                    target="_blank">
                    modalités de fonctionnement en cliquant ici
                  </a>{' '}
                  avant de renseigner les champs suivants.
                </h2>
                <span className="has-text-grey">
                  {' '}
                  <span className="required-legend"> * </span> Champs
                  obligatoires
                </span>
                <Form
                  action="/users/signup"
                  handleSuccessNotification={() =>
                    'Votre compte a été créé avec succès.'
                  }
                  handleSuccessRedirect={() => '/structures'}
                  layout="vertical"
                  name="user">
                  <div className="field-group">
                    <Field
                      label="Adresse e-mail"
                      name="email"
                      placeholder="nom@exemple.fr"
                      required
                      sublabel="pour se connecter et récupérer son mot de passe en cas d'oubli"
                      type="email"
                    />
                    <Field
                      autoComplete="new-password"
                      name="password"
                      label="Mot de passe"
                      placeholder="Mon mot de passe"
                      required
                      sublabel="pour se connecter"
                      type="password"
                    />
                    <Field
                      autoComplete="last-name"
                      label="Nom"
                      name="lastName"
                      placeholder="Mon nom"
                      required
                    />
                    <Field
                      autoComplete="first-name"
                      label="Nom"
                      name="firstName"
                      placeholder="Mon prénom"
                      required
                    />
                    <Field
                      autoComplete="name"
                      label="Pseudo"
                      name="publicName"
                      placeholder="Mon nom ou pseudo"
                      required
                      sublabel="affichée dans l'application publique"
                    />
                    <Field
                      disabling={() => !sirenName}
                      label="SIREN"
                      name="siren"
                      placeholder="123 456 789"
                      required
                      sublabel="de la structure que vous représentez"
                      type="siren"
                      withFetchedName
                    />
                    <Field
                      label="Je souhaite recevoir les actualités du Pass Culture."
                      name="newsletter_ok"
                      type="checkbox"
                    />
                    <Field
                      label="J'accepte d'être contacté par mail pour donner mon avis sur le Pass Culture."
                      name="contact_ok"
                      type="checkbox"
                      required
                    />
                    <div className="errors">{errors}</div>
                  </div>
                  <div className="buttons-field">
                    <NavLink to="/connexion" className="button is-secondary">
                      J'ai déjà un compte
                    </NavLink>
                    <SubmitButton className="button is-primary is-outlined">
                      Créer
                    </SubmitButton>
                  </div>
                </Form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Main>
  )
}

export default connect(state => ({
  sirenName: get(state, `form.user.name`),
}))(SignupPage)
