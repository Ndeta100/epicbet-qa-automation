import { Page, Locator } from '@playwright/test';

export type SportCategory =
    | 'football'
    | 'basketball'
    | 'iceHockey'
    | 'tennis'
    | 'americanFootball'
    | 'boxing'
    | 'handball'
    | 'esports';


/**
 * Page object representing the sports navigation page
 * @class SportsPage
 */
export class SportsPage {
    readonly page: Page;
    readonly sportCategories: {
        football: Locator;
        basketball: Locator;
        iceHockey: Locator;
        tennis: Locator;
        americanFootball: Locator;
        boxing: Locator;
        handball: Locator;
        esports:Locator;

    };
    readonly allSportsButton: Locator;
    private readonly modal: Locator;

    /**
     * Creates an instance of SportsPage
     * @param {Page} page - The Playwright page object
     */
    constructor(page: Page) {
        this.page = page;
        this.allSportsButton = page.locator('[data-testid="category-all-sports-tab-button"]');
        this.modal = page.locator('#modal');
        this.sportCategories = {
            football: page.locator('[data-testid="category-button"][data-testkey="1"]').first(),
            basketball: page.locator('[data-testid="category-button"][data-testkey="6"]').first(),
            iceHockey: page.locator('[data-testid="category-button"][data-testkey="7"]').first(),
            tennis: page.locator('[data-testid="category-button"][data-testkey="9"]').first(),
            americanFootball: page.locator('[data-testid="category-button"][data-testkey="18"]').first(),
            esports: page.locator('[data-testid="category-button"][data-testkey="32"]').first(),
            boxing: page.locator('[data-testid="category-button"][data-testkey="21"]').first(),
            handball: page.locator('[data-testid="category-button"][data-testkey="5"]').first(),
        };
    }

    /**
     * Navigates to the sports page
     * @returns {Promise<void>}
     */
    async goto(): Promise<void> {
        await this.page.goto('https://epicbet.com/en/sports/');
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Checks if a sport category is visible either directly or in the menu
     * @param {string} sport - The sport category to check
     * @returns {Promise<boolean>} True if the sport is visible, false otherwise
     */
    async checkSportVisible(sport: SportCategory): Promise<boolean> {
        try {
            await this.sportCategories[sport].waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            // Try opening All sports menu
            await this.allSportsButton.click();
            await this.page.waitForTimeout(1000); // Wait for menu animation

            try {
                await this.sportCategories[sport].waitFor({ state: 'visible', timeout: 5000 });
                return true;
            } catch {
                return false;
            }
        }
    }

    /**
     * Checks and handles any modal that might be present
     * @private
     */
    private async handleModal(): Promise<void> {
        try {
            const modalVisible = await this.modal.isVisible();
            if (modalVisible) {
                // Look for close button or overlay to click
                await this.page.click('div#modal div[class*="close"]', { timeout: 5000 });
                // Wait for modal to disappear
                await this.modal.waitFor({ state: 'hidden', timeout: 5000 });
            }
        } catch (error) {
            console.log('No modal present or unable to close modal:', error);
        }
    }

    /**
     * Navigates to a specific sport section
     * @param {string} sport - The sport to navigate to
     * @throws {Error} When sport is not found or navigation fails
     * @returns {Promise<void>}
     */
    async navigateToSport(sport:SportCategory): Promise<void> {
        try {
            // Handle any modal before attempting navigation
            await this.handleModal();
            const isVisible = await this.checkSportVisible(sport);
            if (!isVisible) {
                throw new Error(`Sport ${sport} not found`);
            }

            await this.sportCategories[sport].click();

            // Wait for navigation with correct URL mapping
            const urlMap: { [key: string]: string } = {
                americanFootball: 'american-football',
                iceHockey: 'ice-hockey',
                esports: 'esports/counter-strike-2',
            };

            const sportPath = urlMap[sport] || sport;
            // Add state: 'domcontentloaded' to handle slow loading pages better
            await this.page.waitForURL(`**/sports/${sportPath}**`, {
                timeout: 30000,
                waitUntil: 'domcontentloaded'
            });

        } catch (error) {
            console.error(`Failed to navigate to ${sport}:`, error);
            throw error;
        }
    }

    /**
     * Gets the current page URL
     * @returns {Promise<string>} The current URL
     */
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
}