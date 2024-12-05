import axios from 'axios';

interface ScanOptions {
 owner: string;
 repo: string;
}

interface ScanResult {
 vulnerabilities: any[];
 summary: {
   total: number;
   critical: number;
   high: number;
   medium: number;
   low: number;
 };
}

class GithubSnykServer {
 private githubToken: string;
 private snykToken: string;

 constructor() {
   this.githubToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN || '';
   this.snykToken = process.env.SNYK_API_KEY || '';
 }

 async scanRepository(options: ScanOptions): Promise<ScanResult> {
   if (!this.githubToken || !this.snykToken) {
     throw new Error('Missing required tokens');
   }

<<<<<<< Updated upstream
   try {
     // Get repo details from GitHub
     const repoResponse = await axios.get(
       `https://api.github.com/repos/${options.owner}/${options.repo}`,
       {
         headers: {
           Authorization: `token ${this.githubToken}`,
           Accept: 'application/vnd.github.v3+json',
         },
       }
     );

     // Scan with Snyk
     const snykResponse = await axios.post(
       'https://snyk.io/api/v1/test',
       {
         target: {
           remoteUrl: repoResponse.data.html_url,
         },
       },
       {
         headers: {
           Authorization: `token ${this.snykToken}`,
           'Content-Type': 'application/json',
         },
       }
     );

     const vulns = snykResponse.data.issues?.vulnerabilities || [];
     return {
       vulnerabilities: vulns,
       summary: {
         total: vulns.length,
         critical: vulns.filter((v: any) => v.severity === 'critical').length,
         high: vulns.filter((v: any) => v.severity === 'high').length,
         medium: vulns.filter((v: any) => v.severity === 'medium').length,
         low: vulns.filter((v: any) => v.severity === 'low').length,
       },
     };
   } catch (error: any) {
     throw new Error(`Scan failed: ${error.message}`);
   }
 }
=======
    try {
      // Get repo details from GitHub
      const repoResponse = await axios.get(
          `https://api.github.com/repos/${options.owner}/${options.repo}`,
          {
            headers: {
              Authorization: `token ${this.githubToken}`,
              Accept: 'application/vnd.github.v3+json',
            },
          }
      );

      // Scan with Snyk
      const snykResponse = await axios.post(
          'https://snyk.io/api/v1/test',
          {
            target: {
              remoteUrl: repoResponse.data.html_url,
            },
          },
          {
            headers: {
              Authorization: `token ${this.snykToken}`,
              'Content-Type': 'application/json',
            },
          }
      );

      const vulns = snykResponse.data.issues?.vulnerabilities || [];
      return {
        vulnerabilities: vulns,
        summary: {
          total: vulns.length,
          critical: vulns.filter((v: any) => v.severity === 'critical').length,
          high: vulns.filter((v: any) => v.severity === 'high').length,
          medium: vulns.filter((v: any) => v.severity === 'medium').length,
          low: vulns.filter((v: any) => v.severity === 'low').length,
        },
      };
    } catch (error: any) {
      throw new Error(`Scan failed: ${error.message}`);
    }
  }
>>>>>>> Stashed changes

 async handleCommand(command: string): Promise<any> {
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

<<<<<<< Updated upstream
 if (command) {
   server.handleCommand(command)
     .then(result => console.log(JSON.stringify(result, null, 2)))
     .catch(error => {
       console.error('Error:', error.message);
       process.exit(1);
     });
 }
=======
  if (command) {
    server.handleCommand(command)
        .then(result => console.log(JSON.stringify(result, null, 2)))
        .catch(error => {
          console.error('Error:', error.message);
          process.exit(1);
        });
  }
>>>>>>> Stashed changes
}

export default GithubSnykServer;
