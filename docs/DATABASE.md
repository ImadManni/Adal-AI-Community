# MongoDB Database Collections

This document describes the MongoDB collections used in the Adal AI Community platform for user management, authentication, and sessions.

## Collections Overview

### 1. Users Collection (`users`)
**Purpose**: Stores user profiles and platform-specific data

**Schema**: `models/User.ts`

**Key Fields**:
- `name`: User's display name
- `email`: Unique email address
- `image`: Profile picture URL
- `provider`: Authentication provider (google, github, credentials)
- `providerId`: Provider-specific user ID
- `role`: User role (user, admin, moderator)
- `isActive`: Account status
- `bio`, `location`, `website`: Profile information
- `github`, `twitter`, `linkedin`: Social links
- `modelsCreated`, `datasetsShared`, `spacesBuilt`: Platform statistics
- `followers`, `following`: Social metrics
- `preferences`: User settings (theme, notifications, etc.)

**Indexes**:
- `email` (unique)
- `provider + providerId` (compound)
- `createdAt` (descending)

### 2. Accounts Collection (`accounts`)
**Purpose**: Stores OAuth provider connections for NextAuth

**Schema**: `models/Account.ts`

**Key Fields**:
- `userId`: Reference to user document
- `type`: Account type (oauth)
- `provider`: OAuth provider (google, github)
- `providerAccountId`: Provider-specific account ID
- `refresh_token`: OAuth refresh token
- `access_token`: OAuth access token
- `expires_at`: Token expiration timestamp
- `token_type`: Token type (Bearer)
- `scope`: OAuth scopes granted
- `id_token`: OpenID Connect ID token
- `session_state`: OAuth session state

**Indexes**:
- `userId`
- `provider + providerAccountId` (compound, unique)

### 3. Sessions Collection (`sessions`)
**Purpose**: Stores active user sessions for NextAuth

**Schema**: `models/Session.ts`

**Key Fields**:
- `sessionToken`: Unique session identifier
- `userId`: Reference to user document
- `expires`: Session expiration date

**Indexes**:
- `sessionToken` (unique)
- `userId`
- `expires`

## Database Setup

### Prerequisites
1. MongoDB instance running (local or cloud)
2. Environment variable `MONGODB_URI` configured
3. Dependencies installed: `mongoose`, `next-auth`

### Initialize Database
Run the initialization script to set up collections and indexes:

```bash
# Using ts-node
npx ts-node scripts/init-db.ts

# Or compile and run
npm run build
node dist/scripts/init-db.js
```

### Database Utilities
Use the utility script for database management:

```bash
# Show database statistics
npx ts-node scripts/db-utils.ts stats

# List all collections
npx ts-node scripts/db-utils.ts collections

# Create sample data for testing
npx ts-node scripts/db-utils.ts sample

# Clean up sample data
npx ts-node scripts/db-utils.ts clean
```

## Authentication Flow

### Google OAuth Flow
1. User clicks "Sign in with Google"
2. NextAuth redirects to Google OAuth
3. Google returns authorization code
4. NextAuth exchanges code for tokens
5. Custom adapter creates/updates:
   - User document in `users` collection
   - Account document in `accounts` collection
   - Session document in `sessions` collection

### Session Management
- Sessions use JWT strategy for performance
- Database sessions stored for user tracking
- Automatic cleanup of expired sessions
- Session tokens are cryptographically secure

## Data Relationships

```
User (1) ←→ (many) Account
User (1) ←→ (many) Session

User._id = Account.userId
User._id = Session.userId
```

## Security Considerations

### Data Protection
- Sensitive tokens encrypted at rest
- No plaintext passwords stored
- OAuth tokens have expiration times
- Session tokens are cryptographically random

### Indexes for Performance
- All foreign key relationships indexed
- Unique constraints on email and session tokens
- Compound indexes for common query patterns

### Data Validation
- Email format validation
- Required field enforcement
- Enum validation for roles and providers
- String length limits for text fields

## Environment Variables

Required environment variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/adal-community

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

## Monitoring and Maintenance

### Regular Tasks
- Monitor session cleanup (automatic)
- Review user growth metrics
- Check OAuth token refresh rates
- Monitor database performance

### Backup Strategy
- Regular MongoDB backups
- Test restore procedures
- Document recovery processes
- Monitor backup integrity

## Troubleshooting

### Common Issues

**Connection Errors**:
- Verify `MONGODB_URI` is correct
- Check MongoDB service is running
- Verify network connectivity

**Authentication Failures**:
- Check OAuth provider credentials
- Verify callback URLs configured
- Review NextAuth configuration

**Performance Issues**:
- Check index usage with `explain()`
- Monitor query performance
- Consider connection pooling

### Debug Commands

```bash
# Check database connection
npx ts-node -e "import connectDB from './lib/mongodb'; connectDB().then(() => console.log('Connected')).catch(console.error)"

# Verify indexes
npx ts-node scripts/db-utils.ts collections

# Check sample data
npx ts-node scripts/db-utils.ts stats
```

## Development vs Production

### Development
- Use local MongoDB instance
- Enable debug logging
- Use sample data for testing
- Relaxed security settings

### Production
- Use MongoDB Atlas or managed service
- Enable connection pooling
- Implement proper backup strategy
- Enable security features (SSL, auth)
- Monitor performance metrics

---

For more information, see:
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Best Practices](https://docs.mongodb.com/manual/administration/production-notes/)