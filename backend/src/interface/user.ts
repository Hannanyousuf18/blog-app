export interface UserBase {
  name: string;
  email: string;
  phone: string;
}

export interface User extends UserBase {
  id: number;
  password: string;
}
