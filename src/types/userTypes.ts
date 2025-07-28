interface BaseUser extends Document {
  _id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  gender: string;
  password: string;
  address?: string;
  accsesToken: string;
}

interface UserMethods extends Document {
  comparePassword: (password: string) => Promise<boolean>;
  generateAuthToken: () => string;
  generateRefreshToken: () => string;
}

export type IUser = BaseUser & UserMethods;
