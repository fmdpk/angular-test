import { ComponentHarness } from '@angular/cdk/testing';

export class MyButtonHarness extends ComponentHarness {
  static hostSelector = 'app-my-button';

  async click() {
    const button = await this.locatorFor('button')();
    await button.click();
  }

  async getText() {
    const button = await this.locatorFor('button')();
    return button.text();
  }
}
