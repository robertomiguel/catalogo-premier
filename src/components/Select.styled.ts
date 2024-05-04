import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Dropdown = styled.div`
    display: flex;
    flex-direction: column;
    gap: .3rem;
`

const Label = styled.label`
    color: var(--text-light);
    font-size: 12px;
    margin-left: .7rem;
`

const ClearIcon = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%); /* Centra verticalmente el icono */
    right: 0;
    margin-right: 5px;
    background-color: var(--background-blue);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    width: 1rem;
    height: 1rem;
    padding: 4px;
    color: var(--text-light);
    font-size: 12px;
    margin-left: .7rem;
    &:hover {
        cursor: pointer;
        color: var(--text-dark);
    }
`

const LoadingIcon = styled.div`
    position: absolute;
    top: 4px;
    right: 0;
    margin-right: 5px;
    border-radius: 100%;
    width: 1rem;
    height: 1rem;
    color: var(--text-light);
    margin-left: .7rem;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid var(--border-light);
    animation: ${rotate} 1s linear infinite;
`


const Menu = styled.div<{selected?: boolean, isOpen: boolean}>`
    position: absolute;
    margin-top: 55px;
    display: flex;
    flex-direction: column;
    background-color: var(--background-dark);
    width: fit-content;
    height: fit-content;
    border-radius: 15px;
    padding: .5rem 1rem .5rem 1rem;
    z-index: 1;
    max-height: 400px;
    overflow: auto;
    &:focus {
        outline: 1px solid var(--border-light);
    }
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    animation: ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 0.3s ease-in-out;
    box-shadow:
        5px 5px 5px var(--background-darker-transparent),
        inset 5px 5px 5px rgba(255, 255, 255, 0.2),
        inset -5px -5px 5px rgba(255, 255, 255, 0);
`

const Option = styled.div<{selected?: boolean}>`
    color: var(--text-light);
    background-color: ${({ selected }) => (selected ? 'var(--background-blue)' : 'unset')};
    padding: .5rem;
    border-radius: 5px;
    white-space: nowrap;
    &:hover {
        cursor: pointer;
        background-color: var(--border-light);
        color: var(--text-dark);
    }
`

export { Dropdown, Label, ClearIcon, Menu, Option, LoadingIcon }