export const IntegrationTests = `import unmock, { Service } from 'unmock';

describe("Integration tests with Unmock", () => {
  // Intercept all HTTP traffic
  beforeAll(() => unmock.on());

  test("should be awesome for mocking a service ", async () => {
    const userEmail = await fetchGitHubUserEmail("meeshkan");
    expect(typeof userEmail).toBe("string");
  });

  test("should be awesome for modifying fake data", async () => {
    const github: Service = unmock.services.github;
    const testUser = "meeshkan";
    github.state(\`/users/\${testUser}\`, { email: "dev@meeshkan.com" });
    const userEmail = await fetchGitHubUserEmail(testUser);
    expect(userEmail).toEqual("dev@meeshkan.com");
  });

  test("should be awesome for expressive asserts", async () => {
    const github: Service = unmock.services.github;
    await codeThatShouldCallGitHubAPI();
    expect(github).beCalledOnce(); // PROFIT!
  });
});
`;
