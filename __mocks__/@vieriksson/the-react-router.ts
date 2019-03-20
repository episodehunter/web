export const withNavigation = Component => Component
export const useNavigation = () => [
  () => {
    throw new Error('Should not navigate in test')
  },
  {}
]
