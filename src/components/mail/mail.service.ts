import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Mailgun from 'mailgun-js';
import IMailgunData from './interfaces/mail.interface';

@Injectable()
export default class MailService {
  private mg = new Mailgun({
    apiKey: this.configService.get<string>('MAILGUN_API_KEY'),
    domain: this.configService.get<string>('MAILGUN_API_DOMAIN'),
  });

  constructor(private configService: ConfigService) {}

  send(data: IMailgunData): Promise<Mailgun.messages.SendResponse> {
    return new Promise((res, rej) => {
      this.mg.messages().send(data, function (error, body) {
        if (error) {
          rej(error);
        }
        res(body);
      });
    });
  }
}
