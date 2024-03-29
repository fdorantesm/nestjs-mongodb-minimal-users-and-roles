import { Slugify } from '@/modules/shared/infrastructure/vendors/slugify/slugify';

describe('Slugify', () => {
  const service = new Slugify();

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should pass if slug for büey is buey', () => {
    const slug = service.execute('büey');
    expect(slug).toBe('buey');
  });
});
