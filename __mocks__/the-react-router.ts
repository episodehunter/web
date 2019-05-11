export const withNavigation = Component => Component
export const useNavigation = () => ({
  navigate: () => {
    throw new Error('Should not navigate in test')
  }
})
