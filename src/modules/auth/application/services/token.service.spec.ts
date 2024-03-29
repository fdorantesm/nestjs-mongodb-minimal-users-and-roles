import { TokenService } from '@/modules/auth/application/services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secretOrPrivateKey: 'secret',
          signOptions: {
            expiresIn: '1d',
          },
        }),
      ],
      providers: [TokenService],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a jwt token', async () => {
    const id = 'b0093421-f622-492d-a9ea-12e901f93b51';
    const result = await service.create({
      uuid: id,
      roles: [],
    });

    const value = await service.decode(result.accessToken);

    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('expiresAt');
    expect(typeof result.expiresAt).toBe('number');
    expect(value.uuid).toBe(id);
  });

  it('should decode a jwt token', async () => {
    const id = 'b0093421-f622-492d-a9ea-12e901f93b51';
    const result = await service.create({
      uuid: id,
      roles: [],
    });

    const value = await service.decode(result.accessToken);

    expect(value.uuid).toBe(id);
  });
});
