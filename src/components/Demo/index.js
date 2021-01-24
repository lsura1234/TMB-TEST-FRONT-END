import PropTypes from 'prop-types'
import React from 'react'
import styled from '@emotion/styled'

const Demo = (props) => {
  return (
    <Style>
      <h1>I am {props.name}</h1>
    </Style>
  )
}

Demo.propTypes = {
  name: PropTypes.string.isRequired
}

Demo.defaultProps = {
  name: 'React'
}

export default Demo

const Style = styled.div`
  label: Demo;
  text-align: center;

  h1 {
    font-size: 40px;
  }
`
