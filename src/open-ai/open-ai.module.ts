import { Module } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';
import { OpenAiController } from './open-ai.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { newCartSchema } from 'src/schemas/NewProduct.schema';
import { NewOpenAI, newOpenAISchema } from 'src/schemas/NewOpenAI.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NewOpenAI.name,
        schema: newOpenAISchema,
      },
    ]),
  ],
  providers: [OpenAiService],
  controllers: [OpenAiController],
  exports: [OpenAiModule],
})
export class OpenAiModule {}
