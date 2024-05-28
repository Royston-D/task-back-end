import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/users.module';

import { ProductModule } from './product/product.module';
import { OpenAiController } from './open-ai/open-ai.controller';
import { OpenAiModule } from './open-ai/open-ai.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost/task_backEnd`),
    UsersModule,
    ProductModule,
    OpenAiModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
