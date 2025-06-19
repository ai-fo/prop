import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Card variant="default">Default</Card>);
    expect(screen.getByText('Default').parentElement?.parentElement).toHaveClass('default');

    rerender(<Card variant="glass">Glass</Card>);
    expect(screen.getByText('Glass').parentElement?.parentElement).toHaveClass('glass');

    rerender(<Card variant="elevated">Elevated</Card>);
    expect(screen.getByText('Elevated').parentElement?.parentElement).toHaveClass('elevated');

    rerender(<Card variant="bordered">Bordered</Card>);
    expect(screen.getByText('Bordered').parentElement?.parentElement).toHaveClass('bordered');
  });

  it('applies correct padding classes', () => {
    const { rerender } = render(<Card padding="none">No padding</Card>);
    expect(screen.getByText('No padding').parentElement?.parentElement).toHaveClass('padding-none');

    rerender(<Card padding="small">Small</Card>);
    expect(screen.getByText('Small').parentElement?.parentElement).toHaveClass('padding-small');

    rerender(<Card padding="medium">Medium</Card>);
    expect(screen.getByText('Medium').parentElement?.parentElement).toHaveClass('padding-medium');

    rerender(<Card padding="large">Large</Card>);
    expect(screen.getByText('Large').parentElement?.parentElement).toHaveClass('padding-large');
  });

  it('applies interactive class when prop is true', () => {
    render(<Card interactive>Interactive card</Card>);
    expect(screen.getByText('Interactive card').parentElement?.parentElement).toHaveClass('interactive');
  });

  it('applies glowOnHover class when prop is true', () => {
    render(<Card glowOnHover>Glow card</Card>);
    expect(screen.getByText('Glow card').parentElement?.parentElement).toHaveClass('glowOnHover');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Card</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Custom</Card>);
    expect(screen.getByText('Custom').parentElement?.parentElement).toHaveClass('custom-class');
  });

  it('passes through other props', () => {
    render(<Card data-testid="custom-card" role="article">Card</Card>);
    const card = screen.getByTestId('custom-card');
    expect(card).toHaveAttribute('role', 'article');
  });

  it('renders liquid border element', () => {
    const { container } = render(<Card>Card</Card>);
    const liquidBorder = container.querySelector('.liquidBorder');
    expect(liquidBorder).toBeInTheDocument();
    expect(liquidBorder).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  it('applies header class', () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText('Header')).toHaveClass('header');
  });

  it('applies custom className', () => {
    render(<CardHeader className="custom-header">Header</CardHeader>);
    expect(screen.getByText('Header')).toHaveClass('custom-header');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardHeader ref={ref}>Header</CardHeader>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardBody', () => {
  it('renders children correctly', () => {
    render(<CardBody>Body content</CardBody>);
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('applies body class', () => {
    render(<CardBody>Body</CardBody>);
    expect(screen.getByText('Body')).toHaveClass('body');
  });

  it('applies custom className', () => {
    render(<CardBody className="custom-body">Body</CardBody>);
    expect(screen.getByText('Body')).toHaveClass('custom-body');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardBody ref={ref}>Body</CardBody>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardFooter', () => {
  it('renders children correctly', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('applies footer class', () => {
    render(<CardFooter>Footer</CardFooter>);
    expect(screen.getByText('Footer')).toHaveClass('footer');
  });

  it('applies custom className', () => {
    render(<CardFooter className="custom-footer">Footer</CardFooter>);
    expect(screen.getByText('Footer')).toHaveClass('custom-footer');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardFooter ref={ref}>Footer</CardFooter>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('Card composition', () => {
  it('renders correctly with all sections', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});