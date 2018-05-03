import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { SmallShowPoster } from '../small-show-poster'

it('SmallShowPoster renders correctly', () => {
  const tree = renderer.create(<SmallShowPoster tvdbId={123} />).toJSON()
  expect(tree).toMatchSnapshot()
})
