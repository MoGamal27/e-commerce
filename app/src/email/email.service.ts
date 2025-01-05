import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
  private transport 

  constructor(private configService: ConfigService) {
    
    this.transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: this.configService.get<string>('EMAIL_USER'),
            pass: this.configService.get<string>('EMAIL_PASSWORD')
        }
    })
  }

  async sendEmail(to: string, subject: string, html: string){
    await this.transport.sendMail({
        from: this.configService.get<string>('EMAIL_USER'),
        to,
        subject,
        html
    })
  }
}