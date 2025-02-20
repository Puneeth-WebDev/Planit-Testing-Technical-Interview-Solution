import { BasePage } from '../utils/basePage';

export class CartPage extends BasePage {
  async selectOptions(
    size: string,
    color: string,
    quantity: string
  ): Promise<void> {
    await this.page.getByRole('option', { name: size }).click();
    await this.page.getByRole('option', { name: color }).click();

    const qtyInput = this.page.getByRole('spinbutton', { name: 'Qty' });
    await qtyInput.fill(quantity);
    await this.page.getByRole('button', { name: 'Add to Cart' }).click();
  }
}
