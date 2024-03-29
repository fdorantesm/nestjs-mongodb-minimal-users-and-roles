import { UserEntity } from '@/modules/users/domain/entities/user.entity';
import { User } from '@/modules/users/domain/interfaces/user.interface';

describe('UserEntity', () => {
  it('should create a user entity', () => {
    const user: User = {
      uuid: 'b10c4e7a-7d80-4414-89d9-3e7ca8901561',
      email: 'test@example.com',
      username: 'test',
      password: 'password123',
      roles: [],
      isActive: true,
      profileId: 'dd28754b-18e6-4431-9183-ccc5b3b69a7a',
    };

    const userEntity = UserEntity.create(user);

    expect(userEntity.uuid).toEqual(user.uuid);
    expect(userEntity.getEmail()).toEqual(user.email);
    expect(userEntity.getPassword()).toEqual(user.password);
    expect(userEntity.getRoles()).toEqual(user.roles);
    expect(userEntity.getProfileId()).toEqual(user.profileId);
    expect(userEntity.isActive).toEqual(user.isActive);
  });

  it('should convert user entity to object', () => {
    const user: User = {
      uuid: 'b10c4e7a-7d80-4414-89d9-3e7ca8901561',
      email: 'test@example.com',
      username: 'test',
      password: 'password123',
      roles: [],
      isActive: true,
      profileId: 'dd28754b-18e6-4431-9183-ccc5b3b69a7a',
    };

    const userEntity = UserEntity.create(user);
    const userObject = userEntity.toObject();

    expect(userObject.uuid).toEqual(user.uuid);
    expect(userObject.email).toEqual(user.email);
    expect(userObject.password).toBeUndefined();
    expect(userObject.roles).toEqual(user.roles);
    expect(userObject.profileId).toEqual(user.profileId);
    expect(userObject.isActive).toEqual(user.isActive);
  });

  it('should convert user entity to JSON', () => {
    const user: User = {
      uuid: 'b10c4e7a-7d80-4414-89d9-3e7ca8901561',
      email: 'test@example.com',
      username: 'test',
      password: 'password123',
      roles: [],
      isActive: true,
      profileId: 'dd28754b-18e6-4431-9183-ccc5b3b69a7a',
    };

    const userEntity = UserEntity.create(user);
    const userJson = userEntity.toJson();

    expect(userJson.uuid).toEqual(user.uuid);
    expect(userJson.email).toEqual(user.email);
    expect(userJson.password).toBeUndefined();
    expect(userJson.roles).toEqual(user.roles);
    expect(userJson.profileId).toEqual(user.profileId);
    expect(userJson.isActive).toEqual(user.isActive);
  });
});
