import styled from 'styled-components'

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
`

const SpecsCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const SpecsCardTitle = styled.div`
text-align: center;
`

export { SelectContainer, SpecsCard, SpecsCardTitle }