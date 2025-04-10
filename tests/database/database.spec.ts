import { test, expect } from '@playwright/test';
import { query } from '../../utils/db';

test.describe('Database Testing', () => {
  test('Verify users exist in database', async () => {
    const users: any = await query('SELECT * FROM users');

    expect(users.length).toBeGreaterThanOrEqual(2);

    const usernames = users.map((user: any) => user.username);
    expect(usernames).toContain('testuser1');
    expect(usernames).toContain('testuser2');
  });
});
