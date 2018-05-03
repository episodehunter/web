import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Poster } from '../poster'

it('Poster renders correctly', () => {
  const tree = renderer
    .create(<Poster width={100} height={200} imagePath={'some-path'} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
