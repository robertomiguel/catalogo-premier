import React from 'react'
import { SpecContainer, SpecBox, SpecLabel, SpecValue, SpecTitle } from './SpecsContent.styled'
import specsSchema from '../specs-schema.json'
import { capitalize } from '../common/capitalize'
import { Car } from '../types/car'

const parseValue = (value: any, type: string) => {
    switch (type) {
      case 'STRING':
      case 'ENUM':
        return capitalize(value)
      case 'BOOLEAN':
        return value ? 'Si' : 'No'
      case 'FLOAT':
        return value ? Number(value).toFixed(2) : '-'
      default:
        return value ?? '-'
    }    
}

interface SpecsContentProps {
    specs: any[]
    carData: Car
}

export const SpecsContent = ({ specs, carData }: SpecsContentProps) => {
  return <> {specs.map( (sp, index) => {

    const specsField = sp.fields.split(',')

    return <SpecContainer key={`sp-${sp.label}-${index}`}>
        <SpecTitle>{sp.label}</SpecTitle>
        {specsField.map( (field: string, idx: number) => {
            const label = (specsSchema as any)[field].label
            const type = (specsSchema as any)[field].type
            const value = parseValue(carData[field], type)
            return value ? <SpecBox key={`sp-${idx}$--{field}`}>
              <SpecLabel>{label}</SpecLabel>
              <SpecValue>{value}</SpecValue>
            </SpecBox> : <></>
        } )}

    </SpecContainer>
  })}</>
}