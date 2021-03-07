import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Input as InputImport } from './Input';
import { SearchFormProvider } from '../../../../providers/SearchFormProvider/SearchFormProvider';

export function withSearchProvider(
  ComponentToWrap,
) {
  return (props) => (
    <SearchFormProvider>
      <ComponentToWrap {...props} />
    </SearchFormProvider>
  );
}

const Input = withSearchProvider(InputImport);

describe('Input', () => {
  it('should change provider state', () => {
    const { getByRole } = render(<Input />);
    fireEvent.change(getByRole('search'), { target: { value: 'Yoda' } });

    expect(getByRole('search')).toHaveValue('Yoda');
  });
});
