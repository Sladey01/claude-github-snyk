# Claude GitHub-Snyk Server

A custom server implementation for Claude that combines GitHub repository access with Snyk security scanning.

## Setup

Update your Claude desktop config (`claude-config.json`):

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "github:Sladey01/claude-github-snyk"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_github_token",
        "SNYK_API_KEY": "your_snyk_token"
      }
    }
  }
}
```

Replace the tokens with your actual GitHub and Snyk API tokens.

## Usage

In Claude, you can now use commands like:

```
Scan repository owner/repo for security vulnerabilities
```

or

```
Analyze security of owner/repo
```