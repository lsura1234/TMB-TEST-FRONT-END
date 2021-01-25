import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import AppHeader from 'glud-component/lib/AppHeader'
import Input from 'glud-component/lib/Input'
import Row from 'glud-component/lib/Row'
import Column from 'glud-component/lib/Column'
import Modal from 'glud-component/lib/Modal'
import SelectWithFilter from 'glud-component/lib/SelectWithFilter'
import TagWithAddons from 'glud-component/lib/TagWithAddons'
import Tag from 'glud-component/lib/Tag'

import { getCurrenciesList } from '../actions/action'
import CurrenciesList from '../components/CurrenciesList'

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
  const rates = useSelector((state) => state.post.rates)
  const [currenciesFrom, setCurrenciesFrom] = useState({
    label: 'USD (United States Dollar)',
    value: 'USD'
  })
  const [currenciesTo, setCurrenciesTo] = useState([])
  const [currentOption, setCurrentOptions] = useState(getOption('to'))
  const [disabledSelect, setDisabledSelect] = useState(false)
  const [disableConvert, setDisableConvert] = useState(false)
  const [convertTarget, setConvertTarget] = useState(null)
  const [convertFrom, setConvertFrom] = useState(0)
  const [convertTo, setConvertTo] = useState(0)
  const [focus, setFocus] = useState(null)
  const allOption = getOption('from')

  const handleDeleteCurrencies = (currencies, index) => {
    const tempCurrenciesTo = [...currenciesTo]
    tempCurrenciesTo.splice(index, 1)

    if (currencies.value === 'ทั้งหมด') setDisabledSelect(false)
    setCurrenciesTo(tempCurrenciesTo)
  }

  const handleAddToCurrencies = (value) => {
    const tempCurrenciesTo = [...currenciesTo]

    // check dup
    if (tempCurrenciesTo.find((currenciesToItem) => currenciesToItem.value === value.value))
      return null

    if (tempCurrenciesTo.length === 0) {
      setCurrenciesTo([...currenciesTo, value])
      return null
    }

    if (value.value === 'ทั้งหมด') {
      for (; tempCurrenciesTo.length === 0; ) {
        //delete current option
        tempCurrenciesTo.splice(0, 1)
      }

      setDisabledSelect(true)
      setCurrenciesTo([value])
      return null
    }

    setCurrenciesTo([...currenciesTo, value])
  }

  const realRate = (from, currencies, rate) => {
    return (1 / rates[from]) * rate
  }

  const handleClickRate = (currencies) => {
    setDisableConvert(true)
    setConvertTarget(currencies)
  }

  const renderRates = () => {
    if (currenciesTo.length === 0) return <></>

    if (currenciesTo[0].value === 'ทั้งหมด') {
      return allOption.map((value) => (
        <CurrenciesList
          label={value.value}
          value={realRate(currenciesFrom.value, value.value, rates[value.value])}
          onclick={handleClickRate}
        />
      ))
    }

    return currenciesTo.map((currenciesItem) => (
      <CurrenciesList
        label={currenciesItem.value}
        value={realRate(currenciesFrom.value, currenciesItem.value, rates[currenciesItem.value])}
        onclick={handleClickRate}
      />
    ))
  }

  const handleConvert = (position, value) => {
    if (focus !== position) return null

    if (position === 'from') {
      setConvertFrom(value)
      setConvertTo(value * realRate(currenciesFrom.value, convertTarget, rates[convertTarget]))
      return null
    }

    setConvertTo(value)
    setConvertFrom(
      value * realRate(convertTarget, currenciesFrom.value, rates[currenciesFrom.value])
    )
  }

  useEffect(() => {
    dispatch(getCurrenciesList())
  }, [dispatch])

  useEffect(() => {
    setCurrentOptions(getOption('to'))
    // eslint-disable-next-line
  }, [currencies])

  return (
    <Style>
      <AppHeader title='ตรวจสอบอัตราแลกเปลี่ยนสกลุเงิน' />
      <div className='body-page'>
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
                disabled={disabledSelect}
              />
            </Column>
          </Row>
          <div className='tag-selected'>
            <div className='tag-title'>รายการเปลียบเทียบที่เลือกไว้</div>
            <div>
              {currenciesTo.map((currencies, index) => (
                <TagWithAddons>
                  <Tag dark>{currencies.value}</Tag>
                  <Tag
                    dark
                    isDelete
                    onClick={() => handleDeleteCurrencies(currencies, index)}
                  ></Tag>
                </TagWithAddons>
              ))}
            </div>
          </div>
        </div>
        <div>{renderRates()}</div>
      </div>
      {disableConvert && (
        <Modal
          title='อัตราแลกเปลี่ยน'
          open={disableConvert}
          onClose={() => setDisableConvert(false)}
        >
          <Modal.Content>
            <div>
              <Input
                fullwidth
                label={currenciesFrom.value}
                value={convertFrom}
                onChange={(e) => handleConvert('from', e.target.value)}
                onFocus={() => setFocus('from')}
                type='number'
              />
            </div>
            <div>
              <Input
                fullwidth
                label={convertTarget}
                value={convertTo}
                onChange={(e) => handleConvert('to', e.target.value)}
                onFocus={() => setFocus('to')}
                type='number'
              />
            </div>
          </Modal.Content>
        </Modal>
      )}
    </Style>
  )
}

const Style = styled('div')`
  height: 100vh;
  .body-page {
    height: calc(100vh - 50px);
    overflow: auto;
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
  }
`
