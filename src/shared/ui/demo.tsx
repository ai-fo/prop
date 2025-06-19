import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Input } from './index';
import './theme.css';

export const UIDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [email, setEmail] = useState('');
  
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Ultra Liquid Design System Components</h1>
      
      {/* Button Examples */}
      <section style={{ marginBottom: '60px' }}>
        <h2>Buttons</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="glass">Glass Button</Button>
        </div>
        
        <h3>Sizes</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
        
        <h3>States</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button fullWidth style={{ maxWidth: '300px' }}>Full Width</Button>
        </div>
      </section>
      
      {/* Card Examples */}
      <section style={{ marginBottom: '60px' }}>
        <h2>Cards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <Card>
            <CardHeader>Default Card</CardHeader>
            <CardBody>
              This is a default card with standard styling. It provides a clean container for content.
            </CardBody>
            <CardFooter>
              <Button variant="ghost" size="small">Cancel</Button>
              <Button variant="primary" size="small">Save</Button>
            </CardFooter>
          </Card>
          
          <Card variant="glass" interactive glowOnHover>
            <CardHeader>Glass Card</CardHeader>
            <CardBody>
              This glass morphism card has a translucent effect with backdrop blur. Hover to see the glow effect!
            </CardBody>
          </Card>
          
          <Card variant="elevated" padding="large">
            <h3 style={{ margin: '0 0 16px 0' }}>Elevated Card</h3>
            <p>This card has an elevated shadow effect for more depth and large padding.</p>
          </Card>
          
          <Card variant="bordered" interactive>
            <CardBody>
              A bordered interactive card. Click or hover to see the liquid effects!
            </CardBody>
          </Card>
        </div>
      </section>
      
      {/* Input Examples */}
      <section style={{ marginBottom: '60px' }}>
        <h2>Inputs</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <Input
            label="Default Input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            hint="This is a helpful hint"
          />
          
          <Input
            variant="filled"
            label="Filled Input"
            placeholder="Enter text..."
            startIcon={<span>📝</span>}
          />
          
          <Input
            variant="outlined"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={email && !email.includes('@') ? 'Please enter a valid email' : ''}
            endIcon={<span>✉️</span>}
          />
          
          <Input
            label="Password"
            type="password"
            hint="Must be at least 8 characters"
            endIcon={<span>👁</span>}
          />
        </div>
        
        <h3>Sizes</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <Input size="small" label="Small Input" />
          <Input size="medium" label="Medium Input" />
          <Input size="large" label="Large Input" />
        </div>
        
        <h3>Full Width</h3>
        <Input
          fullWidth
          label="Full Width Input"
          placeholder="This input takes full container width"
        />
      </section>
      
      {/* Combined Example */}
      <section>
        <h2>Combined Example</h2>
        <Card variant="glass" style={{ maxWidth: '500px' }}>
          <CardHeader>Sign In</CardHeader>
          <CardBody>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Input
                fullWidth
                label="Email"
                type="email"
                startIcon={<span>👤</span>}
              />
              <Input
                fullWidth
                label="Password"
                type="password"
                startIcon={<span>🔒</span>}
              />
              <Button variant="primary" fullWidth>
                Sign In
              </Button>
              <Button variant="ghost" fullWidth>
                Create Account
              </Button>
            </form>
          </CardBody>
        </Card>
      </section>
    </div>
  );
};