import { test, expect } from '@playwright/test';
import { SportsPage } from '../../src/pages/SportsPage';
import { SPORTS_DATA } from '../../ constants/sports-data';
import { TestHelpers } from '../../utils/test-helpers';

test.describe('Sports Navigation', () => {
    let sportsPage: SportsPage;

    test.beforeEach(async ({ page }) => {
        sportsPage = new SportsPage(page);
        await sportsPage.goto();
    });

    test('should display main sport categories', async ({ page }) => {
        for (const category of SPORTS_DATA.CATEGORIES) {
            const isVisible = await TestHelpers.retry(
                () => sportsPage.checkSportVisible(category)
            );
            expect(isVisible, `Sport ${category} should be visible`).toBe(true);
        }
    });

    for (const sport of SPORTS_DATA.CATEGORIES) {
        test(`should navigate to ${sport} section`, async () => {
            await TestHelpers.retry(async () => {
                await sportsPage.navigateToSport(sport);
                const url = await sportsPage.getCurrentUrl();
                expect(url).toContain(SPORTS_DATA.URL_PATHS[sport]);
            });
        });
    }
});