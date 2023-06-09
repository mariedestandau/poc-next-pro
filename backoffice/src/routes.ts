import { OffererDetail } from './resources/Pro/Offerers/OffererDetail'
import { ProUserDetail } from './resources/Pro/Users/ProUserDetail'
import { UserDetail } from './resources/PublicUsers/UserDetail'

type Route = {
  path: string
  component: () => JSX.Element
}

export const routes: Route[] = [
  {
    path: '/public_accounts/:id',
    component: UserDetail,
  },
  {
    path: '/offerer/:id',
    component: OffererDetail,
  },
  {
    path: '/proUser/:id',
    component: ProUserDetail,
  },
]
