export interface Profile {
  uuid: string;
  name: string;
  surname: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  userId: string;
}

export interface ProfilePayload {
  name: string;
  surname: string;
  displayName: string;
  avatar?: string;
  bio?: string;
}
