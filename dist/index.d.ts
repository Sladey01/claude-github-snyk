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
declare class GithubSnykServer {
    private githubToken;
    private snykToken;
    constructor();
    scanRepository(options: ScanOptions): Promise<ScanResult>;
    handleCommand(command: string): Promise<any>;
}
export default GithubSnykServer;
