import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../../domain/repository';
import { User } from '../../../domain/user';
import { UserEntity } from './user.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async FindByRun(run: string): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { run } });
    return entity ? this.toDomain(entity) : null;
  }

  async Find(id: string): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async Save(user: User): Promise<void> {
    const entity = this.toEntity(user);
    await this.repo.save(entity);
  }

  private toDomain(entity: UserEntity): User {
    return new User(entity.id, entity.run, entity.name);
  }

  private toEntity(user: User): UserEntity {
    return {
      id: user.getId(),
      run: user.getRun(),
      name: user.getName(),
    };
  }
}
