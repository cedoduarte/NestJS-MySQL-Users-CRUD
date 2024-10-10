import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ProfilesModule } from './profiles/profiles.module';

const mysqlConnection: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "db_crud",
  autoLoadEntities: true,
  synchronize: true // set to "false" in production
};

@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlConnection),
    UsersModule,
    ProfilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
