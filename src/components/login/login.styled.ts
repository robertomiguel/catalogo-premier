import styled from "styled-components";

export const LoginContainer = styled.div`
    width: fit-content;
    position: relative;
    margin-bottom: .5rem;
`;

export const LoginForm = styled.form`
    position: absolute;
    width: 250px;
    z-index: 200;
    padding: 1rem;
    border-radius: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: var(--box-shadow);
    flex-direction: column;
    background: var(--text-dark);
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const LoginInputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

export const LoginButtons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;