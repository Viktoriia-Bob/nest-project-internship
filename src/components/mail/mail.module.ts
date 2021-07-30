import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import MailService from './mail.service';
import { MailgunModule } from '@nextnm/nestjs-mailgun';

@Module({
  imports: [
    MailgunModule.forAsyncRoot({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          DOMAIN: configService.get<string>('MAILGUN_API_DOMAIN'),
          API_KEY: configService.get<string>('MAILGUN_API_KEY'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export default class MailModule {}
