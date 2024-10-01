import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtMiddleware } from 'src/middlewares/jwt.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  // add middleware
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(JwtMiddleware)
  //     .forRoutes({path:'users', method: RequestMethod.ALL})
  // }
}
