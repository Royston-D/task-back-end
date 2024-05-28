import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewOpenAI } from 'src/schemas/NewOpenAI.schema';

@Injectable()
export class OpenAiService {
  constructor(
    @InjectModel(NewOpenAI.name)
    private newOpenAI: Model<NewOpenAI>,
  ) {}

  async savetodb() {
    const res: any = [
      { name: 'file1.js', content: "const greeting = 'Hello World';" },
      { name: 'file2.js', content: 'function sum(a, b) { return a + b; }' },
      {
        name: 'file3.js',
        content: "const colors = ['red', 'green', 'blue'];",
      },
    ];
    try {
      const data = {
        projectName: 'string',
        projectFrameWork: 'string',
        description: 'string',
        fileData: res,
      };
      const createData = new this.newOpenAI(data);
      return await createData.save();
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
