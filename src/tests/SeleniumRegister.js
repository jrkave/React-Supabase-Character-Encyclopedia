import { Builder, By, Key, until } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox.js';

async function testRegister() {
    let options = new firefox.Options();

    let driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .build();

    try {
        // Navigate to the registration page
        await driver.get('http://localhost:5173/register'); 

        // Fill in the email
        const emailInput = await driver.findElement(By.css('input[type="email"]'));
        await emailInput.sendKeys('test@example.com');

        // Fill in the password
        const passwordInput = await driver.findElement(By.css('input[type="password"]'));
        await passwordInput.sendKeys('password123');

        // Fill in the confirm password
        const confirmPasswordInput = await driver.findElement(By.css('[id="confirm-password-ctrl"]'));
        await confirmPasswordInput.sendKeys('password123');

        // Fill in the display name
        const displayNameInput = await driver.findElement(By.css('input[type="text"]'));
        await displayNameInput.sendKeys('TestUser');

        // Submit the form by clicking the register button
        const registerButton = await driver.findElement(By.id('register-btn'));
        await registerButton.click();

    } catch (error) {
        console.error('An error occurred during registration test:', error);
    } finally {
        // Close the browser after test
        await driver.quit();
    }
}

testRegister();