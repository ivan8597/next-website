import React from 'react';
import { render, screen } from '@testing-library/react';
import ClientOnly from '../../components/ClientOnly';

describe('Компонент ClientOnly', () => {
  test('рендерит fallback на серверной стороне', () => {
    const useEffectSpy = jest.spyOn(React, 'useEffect');
    useEffectSpy.mockImplementationOnce(() => {});

    render(
      <ClientOnly fallback={<div data-testid="fallback">Loading...</div>}>
        <div data-testid="children">Content</div>
      </ClientOnly>
    );

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(screen.queryByTestId('children')).not.toBeInTheDocument();

    useEffectSpy.mockRestore();
  });

  test('рендерит дочерние элементы на клиентской стороне', () => {
    // Симуляция клиентской стороны
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementationOnce(() => [true, jest.fn()]);

    render(
      <ClientOnly fallback={<div data-testid="fallback">Loading...</div>}>
        <div data-testid="children">Content</div>
      </ClientOnly>
    );

    expect(screen.queryByTestId('fallback')).not.toBeInTheDocument();
    expect(screen.getByTestId('children')).toBeInTheDocument();

    useStateSpy.mockRestore();
  });
}); 