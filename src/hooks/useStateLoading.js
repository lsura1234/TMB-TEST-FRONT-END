import { useState, useCallback } from 'react'

const getInitialState = (stateNames, defaultState) => {
  if (stateNames.length > 0) {
    return stateNames.reduce(
      (result, item) => ({ ...result, [item]: false }),
      {}
    )
  }

  return {
    [defaultState]: false
  }
}

export default (stateNamehooks = []) => {
  const defaultState = 'loading'
  const [stateNames] = useState(stateNamehooks)
  const [state, setState] = useState(getInitialState(stateNames, defaultState))

  const isStateNameMissing = useCallback(
    stateName => {
      if (stateName === defaultState) return false
      if (stateNames.some(name => name === stateName)) return false
      return true
    },
    [stateNames]
  )

  const hideLoading = useCallback(stateName => {
    setState(state => ({
      ...state,
      [stateName]: false
    }))
  }, [])

  const createLoading = useCallback(
    (stateName = defaultState) => {
      if (isStateNameMissing(stateName)) {
        console.warn(`${stateName} is not defined in stateNames.`)
        return () => null
      }

      setState(state => ({
        ...state,
        [stateName]: true
      }))

      return () => hideLoading(stateName)
    },
    [hideLoading, isStateNameMissing]
  )

  const fetchWithLoading = useCallback(
    async (stateName, action) => {
      const closeLoading = createLoading(stateName)
      try {
        await action()
      } finally {
        closeLoading()
      }
    },
    [createLoading]
  )

  return [state, fetchWithLoading]
}
