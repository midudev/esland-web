import { screen, render } from '@testing-library/preact'

import LinkReact from '@/components/Link';
import { expect } from 'vitest';

test('mount component with locale(ca) link', () => {
  render(<LinkReact href="/vota"
    locale="ca">This is a test</LinkReact>)
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/ca/vota')
  expect(link?.textContent).toBe('This is a test')
  expect(link?.outerHTML).toMatchSnapshot()
})

test('mount component with locale(default) link', () => {
  render(<LinkReact href="/vota">This is a test</LinkReact>)
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/vota')
  expect(link?.textContent).toBe('This is a test')
  expect(link?.outerHTML).toMatchSnapshot()
})

test('mount component with external link, locale not has effect', () => {
  expect(LinkReact).toBeTruthy();
  render(<LinkReact locale="a" href="https://www.google.com/">This is a test</LinkReact>)
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', 'https://www.google.com/')
  expect(link?.textContent).toBe('This is a test')
  expect(link?.outerHTML).toMatchSnapshot()

});

test('mount component with external link, locale not has effect', () => {
  expect(LinkReact).toBeTruthy();
  render(<LinkReact locale="ca" href="#more-d">This is a test</LinkReact>)
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '#more-d')
  expect(link?.textContent).toBe('This is a test')
  expect(link?.outerHTML).toMatchSnapshot()

});
