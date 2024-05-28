import { Controller, Post } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';

@Controller('open-ai')
export class OpenAiController {
  constructor(private openaiService: OpenAiService) {}

  @Post('saveData')
  async savetoDB() {
    return this.openaiService.savetodb();
  }
}
