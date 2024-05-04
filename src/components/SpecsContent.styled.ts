import styled from 'styled-components'

const SpecContainer = styled.div`
  width: 100%;
  max-width: 616px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 15px;
  border: 1px solid var(--disabled-text);
  padding-bottom: 1rem;
`

const SpecTitle = styled.div`
    color: var(--text-light);
    font-size: 1.5rem;
    letter-spacing: .08em;
    padding: 1rem;
`

const SpecBox = styled.div`
    background-color: var(--text-light);
    padding: .5rem 1rem;
    border-radius: 1rem;
    color: var(--background-dark);
    margin: 0 1rem;
`

const SpecLabel = styled.div`
    font-size: 16px;
    margin-bottom: 3px;
`

const SpecValue = styled.div`
    font-weight: 700;
    font-size: 18px;
`

export { SpecContainer, SpecBox, SpecLabel, SpecValue, SpecTitle }