export const FollowingPage = () => null

// import { observer } from 'mobx-react-lite'
// import React from 'react'
// import styled from 'styled-components'
// import { EmptyState } from '../components/empty-state'
// import { Following } from '../components/following'
// import { shark } from '../utils/colors'
// import { SpinnerPage } from './spinner.page'

// export const FollowingPage = observer(() => {
//   const whatToWatch = useWhatToWatch()

//   if (whatToWatch.loadingState.isNotLoaded()) {
//     return null
//   }

//   if (whatToWatch.loadingState.isLoading()) {
//     return <SpinnerPage />
//   }

//   if (!whatToWatch.hasSomethingToWatch) {
//     return <EmptyState />
//   }

//   return (
//     <Wrapper>
//       <Following following={whatToWatch.whatToWatch} />
//     </Wrapper>
//   )
// })

// const Wrapper = styled.div`
//   background-color: ${shark};
//   display: flex;
//   justify-content: center;
//   padding-top: 70px;
// `
