"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class GithubSnykServer {
    constructor() {
        this.githubToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN || '';
        this.snykToken = process.env.SNYK_API_KEY || '';
    }
    async scanRepository(options) {
        var _a;
        if (!this.githubToken || !this.snykToken) {
            throw new Error('Missing required tokens');
        }
        try {
            // Get repo details from GitHub
            const repoResponse = await axios_1.default.get(`https://api.github.com/repos/${options.owner}/${options.repo}`, {
                headers: {
                    Authorization: `token ${this.githubToken}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            });
            // Scan with Snyk
            const snykResponse = await axios_1.default.post('https://snyk.io/api/v1/test', {
                target: {
                    remoteUrl: repoResponse.data.html_url,
                },
            }, {
                headers: {
                    Authorization: `token ${this.snykToken}`,
                    'Content-Type': 'application/json',
                },
            });
            const vulns = ((_a = snykResponse.data.issues) === null || _a === void 0 ? void 0 : _a.vulnerabilities) || [];
            return {
                vulnerabilities: vulns,
                summary: {
                    total: vulns.length,
                    critical: vulns.filter((v) => v.severity === 'critical').length,
                    high: vulns.filter((v) => v.severity === 'high').length,
                    medium: vulns.filter((v) => v.severity === 'medium').length,
                    low: vulns.filter((v) => v.severity === 'low').length,
                },
            };
        }
        catch (error) {
            throw new Error(`Scan failed: ${error.message}`);
        }
    }
    async handleCommand(command) {
        const match = command.match(/(?:scan|analyze|check)\s+([^/\s]+)\/([^/\s]+)/i);
        if (!match) {
            throw new Error('Invalid command format. Use: scan owner/repo');
        }
        const [, owner, repo] = match;
        return this.scanRepository({ owner, repo });
    }
}
if (require.main === module) {
    const server = new GithubSnykServer();
    const command = process.argv.slice(2).join(' ');
    if (command) {
        server.handleCommand(command)
            .then(result => console.log(JSON.stringify(result, null, 2)))
            .catch(error => {
            console.error('Error:', error.message);
            process.exit(1);
        });
    }
}
exports.default = GithubSnykServer;
