import { Container, Title } from '@mantine/core';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'CRUD App' }) => (
  <Container>
    <Title order={1} className="mb-4 text-center">{title}</Title>
    {children}
  </Container>
);

export default Layout;