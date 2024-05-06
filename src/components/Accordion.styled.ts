import styled, { keyframes } from 'styled-components';

// Define la animación de despliegue hacia abajo
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Estiliza los componentes
const Container = styled.div`
  width: 100%;
  max-width: 616px;
  margin: 0 auto;
`;

const Card = styled.div`
  transition: max-height 0.3s ease-in-out;
`;

const Label = styled.div<{ isActive: boolean }>`
  &:hover {
    cursor: pointer;
    background-color: var(--border-light);
    color: var(--border-light);
  }
  font-size: 18px;
  background: var(--background-blue-degraded);
  background-color: ${({ isActive }) => isActive ? 'var(--border-light)' : 'unset' };
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-radius: 20px;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  animation: ${slideDown} .5s ease-in-out;
  transition: max-height .5s ease-in-out;
`;

export { Label, Content, Container, Card };
