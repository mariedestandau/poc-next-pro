import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import React from 'react'
import { shallow } from 'enzyme'

import FilterByDates from '../FilterByDates'

const middlewares = []
const mockStore = configureStore(middlewares)

describe('src | components | pages | search | FilterByDates', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      // given
      const initialState = {}
      const store = mockStore(initialState)
      const props = {
        filterActions: {},
        filterState: {},
        title: 'Fake title',
      }

      // when
      const wrapper = shallow(
        <Provider store={store}>
          <FilterByDates {...props} />
        </Provider>
      )

      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
