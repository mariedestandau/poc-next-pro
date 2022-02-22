import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import selectEvent from 'react-select-event'

import {
  findDepartmentFilter,
  findLaunchSearchButton,
  queryResetFiltersButton,
} from 'app/__spec__/__test_utils__/elements'
import {
  AlgoliaQueryContextProvider,
  FiltersContextProvider,
} from 'app/providers'
import { VenueFilterType } from 'utils/types'

import { OfferFilters, OfferFiltersProps } from '../OfferFilters/OfferFilters'

const renderOfferFilters = (props: OfferFiltersProps) => {
  render(
    <FiltersContextProvider>
      <AlgoliaQueryContextProvider>
        <OfferFilters {...props} />
      </AlgoliaQueryContextProvider>
    </FiltersContextProvider>
  )
}

describe('offerFilters component', () => {
  let props: OfferFiltersProps
  let venue: VenueFilterType | null = {
    id: 1436,
    name: 'Librairie de Paris',
    publicName: "Lib de Par's",
  }

  beforeEach(() => {
    props = {
      handleLaunchSearchButton: jest.fn(),
      venueFilter: null,
      removeVenueFilter: jest.fn(),
      isLoading: false,
    }
  })

  it('should show no tags when no filter and no venue filter are selected', async () => {
    // When
    renderOfferFilters(props)

    // Then
    const launchSearchButton = await findLaunchSearchButton()
    expect(launchSearchButton).toBeInTheDocument()
    expect(
      screen.queryByText('Réinitialiser les filtres')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('Lieu :', { exact: false })
    ).not.toBeInTheDocument()
  })

  it('should show venue tag with venue public name when venue filter is applied', async () => {
    // When
    renderOfferFilters({ ...props, venueFilter: venue })

    // Then
    await waitFor(() =>
      expect(
        screen.queryByText(`Lieu : ${venue?.publicName}`)
      ).toBeInTheDocument()
    )
    expect(screen.queryByText('Réinitialiser les filtres')).toBeInTheDocument()
  })

  it('should show venue tag with venue name when venue filter is applied and public name does not exist', async () => {
    // Given
    venue = venue as VenueFilterType
    venue.publicName = undefined

    // When
    renderOfferFilters({ ...props, venueFilter: venue })

    // Then
    await waitFor(() =>
      expect(screen.queryByText(`Lieu : ${venue?.name}`)).toBeInTheDocument()
    )
    expect(screen.queryByText('Réinitialiser les filtres')).toBeInTheDocument()
  })

  it('should show filter tags when at least one filter is selected', async () => {
    // When
    renderOfferFilters(props)
    const departmentFilter = await findDepartmentFilter()
    await selectEvent.select(departmentFilter, '01 - Ain')

    // Then
    const resetFiltersButton = queryResetFiltersButton()
    await waitFor(() => expect(resetFiltersButton).toBeInTheDocument())
  })
})
