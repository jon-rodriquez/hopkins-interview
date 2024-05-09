export class UserDto {
  email: string;
  password: string;
  name: string;
  role: string;
  isActive: boolean;
}

export class UserSecureDto {
  user: {
    email: string;
    name: string;
    role: string;
  };
  auth: {
    token: string;
  };
}

export class UserDocumentDto extends UserDto {
  id: number;
  auth?: {
    expires: Date | null;
  };
}
