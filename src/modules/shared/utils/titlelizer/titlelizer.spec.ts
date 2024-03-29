import { Titlelizer } from '@/modules/shared/utils/titlelizer/titlelizer';

describe('Titlelizer', () => {
  const titlelizer = new Titlelizer();

  it('should be defined', () => {
    expect(titlelizer).toBeDefined();
    expect(titlelizer).toBeInstanceOf(Titlelizer);
  });

  it('should titlelize a slug', () => {
    const slug = 'this-is-a-test';
    const title = titlelizer.titlelize(slug);
    expect(title).toBe('This is a test');
  });
});
