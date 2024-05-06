import styled from 'styled-components'
import mediaQuery from '../mediaQueries'

const Container = styled.div`
    margin: 0 auto;
    width: fit-content;
    margin-bottom: 20px;
    background-color: var(--background-blue-transparent);
    width: 220px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    @media ${mediaQuery.mobile} {
        top: 0;
        width: 100%;
        border-radius: 0;
    }
`

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--background-darker-transparent);
    display: flex;
    justify-content: center;
    align-items: center;
`
const Content = styled.div`
    background-color: var(--background-blue);
    padding: 1rem;
    border-radius: 15px;
    width: 100%;
    max-width: 400px;
    & form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
`
const Title = styled.div`
    font-size: 20px;
    padding: 1rem;
    padding-top: 0;
    width: fit-content;
    margin: 0 auto;
`
const FieldBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    & label {
        margin-left: 15px;
    }
`
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: end;
`

const ErrorText = styled.div`
    font-size: 14px;
    margin-left: 15px;
    color: var(--border-light);
    position: absolute;
    transform: translateY(60px);
`

export { Modal, Content, Title, FieldBox, ButtonContainer, ErrorText, Container }