import { ProfileEntity } from '@/modules/users/domain/entities/profile.entity';
import type { Profile } from '@/modules/users/domain/interfaces/profile.interface';

describe('ProfileEntity', () => {
  it('should create a profile entity', () => {
    const profile: Profile = {
      uuid: '1285bfce-556e-47f9-bdfd-b7ef0457f7c9',
      name: 'John',
      surname: 'Doe',
      userId: '1234567890',
      displayName: 'John Doe',
    };

    const profileEntity = ProfileEntity.create(profile);

    expect(profileEntity).toBeInstanceOf(ProfileEntity);
    expect(profileEntity.getUuid()).toEqual(profile.uuid);
    expect(profileEntity.getName()).toEqual(profile.name);
    expect(profileEntity.getSurname()).toEqual(profile.surname);
    expect(profileEntity.getUserId()).toEqual(profile.userId);
  });

  it('should convert profile entity to object', () => {
    const profile: Profile = {
      uuid: '1285bfce-556e-47f9-bdfd-b7ef0457f7c9',
      name: 'John',
      surname: 'Doe',
      userId: '1234567890',
      displayName: 'John Doe',
    };

    const profileEntity = ProfileEntity.create(profile);
    const profileObject = profileEntity.toObject();

    expect(profileObject.name).toEqual(profile.name);
    expect(profileObject.surname).toEqual(profile.surname);
    expect(profileObject.userId).toEqual(profile.userId);
  });

  it('should convert profile entity to JSON', () => {
    const profile: Profile = {
      uuid: '1285bfce-556e-47f9-bdfd-b7ef0457f7c9',
      name: 'John',
      surname: 'Doe',
      displayName: 'John Doe',
      avatar: 'avatar.jpg',
      bio: 'Hello, World!',
      userId: '1234567890',
    };

    const profileEntity = ProfileEntity.create(profile);
    const profileJson = profileEntity.toJson();

    expect(profileJson.name).toEqual(profile.name);
    expect(profileJson.surname).toEqual(profile.surname);
    expect(profileJson.userId).toEqual(profile.userId);
  });
});
