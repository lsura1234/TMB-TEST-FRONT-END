import PropTypes from 'prop-types'
import React from 'react'
import styled from '@emotion/styled'

const CurrenciesList = (props) => {
  return <Style></Style>
}

CurrenciesList.propTypes = {
  name: PropTypes.string.isRequired
}

CurrenciesList.defaultProps = {
  name: 'React'
}

export default CurrenciesList

const Style = styled.div`
  label: CurrenciesList;
`
