import * as bcrypt from 'bcrypt';

class HashPassword {
  private salt: string;
  constructor() {
    this.salt = bcrypt.genSaltSync(10);
  }

  public hashPassword(password: string): string {
    return bcrypt.hashSync(password, this.salt);
  }

  public comparePassword(
    password: string,
    hashedPassword: string,
  ): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

export default HashPassword;
