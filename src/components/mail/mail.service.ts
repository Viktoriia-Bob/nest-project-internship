import { Injectable } from '@nestjs/common';
import { MailgunService } from '@nextnm/nestjs-mailgun';
import IMailgunData from './interfaces/mail.interface';

@Injectable()
export default class MailService {
  constructor(private mailgunService: MailgunService) {}

  send(data: IMailgunData) {
    this.mailgunService.sendEmail(data);
  }
}
