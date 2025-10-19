# 🤖 Adal AI Community

> An AI community platform inspired by HuggingFace, featuring Claude AI Assistant integration, model & dataset exploration, and collaborative AI development tools.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat&logo=mongodb)
![Claude AI](https://img.shields.io/badge/Claude-Sonnet_4.5-purple?style=flat)

## ✨ Features

- 🤖 **Claude AI Assistant** - Intelligent chatbot powered by Claude Sonnet 4.5
- 🔐 **Authentication** - Google OAuth with NextAuth.js
- 💾 **MongoDB Integration** - User management and data persistence
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS and shadcn/ui
- 📊 **Model Explorer** - Browse 100k+ AI models
- 📁 **Dataset Library** - Access 200k+ datasets
- 🚀 **Spaces** - Deploy ML demos and applications
- 👥 **Community** - Collaborate with AI practitioners worldwide

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ or 20+
- **pnpm** (recommended) or npm/yarn
- **MongoDB Atlas** account (free tier works)
- **Google OAuth** credentials
- **Anthropic API** key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ImadManni/Adal-AI-Community.git
cd Adal-AI-Community
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials (see [Configuration](#-configuration) below)

4. **Run the development server**
```bash
pnpm dev
# or
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

---

## ⚙️ Configuration

### 1. MongoDB Atlas Setup

**Create Database:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **"Browse Collections"** → **"+ Create Database"**
3. Database name: `adaldb`
4. Collection name: `users`
5. Click **"Create"**

**Set User Permissions:**
1. Go to **"Database Access"**
2. Find your user → Click **"Edit"**
3. Set role to: **"Read and write to any database"**
4. Click **"Update User"**

**Whitelist IP:**
1. Go to **"Network Access"**
2. Click **"Add IP Address"**
3. For development: **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

**Get Connection String:**
1. Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string
4. Replace `<password>` with your actual password

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google` (production)
7. Copy **Client ID** and **Client Secret**

### 3. Anthropic API Key

1. Go to [Anthropic Console](https://console.anthropic.com)
2. Sign up or log in
3. Go to **API Keys**
4. Click **"Create Key"**
5. Copy your API key

### 4. Environment Variables

Edit your `.env.local` file:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Anthropic Claude API
ANTHROPIC_API_KEY=your-anthropic-api-key-here

# MongoDB Connection
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/adaldb?retryWrites=true&w=majority
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## 🏗️ Project Structure

```
Adal-AI-Community/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts          # NextAuth configuration
│   │   ├── claude/
│   │   │   └── route.ts              # Claude AI API endpoint
│   │   └── user/
│   │       └── route.ts              # User management API
│   ├── models/
│   ├── datasets/
│   ├── spaces/
│   └── page.tsx                       # Homepage
├── components/
│   ├── ui/                            # shadcn/ui components
│   ├── adal-assistant.tsx            # AI Assistant chat widget
│   ├── header.tsx                     # Navigation header
│   ├── footer.tsx                     # Footer
│   └── auth-provider.tsx             # Auth context provider
├── lib/
│   ├── mongodb.ts                     # MongoDB connection
│   └── auth-adapter.ts               # NextAuth MongoDB adapter
├── models/
│   └── User.ts                        # User database model
├── public/                            # Static assets
├── .env.local                         # Environment variables (not in git)
├── .env.example                       # Environment template
└── package.json
```

---

## 🤖 Claude AI Assistant

The AI Assistant is powered by Claude Sonnet 4.5 and can help with:

- **Navigation** - Find models, datasets, and features
- **Recommendations** - Get suggestions for AI models
- **Q&A** - Answer questions about AI/ML concepts
- **Platform Help** - Guidance on using Adal features

### Usage

1. Click the floating chat button (bottom-right corner)
2. Ask questions like:
   - "What models are trending?"
   - "How do I create a Space?"
   - "Tell me about Llama-3.1-405B"
   - "What datasets are good for NLP?"

### API Endpoint

```typescript
POST /api/claude

Body:
{
  "messages": [
    {
      "role": "user",
      "content": "Your question here"
    }
  ]
}

Response:
{
  "response": "AI response text",
  "usage": {
    "input_tokens": 123,
    "output_tokens": 456
  }
}
```

---

## 🔐 Authentication

### Features

- ✅ Google OAuth sign-in
- ✅ Session management with MongoDB
- ✅ Protected routes
- ✅ User profile management

### How It Works

1. Users sign in with Google
2. NextAuth creates/updates user in MongoDB
3. Session token stored in database
4. Protected routes check authentication status

### Protected Routes

Add authentication to any page:

```typescript
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/api/auth/signin')
  }
  
  return <div>Protected content</div>
}
```

---

## 💾 Database Schema

### Users Collection

```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  image: string,
  emailVerified: Date | null,
  createdAt: Date,
  updatedAt: Date
}
```

### Accounts Collection

```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  type: "oauth",
  provider: "google",
  providerAccountId: string,
  access_token: string,
  token_type: "Bearer",
  scope: string,
  id_token: string
}
```

### Sessions Collection

```typescript
{
  _id: ObjectId,
  sessionToken: string,
  userId: ObjectId,
  expires: Date
}
```

---

## 🛠️ Development

### Available Scripts

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Type check
pnpm type-check
```

### Adding New Features

1. **Create API route:** `app/api/your-feature/route.ts`
2. **Create component:** `components/your-feature.tsx`
3. **Add to navigation:** Update `components/header.tsx`
4. **Test thoroughly**

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Update `NEXTAUTH_URL` to your production URL
5. Update Google OAuth redirect URIs
6. Deploy!

### Environment Variables for Production

```env
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ANTHROPIC_API_KEY=your-anthropic-api-key
MONGODB_URI=your-mongodb-connection-string
```

### MongoDB Atlas Production Setup

1. Create production cluster (if not using free tier)
2. Update IP whitelist to include your deployment IPs
3. Use strong passwords
4. Enable backup and monitoring

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error:** `not authorized on admin to execute command`

**Solution:** 
- Don't use `admin` database
- Use your own database name: `adaldb`
- Check user has "Read and write to any database" permissions

### Authentication Not Working

**Check:**
- Google OAuth credentials are correct
- Redirect URIs match exactly
- `NEXTAUTH_URL` is correct
- `NEXTAUTH_SECRET` is set

### AI Assistant 404 Error

**Solution:**
- Verify file exists at: `app/api/claude/route.ts`
- Restart dev server: `rm -rf .next && pnpm dev`
- Check `ANTHROPIC_API_KEY` is set

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
pnpm install
pnpm build
```

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Anthropic** - Claude AI API
- **HuggingFace** - Inspiration for the platform
- **Vercel** - Next.js framework
- **MongoDB** - Database platform
- **shadcn/ui** - UI components

---

## 📧 Contact

- **GitHub:** [@ImadManni](https://github.com/ImadManni)
- **Project Link:** [https://github.com/ImadManni/Adal-AI-Community](https://github.com/ImadManni/Adal-AI-Community)

---

## 🔄 Recent Updates

### v1.0.0 (Latest)
- ✅ Added Claude AI Assistant integration
- ✅ Implemented MongoDB authentication
- ✅ Added Google OAuth sign-in
- ✅ Created user management system
- ✅ Built responsive UI with Tailwind CSS
- ✅ Added model and dataset exploration
- ✅ Implemented Spaces feature

---

**Built with ❤️ by Imad Manni**
