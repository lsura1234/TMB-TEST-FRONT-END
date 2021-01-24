import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import AppHeader from 'glud-component/lib/AppHeader'
import Input from 'glud-component/lib/Input'
import Button from 'glud-component/lib/Button'
import InputDatePicker from 'glud-component/lib/InputDatePicker'
import Select from 'glud-component/lib/Select'
import Row from 'glud-component/lib/Row'
import Column from 'glud-component/lib/Column'
import Confirm from 'glud-component/lib/Confirm'
import Loading from 'glud-component/lib/Loading'
import Toastify from 'glud-component/lib/Toastify'
import SelectWithFilter from 'glud-component/lib/SelectWithFilter'
import TagWithAddons from 'glud-component/lib/TagWithAddons'
import Tag from 'glud-component/lib/Tag'

import { getCurrenciesList } from '../actions/action'

export default () => {
  const dispatch = useDispatch()
  const getOption = (position) => {
    const options = []

    if (position === 'to')
      options.push({
        label: 'ทั้งหมด',
        value: 'ทั้งหมด'
      })

    for (var key in currencies) {
      if (currencies.hasOwnProperty(key)) {
        options.push({
          label: `${key} (${currencies[key]})`,
          value: key
        })
      }
    }

    return options
  }
  const currencies = useSelector((state) => state.post.currencies)
  const [currenciesFrom, setCurrenciesFrom] = useState({ label: 'THB (Thai Baht)', value: 'THB' })
  const [currenciesTo, setCurrenciesTo] = useState([])
  const [currentOption, setCurrentOptions] = useState(getOption('to'))
  const allOption = getOption('from')

  const handleAddToCurrencies = (value) => {
    const tempArray = [...currentOption]
    const oldIndex = tempArray.findIndex((tempItem) => tempItem.value === value.value)
    tempArray.splice(oldIndex, 1)
    setCurrentOptions(tempArray)
    setCurrenciesTo([...currenciesTo, { ...value, oldIndex }])
  }

  const handleDeleteCurrencies = (currencies, index) => {
    const tempCurrenciesTo = [...currenciesTo]
    tempCurrenciesTo.splice(index, 1)

    const tempCurrentOption = [...currentOption]
    const { oldIndex, label, value } = currencies
    const addOption = { label, value }
    tempCurrentOption.splice(oldIndex, 0, addOption)

    setCurrentOptions(tempCurrentOption)
    setCurrenciesTo(tempCurrenciesTo)
  }

  useEffect(() => {
    dispatch(getCurrenciesList())
  }, [dispatch])

  useEffect(() => {
    setCurrentOptions(getOption('to'))
  }, [currencies])

  return (
    <Style>
      <AppHeader title='ตรวจสอบอัตราแลกเปลี่ยนสกลุเงิน' />

      <div className='form-search'>
        <Row>
          <Column D={3} M={12}>
            <SelectWithFilter
              iconLeft={() => <i className='fas fa-search' />}
              label='สกุลเงินหลัก'
              options={allOption}
              value={currenciesFrom}
              onChange={(value) => setCurrenciesFrom(value)}
            />
          </Column>

          <Column D={3} M={12}>
            <SelectWithFilter
              iconLeft={() => <i className='fas fa-search' />}
              label='สกุลเงินที่ต้องการเปลียบเทียบ'
              options={currentOption}
              value={{ label: 'กรุณาเลือกรายการที่ต้องการ', value: '' }}
              onChange={(value) => handleAddToCurrencies(value)}
            />
          </Column>

          <Column D={3} M={12}>
            <div className='form-button'>
              <Button primary fullwidth>
                ค้นหา
              </Button>
            </div>
          </Column>
        </Row>
        <div className='tag-selected'>
          <div className='tag-title'>รายการเปลียบเทียบที่เลือกไว้</div>
          <div>
            {currenciesTo.map((currencies, index) => (
              <TagWithAddons>
                <Tag dark>{currencies.value}</Tag>
                <Tag dark isDelete onClick={() => handleDeleteCurrencies(currencies, index)}></Tag>
              </TagWithAddons>
            ))}
          </div>
        </div>
      </div>
    </Style>
  )
}

const Style = styled('div')`
  height: 100vh;
  .form-search {
    background-color: #f5f5f5;
    border-bottom: solid 1px #e5e5e5e5;
    padding: 10px 20px 20px 20px;

    .form-button {
      display: flex;
      align-items: flex-end;
      height: 70px;
    }

    .tag-selected {
      padding: 10px 0px 0px;
      .tag-title {
        padding: 10px;
        font-weight: bold;
      }
    }
  }
`
