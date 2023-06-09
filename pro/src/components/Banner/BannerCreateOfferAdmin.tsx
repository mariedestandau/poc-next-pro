import React from 'react'

import { EyeOpenIcon } from 'icons'
import Banner from 'ui-kit/Banners/Banner'

const BannerCreateOfferAdmin = (): JSX.Element => (
  <Banner
    type="attention"
    links={[
      {
        href: '/accueil',
        linkTitle: 'Aller à l’accueil',
        Icon: EyeOpenIcon,
        isExternal: false,
      },
    ]}
  >
    Afin de créer une offre en tant qu’administrateur veuillez sélectionner une
    structure.
  </Banner>
)

export default BannerCreateOfferAdmin
