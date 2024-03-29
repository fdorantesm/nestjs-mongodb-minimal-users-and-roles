import { ResourceEntity } from '@/core/domain/resource-entity';
import { ProfileEntity } from '@/modules/users/domain/entities/profile.entity';
import { User } from '@/modules/users/domain/interfaces/user.interface';

export class UserEntity extends ResourceEntity<User> {
  private __profile: ProfileEntity;

  public constructor(user: User) {
    super(user);
    this.__profile = user.profile && ProfileEntity.create(user.profile);
  }

  public static create(user: User): UserEntity {
    return new UserEntity(user);
  }

  public getEmail(): string {
    return this._data.email;
  }

  public getPassword(): string | undefined {
    return this._data.password;
  }

  public getRoles(): string[] {
    return this._data.roles;
  }

  public getProfileId(): string {
    return this._data.profileId;
  }

  public addRole(role: string): void {
    this._data.roles.push(role);
  }

  public getUsername(): string {
    return this._data.username;
  }

  public setProfile(profile: ProfileEntity): void {
    this.__profile = profile;
  }

  public getProfile(): ProfileEntity {
    return this.__profile;
  }

  public toObject(): User {
    return {
      uuid: this.getUuid(),
      username: this.getUsername(),
      email: this.getEmail(),
      password: undefined,
      roles: this.getRoles(),
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      isActive: this._isActive,
      profileId: this.getProfileId(),
      profile: this.__profile ? this.__profile.toObject() : undefined,
    };
  }

  public toJson(): Partial<User> {
    return {
      uuid: this.getUuid(),
      username: this.getUsername(),
      email: this.getEmail(),
      password: undefined,
      roles: this.getRoles(),
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      isActive: this._isActive,
      profileId: this.getProfileId(),
      profile: this.__profile ? this.__profile.toJson() : undefined,
    };
  }
}
