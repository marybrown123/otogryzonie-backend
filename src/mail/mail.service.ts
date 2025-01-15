import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(
    recipient: string,
    sender: string,
    subject: string,
    text: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: recipient,
      from: sender,
      subject,
      text,
      html: `<b>${text}</b>`,
    });
  }
}
