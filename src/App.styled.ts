import styled from 'styled-components'
import mediaQuery from './mediaQueries'

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  border: 1px solid var(--border-dark);
  width: fit-content;
  margin: 0 auto;
  padding: 1rem 2rem;
  border-radius: 2rem;
  margin-bottom: 40px;
  position: sticky;
  top: 0;
  background-color: var(--background-blue-transparent);
  @media ${mediaQuery.mobile} {
    position: relative;
  }
`

const SelVersionText = styled.div`
  text-align: center;
  margin-top: 40px;
`

const SpecsCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const SpecsCardTitle = styled.div`
  text-align: center;
`

const ToUpButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--background-darker-transparent);
  color: var(--text-light);
  border: 1px solid var(--text-light);
  padding: 1rem;
  cursor: pointer;
  z-index: 1000;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: var(--border-light);
    outline: 1px solid var(--border-light);
  }
`

export { SelectContainer, SpecsCard, SpecsCardTitle, ToUpButton, SelVersionText }