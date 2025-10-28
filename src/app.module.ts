import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoescolaModule } from './autoescola/autoescola.module';
import { VeiculoModule } from './veiculo/veiculo.module';
import { InstrutorModule } from './instrutor/instrutor.module';




@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true, 
    }),

     TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/entity/*.entity.{ts,js}'],
      synchronize: process.env.NODE_ENV !== 'production',      
    }),

     AutoescolaModule,

     VeiculoModule,

     InstrutorModule,       

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
