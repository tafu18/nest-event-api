import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ParticipantsModule } from './participants/participants.module';
import { CompaniesModule } from './companies/companies.module';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Company } from './companies/entities/company.entity';
import { Participant } from './participants/entities/participant.entity';
import { Event } from './events/entities/event.entity';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './auth/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' }, // Token geçerlilik süresi
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Company, Participant, Event]),
    UsersModule,
    ParticipantsModule,
    CompaniesModule,
    EventsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
