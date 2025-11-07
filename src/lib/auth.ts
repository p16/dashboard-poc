/**
 * Check if password protection is enabled by checking if APP_PASSWORD environment variable is set
 */
export function isPasswordProtectionEnabled(): boolean {
  return !!process.env.APP_PASSWORD && process.env.APP_PASSWORD.trim() !== '';
}

/**
 * Get the required password from environment variables
 */
export function getRequiredPassword(): string | undefined {
  return process.env.APP_PASSWORD;
}
