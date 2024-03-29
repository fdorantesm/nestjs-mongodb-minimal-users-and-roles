import { Pug } from '@/modules/shared/infrastructure/vendors/pug/pug';

describe('PugService', () => {
  const service = new Pug();

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Render template', () => {
    const template = service.render(`${__dirname}/test.pug`, {
      name: 'world',
    });
    expect(template).toBe('<h1>Hello, world</h1>');
  });
});
