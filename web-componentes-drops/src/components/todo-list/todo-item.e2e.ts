import { newE2EPage } from '@stencil/core/testing';

describe('todo-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<todo-list></todo-list>');
    const element = await page.find('todo-list');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<todo-list></todo-list>');
    const component = await page.find('todo-list');
    const element = await page.find('todo-list >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
