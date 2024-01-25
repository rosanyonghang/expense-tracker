export class CreateUserCommand {
  constructor(
    readonly data: {
      readonly email: string;
      readonly password: string;
      readonly phone?: string;
      readonly fullname?: string;
      readonly img?: string;
      readonly openingBalance?: number;
      readonly address?: string;
      readonly occupation?: string;
    },
  ) {}
}
