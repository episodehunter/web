import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { PosterCard } from '../poster-card'

it('PosterCard renders correctly', () => {
  const tree = renderer
    .create(
      <PosterCard
        bottomRight="BottomRightText"
        topRight={'TopRight'}
        poster={<img src="some-image.jpg" />}
        linkUrl="some-url"
      />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
