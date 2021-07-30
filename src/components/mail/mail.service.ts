import { Injectable } from '@nestjs/common';
import { MailgunService } from '@nextnm/nestjs-mailgun';
import IMailgunData from './interfaces/mail.interface';

@Injectable()
export default class MailService {
  constructor(private mailgunService: MailgunService) {}

  async send(data: IMailgunData) {
    await this.mailgunService.sendEmail(data);
  }
}
