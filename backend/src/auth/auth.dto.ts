export interface SignUpDto {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface LogInDto {
  email: string;
  password: string;
}
