import PropTypes from 'prop-types'
import React from 'react'
import styled from '@emotion/styled'

const CurrenciesList = ({ label, value, onclick }) => {
  return (
    <Style>
      <div className='topic-item' onClick={() => onclick(label)}>
        <span>{label}</span>
        <div>{`${value}`}</div>
      </div>
    </Style>
  )
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
  .topic-item {
    display: flex;
    height: 69px;
    align-items: center;
    padding: 20px;
    justify-content: space-between;
    box-shadow: 0 1px 0 0 #e5e5e5;
    .amount {
      width: 80px;
      height: 22px;
      border-radius: 11px;
      background-color: #363636;
      font-size: 12px;
      font-weight: normal;
      align-items: center;
      display: flex;
      justify-content: center;
      color: #f5f5f5;
    }
    & > span {
      font-size: 16px;
      font-weight: bold;
    }
  }
`
