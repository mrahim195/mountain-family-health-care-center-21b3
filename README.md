# Mountain Family Health Care Center

Production website for **Mountain Family Health Care Center**, a family practice clinic in Fresno, CA.

## Stack

- Next.js (App Router)
- TypeScript
- Nodemailer contact / appointment requests (`/api/contact`)

## Develop

```bash
npm install
cp .env.example .env.local
# fill SMTP_* and CONTACT_* values
npm run dev
```

## Build

```bash
npm run build
npm start
```
