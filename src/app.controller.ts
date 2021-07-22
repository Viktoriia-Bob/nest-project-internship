import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller('app')
export class AppController {
  private start: number;
  constructor() {
    this.start = Date.now();
  }
  @ApiOkResponse({ description: 'Return status and uptime' })
  @Get('healthCheck')
  async healthCheck() {
    const now = Date.now();
    return {
      status: 'My API Online',
      uptime: Number((now - this.start) / 1000).toFixed(0),
    };
  }
}
