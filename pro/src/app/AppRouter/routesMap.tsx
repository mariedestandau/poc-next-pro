/* No need to test this file */
/* istanbul ignore file */
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import AdageIframe from 'oldpages/AdageIframe/AdageIframe'
import Bookings from 'oldpages/Bookings'
import CollectiveBookings from 'oldpages/CollectiveBookings'
import CollectiveOfferConfirmation from 'oldpages/CollectiveOfferConfirmation'
import CollectiveOfferCreation from 'oldpages/CollectiveOfferCreation'
import CollectiveOfferEdition from 'oldpages/CollectiveOfferEdition'
import CollectiveOffers from 'oldpages/CollectiveOffers'
import CollectiveOfferStockCreation from 'oldpages/CollectiveOfferStockCreation'
import CollectiveOfferStockEdition from 'oldpages/CollectiveOfferStockEdition'
import CollectiveOfferSummaryCreation from 'oldpages/CollectiveOfferSummaryCreation'
import CollectiveOfferSummaryEdition from 'oldpages/CollectiveOfferSummaryEdition'
import CollectiveOfferVisibilityCreation from 'oldpages/CollectiveOfferVisibility/CollectiveOfferCreationVisibility'
import CollectiveOfferVisibility from 'oldpages/CollectiveOfferVisibility/CollectiveOfferEditionVisibility'
import CsvTable from 'oldpages/CsvTable'
import Desk from 'oldpages/Desk'
import { EmailChangeValidation } from 'oldpages/EmailChangeValidation'
import Unavailable from 'oldpages/Errors/Unavailable/Unavailable'
import Homepage from 'oldpages/Home/Homepage'
import { Logout } from 'oldpages/Logout'
import LostPassword from 'oldpages/LostPassword'
import OffererDetails from 'oldpages/Offerers/Offerer/OffererDetails/OffererDetails'
import CollectiveDataEdition from 'oldpages/Offerers/Offerer/VenueV1/VenueEdition/CollectiveDataEdition'
import OffererCreation from 'oldpages/Offerers/OffererCreation'
import { OffererStats } from 'oldpages/OffererStats'
import { OfferIndividualWizard } from 'oldpages/OfferIndividualWizard'
import OffersRoute from 'oldpages/Offers'
import OfferType from 'oldpages/OfferType'
import Reimbursements from 'oldpages/Reimbursements'
import ResetPassword from 'oldpages/ResetPassword/ResetPassword'
import SignIn from 'oldpages/SignIn/SignIn'
import Signup from 'oldpages/Signup/Signup'
import { SignupJourneyRoutes } from 'oldpages/SignupJourneyRoutes'
import { UserProfile } from 'oldpages/User'
import { VenueCreation } from 'oldpages/VenueCreation'
import { VenueEdition } from 'oldpages/VenueEdition'
import CollectiveOfferSelectionDuplication from 'screens/CollectiveOfferSelectionDuplication'
import { UNAVAILABLE_ERROR_PAGE } from 'utils/routes'

export interface ILayoutConfig {
  pageName?: string
  fullscreen?: boolean
}

interface IRouteMeta {
  public?: boolean
  layoutConfig?: ILayoutConfig
  withoutLayout?: boolean
  shouldRedirect?: boolean
}
export interface IRoute {
  parentPath?: string
  path: string
  title?: string
  element: JSX.Element
  meta?: IRouteMeta
  featureName?: string
}

const RedirectToConnexionComponent = () => {
  const location = useLocation()
  return <Navigate to={`/connexion${location.search}`} />
}

const routes: IRoute[] = [
  {
    element: <RedirectToConnexionComponent />,
    path: '/',
    meta: { withoutLayout: true },
  },
  {
    element: <Logout />,
    path: '/logout',
    meta: { withoutLayout: true },
  },
  {
    element: <AdageIframe />,
    path: '/adage-iframe',
    meta: {
      public: true,
      withoutLayout: true,
    },
  },
  {
    element: <Signup />,
    path: '/inscription',
    title: 'Inscription',
    meta: {
      public: true,
      withoutLayout: true,
    },
  },
  {
    element: <Signup />,
    path: '/inscription/*',
    title: 'Inscription',
    meta: {
      public: true,
      withoutLayout: true,
    },
  },
  {
    element: <CsvTable />,
    path: '/reservations/detail',
    title: 'Réservations',
    meta: { withoutLayout: true },
  },
  {
    element: <CsvTable />,
    path: '/remboursements-details',
    title: 'Remboursements',
    meta: { withoutLayout: true },
  },
  {
    element: <Unavailable />,
    path: UNAVAILABLE_ERROR_PAGE,
    title: 'Page indisponible',
    meta: {
      public: true,
      withoutLayout: true,
    },
  },
  {
    element: <Homepage />,
    path: '/accueil',
    title: 'Accueil',
    meta: { shouldRedirect: true },
  },
  {
    element: <Desk />,
    path: '/guichet',
    title: 'Guichet',
  },
  {
    element: <Bookings />,
    path: '/reservations',
    title: 'Réservations',
    meta: { shouldRedirect: true },
  },
  {
    element: <CollectiveBookings />,
    path: '/reservations/collectives',
    title: 'Réservations',
    meta: { shouldRedirect: true },
  },
  {
    element: <SignIn />,
    path: '/connexion',
    title: 'Connexion',
    meta: {
      public: true,
      withoutLayout: true,
    },
  },
  {
    element: <EmailChangeValidation />,
    path: '/email_validation',
    title: 'Validation changement adresse e-mail',
    meta: {
      public: true,
      layoutConfig: {
        fullscreen: true,
        pageName: 'sign-in',
      },
    },
  },
  {
    element: <OffererCreation />,
    path: '/structures/creation',
    title: 'Vos structures juridiques',
  },
  {
    element: <OffererDetails />,
    path: '/structures/:offererId',
    title: 'Vos structures juridiques',
    meta: { shouldRedirect: true },
  },
  {
    element: <VenueCreation />,
    path: '/structures/:offererId/lieux/creation',
    title: 'Création d’un lieu',
    meta: { shouldRedirect: true },
  },
  {
    element: <VenueEdition />,
    path: '/structures/:offererId/lieux/:venueId',
    title: 'Edition d’un lieu',
    meta: { shouldRedirect: true },
  },
  {
    element: <CollectiveDataEdition />,
    path: '/structures/:offererId/lieux/:venueId/eac',
    title: 'Mes informations pour les enseignants',
    meta: { shouldRedirect: true },
  },
  {
    element: <OfferType />,
    path: '/offre/creation',
    title: 'Selection du type d’offre',
  },
  {
    element: <OffersRoute />,
    path: '/offres',
    title: 'Vos offres',
    meta: { shouldRedirect: true },
  },
  {
    element: <CollectiveOffers />,
    path: '/offres/collectives',
    title: 'Vos offres collectives',
    meta: { shouldRedirect: true },
  },
  {
    element: <CollectiveOfferSelectionDuplication />,
    path: '/offre/creation/collectif/selection',
    title: 'Edition d’une offre collective',
  },
  {
    element: <CollectiveOfferStockCreation />,
    path: '/offre/:offerId/collectif/stocks',
    title: 'Edition d’une offre collective',
  },
  {
    element: <CollectiveOfferCreation />,
    path: '/offre/creation/collectif',
    title: 'Edition d’une offre collective',
  },
  {
    element: <CollectiveOfferCreation />,
    path: '/offre/creation/collectif/vitrine',
    title: 'Edition d’une offre collective',
  },
  {
    element: <CollectiveOfferCreation />,
    path: '/offre/collectif/:offerId/creation',
    title: 'Edition d’une offre collective',
  },
  {
    element: <CollectiveOfferCreation />,
    path: '/offre/collectif/vitrine/:offerId/creation',
    title: 'Edition d’une offre collective',
  },
  {
    element: <CollectiveOfferVisibilityCreation />,
    path: '/offre/:offerId/collectif/visibilite',
    title: 'Edition d’une offre collective',
  },
  {
    element: <CollectiveOfferSummaryCreation />,
    path: '/offre/:offerId/collectif/creation/recapitulatif',
    title: 'Edition d’une offre collective',
  },
  {
    element: <CollectiveOfferSummaryCreation />,
    path: '/offre/:offerId/collectif/vitrine/creation/recapitulatif',
    title: 'Edition d’une offre collective',
  },
  {
    element: <CollectiveOfferConfirmation />,
    path: '/offre/:offerId/collectif/confirmation',
    title: 'Edition d’une offre collective',
  },
  {
    element: <CollectiveOfferConfirmation />,
    path: '/offre/:offerId/collectif/vitrine/confirmation',
    title: 'Edition d’une offre collective',
  },
  {
    element: <CollectiveOfferEdition />,
    path: '/offre/:offerId/collectif/edition',
    title: 'Edition d’une offre collective',
  },
  {
    element: <CollectiveOfferSummaryEdition />,
    path: '/offre/:offerId/collectif/recapitulatif',
    title: 'Edition d’une offre collective',
  },
  {
    element: <CollectiveOfferStockEdition />,
    path: '/offre/:offerId/collectif/stocks/edition',
    title: 'Edition d’une offre collective',
  },
  {
    element: <CollectiveOfferVisibility />,
    path: '/offre/:offerId/collectif/visibilite/edition',
    title: 'Edition d’une offre collective',
  },
  {
    element: <ResetPassword />,
    path: '/mot-de-passe-perdu',
    title: 'Mot de passe perdu',
    meta: {
      public: true,
      withoutLayout: true,
    },
  },
  {
    element: <LostPassword />,
    path: '/demande-mot-de-passe',
    title: 'Demande de mot de passe',
    meta: {
      public: true,
      withoutLayout: true,
    },
  },
  {
    element: <OfferIndividualWizard />,
    path: '/offre/individuelle/:offerId/*',
    title: 'Offre étape par étape',
    meta: { shouldRedirect: true },
  },
  {
    element: <Reimbursements />,
    path: '/remboursements/*',
    title: 'Vos remboursements',
    meta: {
      layoutConfig: {
        pageName: 'reimbursements',
      },
    },
  },
  {
    element: <UserProfile />,
    path: '/profil',
    title: 'Profil',
  },
  {
    element: <OffererStats />,
    path: '/statistiques',
    title: 'Statistiques',
    featureName: 'ENABLE_OFFERER_STATS',
  },
  {
    element: <SignupJourneyRoutes />,
    path: '/parcours-inscription/*',
    title: 'Parcours de souscription',
    featureName: 'WIP_ENABLE_NEW_ONBOARDING',
    meta: { withoutLayout: true },
  },
]

export default routes
