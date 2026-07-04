import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthCredentialsDto } from '../dtos/auth-credentials-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  private repo: Repository<User>;
  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(User);
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, email } = authCredentialsDto;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.repo.create({
      username,
      password: hashedPassword,
      email,
    });

    try {
      await this.repo.save(user);
    } catch (err: any) {
      if (err.code === '23505') {
        throw new ConflictException('Username or Email already exists');
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return await this.repo.findOneBy({ username });
  }
}
