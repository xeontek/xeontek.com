# XeonTek Website

Next.js 15 corporate website deployed on Vercel.

## Getting Started

```
npm install
npm run dev
```

## Environment Variables

### Contact Form (Nodemailer + Google Workspace SMTP)

The contact form sends emails via Google Workspace SMTP. You need three environment variables:

| Variable    | Description                                      | Example                    |
| ----------- | ------------------------------------------------ | -------------------------- |
| `SMTP_USER` | Google Workspace email used to send              | `enquiries@xeontek.com`    |
| `SMTP_PASS` | Google App Password (not your account password)  | `abcd efgh ijkl mnop`      |
| `SMTP_TO`   | Recipient email (optional, defaults to SMTP_USER)| `team@xeontek.com`         |

### Creating a Google App Password

1. Sign in to [myaccount.google.com](https://myaccount.google.com) with the Workspace email
2. Ensure 2-Step Verification is enabled on the account
3. Go to [myaccount.google.com/security](https://myaccount.google.com/security) and under **"How you sign in to Google"**, click **App passwords**
4. Enter a name for the app (e.g. `Nodemailer`), then click **Create**
5. Copy the 16-character password and use it as `SMTP_PASS`

> **Note:** 2-Step Verification must be enabled on the account. For Google Workspace accounts, an admin must also enable **"Allow users to generate app passwords"** in the Admin Console under **Security > Authentication > 2-Step Verification**.

### Adding to Vercel

```
vercel env add SMTP_USER
vercel env add SMTP_PASS
vercel env add SMTP_TO
```

Or add them in the Vercel dashboard under **Settings > Environment Variables**.

For local development, create a `.env.local` file:

```
SMTP_USER=enquiries@xeontek.com
SMTP_PASS=your-app-password
```
