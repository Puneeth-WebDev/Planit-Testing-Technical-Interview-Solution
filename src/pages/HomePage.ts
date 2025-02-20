import { BasePage } from '../utils/basePage';

export class HomePage extends BasePage {
  async navigateToCategory(
    category: string,
    subcategory: string,
    item: string
  ): Promise<void> {
    const categoryMenu = this.page.getByRole('menuitem', { name: category });
    const subcategoryMenu = this.page.getByRole('menuitem', {
      name: subcategory,
    });
    const itemMenu = this.page.getByRole('menuitem', { name: item });
    await categoryMenu.hover();
    await this.page.waitForSelector(`text=${subcategory}`, {
      state: 'visible',
    });
    await subcategoryMenu.hover();
    await this.page.waitForSelector(`text=${item}`, { state: 'visible' });
    await itemMenu.click();
  }

  async searchForProduct(productName: string): Promise<void> {
    const searchBox = this.page.getByRole('combobox', { name: 'Search' });
    await searchBox.fill(productName);
    await this.page.keyboard.press('Enter');
  }

  async selectProduct(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName }).first().click();
  }
}
