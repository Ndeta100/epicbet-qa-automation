import { Page } from '@playwright/test';

export class TestHelpers {
    /**
     * Retry a function multiple times before failing
     */
    static async retry<T>(
        fn: () => Promise<T>,
        retries = 3,
        delay = 1000
    ): Promise<T> {
        let lastError: Error;

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error as Error;
                if (attempt === retries) break;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }

        // @ts-ignore
        throw lastError;
    }

    /**
     * Take a screenshot with a timestamp
     */
    static async takeScreenshot(page: Page, name: string): Promise<string> {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const path = `screenshots/${name}-${timestamp}.png`;
        await page.screenshot({ path });
        return path;
    }
}
