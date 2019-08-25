export class User {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  role: number;
  status: number;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}
