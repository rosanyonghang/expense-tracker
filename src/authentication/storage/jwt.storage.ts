import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { TokenStorage } from './token.storage';

interface TokenBody {
  readonly type: string;
  readonly sub: string;
}

@Injectable()
export class JwtStorage implements TokenStorage {
  private static readonly TOKEN_EXPIRY = '7d';
  private static readonly TOKEN_TYPE = 'authentication';

  private readonly jwtService: JwtService;
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  constructor(
    @Inject(JwtService)
    jwtService: JwtService,
    @InjectRepository(User)
    userRepository: Repository<User>,
  ) {
    this.jwtService = jwtService;
    this.userRepository = userRepository;
  }

  public async generateToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      {
        type: JwtStorage.TOKEN_TYPE,
        sub: user.id,
      } as TokenBody,
      {
        secret: process.env.JWT_SECRET ?? 'expensetracker2024',
        expiresIn: JwtStorage.TOKEN_EXPIRY,
      },
    );
  }

  public async validateToken(token: string): Promise<User> {
    const tokenBody: TokenBody = await this.jwtService.verifyAsync<TokenBody>(
      token,
      {
        secret: process.env.JWT_SECRET ?? 'expensetracker2024',
      },
    );

    if (tokenBody.type !== JwtStorage.TOKEN_TYPE) {
      throw new Error('Invalid token');
    }

    return this.userRepository.findOneOrFail({ where: { id: tokenBody.sub } });
  }
}
