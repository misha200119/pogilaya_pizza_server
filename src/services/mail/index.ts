import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from '@/env';
import APIError from '@/exceptions/apiError';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

class MailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });

    this.transporter = transporter;
  }

  async sendActivationEmail(email: string, activationLink: string) {
    try {
      await this.transporter.sendMail({
        from: SMTP_USER,
        to: email,
        subject: `Account activation ${activationLink}`,
        text: '',
        html: `
          <div>
            <h1>
              Click to link for account activation
            </h1>
            <a href="${activationLink}">
              ${activationLink}
            </a>
          </div>
        `,
      });
    } catch (error) {
      throw APIError.unexpectedServerError('sendActivationEmail');
    }
  }
}

export default new MailService();
