import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { testData } from '../utils/testData';

test.describe('Magento E-commerce Tests', () => {
  
  test('Search and Validate Product List Count', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigator(testData.baseURL);
    await homePage.navigateToCategory(
      testData.category,
      testData.subcategory,
      testData.item
    );
    await homePage.searchForProduct(testData.searchKeyword);

    // Validate product list count
    const productList = page.locator('.product-item');
    await expect(productList).toHaveCount(5);
  });

  test('Add Product to Cart and Verify Toast Message', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.navigator(testData.baseURL);
    await homePage.searchForProduct(testData.searchKeyword);
    await homePage.selectProduct(testData.productName);
    
    await page.waitForLoadState('domcontentloaded');
    await cartPage.selectOptions(testData.size, testData.color, testData.quantity);

    // Validate success message
    const toastMessage = page.getByText(testData.successMessage);
    await expect(toastMessage).toBeVisible();
  });

});
