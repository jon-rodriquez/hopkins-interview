export class UserDto {
  email: string;
  password: string;
  name: string;
  role: string;
}

export class UserDocumentDto extends UserDto {
  id: number;
  auth?: {
    token: string;
    expires: Date | null;
  };
}
