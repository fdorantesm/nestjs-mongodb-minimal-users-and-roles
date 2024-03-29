import { Entity } from '@/core/domain/entity';
import { Profile } from '@/modules/users/domain/interfaces/profile.interface';

export class ProfileEntity extends Entity<Profile> {
  constructor(profile: Profile) {
    super(profile);
  }

  public static create(profile: Profile) {
    return new ProfileEntity(profile);
  }

  public getName() {
    return this._data.name;
  }

  public getSurname() {
    return this._data.surname;
  }

  public getDisplayName() {
    return this._data.displayName;
  }

  public getAvatar() {
    return this._data.avatar;
  }

  public getBio() {
    return this._data.bio;
  }

  public getUserId() {
    return this._data.userId;
  }

  public toObject(): Profile {
    return {
      uuid: super.getUuid(),
      name: this.getName(),
      surname: this.getSurname(),
      displayName: this.getDisplayName(),
      avatar: this.getAvatar(),
      bio: this.getBio(),
      userId: this.getUserId(),
    };
  }

  public toJson(): Profile {
    return {
      uuid: super.getUuid(),
      name: this.getName(),
      surname: this.getSurname(),
      displayName: this.getDisplayName(),
      avatar: this.getAvatar(),
      bio: this.getBio(),
      userId: this.getUserId(),
    };
  }
}
