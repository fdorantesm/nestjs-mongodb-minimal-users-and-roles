import { ResourceEntity } from '@/core/domain/resource-entity';
import { Role } from '@/modules/roles/domain/interfaces/role.interface';

export class RoleEntity extends ResourceEntity<Role> {
  private _name: string;
  private _code: string;
  private _description: string;

  constructor(role: Role) {
    super(role);
    this._uuid = role.uuid;
    this._name = role.name;
    this._code = role.code;
    this._description = role.description;
    this._isActive = role.isActive;
  }

  public static create(role: Role): RoleEntity {
    return new RoleEntity(role);
  }

  public get name(): string {
    return this._name;
  }

  public get code(): string {
    return this._code;
  }

  public get description(): string {
    return this._description;
  }

  public isAdmin(): boolean {
    return this._code === 'admin';
  }

  public toJson(): Partial<Role> {
    return {
      uuid: this._uuid,
      name: this._name,
      code: this._code,
      description: this._description,
      isActive: this._isActive,
    };
  }

  public toObject(): Role {
    return {
      uuid: this._uuid,
      name: this._name,
      code: this._code,
      description: this._description,
      isActive: this._isActive,
    };
  }
}
