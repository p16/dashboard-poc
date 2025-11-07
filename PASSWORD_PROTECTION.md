# Password Protection Setup

## Overview

Analysis Dashboard now supports optional password protection. This feature allows you to secure access to the dashboard with a password while maintaining session-based authentication.

## Configuration

### Environment Variables

Add the following environment variable to your `.env.local` file to enable password protection:

```bash
# Password Protection (optional)
APP_PASSWORD=your_secure_password_here
```

### Behavior

- **No password set**: The app will work normally without any authentication
- **Password set**: Users must enter the correct password before accessing any content
- **Session-based**: Password is required only once per browser session
- **Security**: Password is validated server-side via API route

## Usage Examples

### Enable Password Protection

1. Edit your `.env.local` file:
```bash
APP_PASSWORD=MySecurePassword123
```

2. Restart the development server:
```bash
npm run dev
```

3. Access the app - you'll be prompted for the password

### Disable Password Protection

1. Remove or comment out the APP_PASSWORD in `.env.local`:
```bash
# APP_PASSWORD=MySecurePassword123
```

2. Restart the development server
3. Access the app - no password required

## Features

### Login Form
- Clean, branded interface matching the O2 design
- Password visibility toggle
- Error handling for incorrect passwords
- Loading states during authentication

### Session Management
- Authentication persists for the browser session
- Logout functionality available in the header (when password protection is enabled)
- Session expires when browser/tab is closed
- No persistent storage - password required after browser restart

### Security Features
- Server-side password validation
- No password storage in client-side code
- Session-based authentication only
- Secure API endpoint for password verification

## Development Testing

### Test Without Password Protection
1. Ensure `APP_PASSWORD` is not set or commented out in `.env.local`
2. Start the server: `npm run dev`
3. Navigate to `http://localhost:3000`
4. Dashboard should load immediately without login prompt
5. No logout button should appear in the header

### Test With Password Protection
1. Set `APP_PASSWORD=test123` in `.env.local`
2. Restart the server: `npm run dev`
3. Navigate to `http://localhost:3000`
4. Login form should appear
5. Enter incorrect password - should show error
6. Enter correct password (`test123`) - should access dashboard
7. Logout button should appear in header
8. Click logout - should return to login form
9. Close browser and reopen - should require password again

## Implementation Details

### Components
- `PasswordProtection.tsx`: Main authentication logic and login form
- `ClientHeaderWrapper.tsx`: Header with logout functionality
- `auth.ts`: Server-side utilities for password checking

### API Route
- `/api/auth/verify`: POST endpoint for password validation

### Environment Detection
The app automatically detects if password protection should be enabled by checking for the presence of the `APP_PASSWORD` environment variable.

## Security Considerations

- Use strong passwords in production
- Consider using environment-specific passwords
- The password is transmitted over HTTPS in production
- Session storage is cleared when the browser is closed
- No password caching or persistence beyond the session
