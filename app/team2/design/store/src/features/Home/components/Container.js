import styled from 'styled-components';
export const MainContainer = styled.div`
  color: white;
  color: var(--text-primary);
  border-radius: 0.75rem;
  padding: 8px 0;
  margin-top: 16px;
`;
export const Container = styled.div`
  color: var(--text-primary);
  border-radius: 0.75rem;
  overflow: hidden;
`;

export const FullHeightContainer = styled(Container)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AppContainer = styled.div`
  padding: 12px 24px;
`;
