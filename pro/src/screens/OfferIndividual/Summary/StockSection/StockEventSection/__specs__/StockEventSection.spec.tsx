import { screen } from '@testing-library/react'
import React from 'react'

import {
  individualOfferFactory,
  individualStockFactory,
  priceCategoryFactory,
} from 'utils/individualApiFactories'
import { renderWithProviders } from 'utils/renderWithProviders'

import StockEventSection from '../StockEventSection'

describe('StockEventSection', () => {
  it('should render correctly', () => {
    const priceCategory = priceCategoryFactory({ id: 1 })
    const priceCategoryId = priceCategory.id
    const offer = individualOfferFactory({
      isEvent: true,
      stocks: [
        individualStockFactory({ priceCategoryId }),
        individualStockFactory({ priceCategoryId }),
        individualStockFactory({ priceCategoryId }),
      ],
      priceCategories: [priceCategory],
    })

    renderWithProviders(<StockEventSection offer={offer} />, {
      storeOverrides: {
        features: {
          initialized: true,
          list: [{ isActive: true, nameKey: 'WIP_ENABLE_MULTI_PRICE_STOCKS' }],
        },
      },
    })

    // 2 expected because one is not shown under the "show all" button
    expect(screen.queryAllByText(/Tarif/)).toHaveLength(2)
  })

  // TODO delete this test when WIP_ENABLE_MULTI_PRICE_STOCKS feature flag is deleted
  it('should render correctly with old prices', () => {
    const offer = individualOfferFactory({
      isEvent: true,
      stocks: [
        individualStockFactory(),
        individualStockFactory(),
        individualStockFactory(),
      ],
    })

    renderWithProviders(<StockEventSection offer={offer} />)

    // 2 expected because one is not shown under the "show all" button
    expect(screen.queryAllByText(/Prix/)).toHaveLength(2)
  })

  it('should not render if there are no stocks', () => {
    const offer = individualOfferFactory({ stocks: [] })

    renderWithProviders(<StockEventSection offer={offer} />)

    expect(screen.queryByText(/Prix/)).not.toBeInTheDocument()
  })
})
