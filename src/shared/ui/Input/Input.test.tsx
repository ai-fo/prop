import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Input variant="default" />);
    const wrapper = screen.getByRole('textbox').parentElement;
    expect(wrapper).toHaveClass('default');

    rerender(<Input variant="filled" />);
    expect(wrapper).toHaveClass('filled');

    rerender(<Input variant="outlined" />);
    expect(wrapper).toHaveClass('outlined');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Input size="small" />);
    const wrapper = screen.getByRole('textbox').parentElement;
    expect(wrapper).toHaveClass('small');

    rerender(<Input size="medium" />);
    expect(wrapper).toHaveClass('medium');

    rerender(<Input size="large" />);
    expect(wrapper).toHaveClass('large');
  });

  it('applies fullWidth class when prop is true', () => {
    render(<Input fullWidth />);
    const container = screen.getByRole('textbox').parentElement?.parentElement;
    expect(container).toHaveClass('fullWidth');
  });

  it('displays error message', () => {
    render(<Input error="Email is required" />);
    const errorElement = screen.getByRole('alert');
    expect(errorElement).toHaveTextContent('Email is required');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('displays hint message', () => {
    render(<Input hint="Enter your email address" />);
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('does not display hint when error is present', () => {
    render(<Input error="Error message" hint="Hint message" />);
    expect(screen.queryByText('Hint message')).not.toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders start icon', () => {
    render(<Input startIcon={<span data-testid="start-icon">🔍</span>} />);
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('renders end icon', () => {
    render(<Input endIcon={<span data-testid="end-icon">👁</span>} />);
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('handles change events', async () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test');
    expect(handleChange).toHaveBeenCalled();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);
    const container = screen.getByRole('textbox').parentElement?.parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('passes through other props', () => {
    render(<Input type="email" name="email" required />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveAttribute('required');
  });

  it('generates unique id when not provided', () => {
    render(<Input label="Test Input" />);
    const input = screen.getByLabelText('Test Input');
    expect(input).toHaveAttribute('id');
  });

  it('uses provided id', () => {
    render(<Input id="custom-id" label="Test Input" />);
    const input = screen.getByLabelText('Test Input');
    expect(input).toHaveAttribute('id', 'custom-id');
  });

  it('sets aria-describedby for error', () => {
    render(<Input id="test-input" error="Error message" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
  });

  it('sets aria-describedby for hint', () => {
    render(<Input id="test-input" hint="Hint message" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-hint');
  });

  it('floating label behavior', async () => {
    render(<Input label="Email" />);
    const input = screen.getByRole('textbox');
    const wrapper = input.parentElement;
    
    // Focus should activate the label
    fireEvent.focus(input);
    expect(wrapper).toHaveClass('active');
    
    // Blur without value should deactivate
    fireEvent.blur(input);
    expect(wrapper).not.toHaveClass('active');
    
    // Type something
    await userEvent.type(input, 'test@example.com');
    
    // Blur with value should keep active
    fireEvent.blur(input);
    expect(wrapper).toHaveClass('active');
  });

  it('applies error class to wrapper', () => {
    render(<Input error="Error" />);
    const wrapper = screen.getByRole('textbox').parentElement;
    expect(wrapper).toHaveClass('error');
  });

  it('renders liquid effect elements', () => {
    const { container } = render(<Input />);
    expect(container.querySelector('.liquidBorder')).toBeInTheDocument();
    expect(container.querySelector('.liquidFocus')).toBeInTheDocument();
  });

  it('placeholder behavior with label', () => {
    render(<Input label="Email" placeholder="Enter email" />);
    const input = screen.getByRole('textbox');
    // When label is present, placeholder should be a space
    expect(input).toHaveAttribute('placeholder', ' ');
  });

  it('placeholder behavior without label', () => {
    render(<Input placeholder="Enter email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter email');
  });
});