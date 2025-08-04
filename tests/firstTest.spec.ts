import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator Syntax rules', async({page}) => {
    //by Tag name
    await page.locator('input').first().click()

    //by id
    page.locator('#inputEmail1')

    //by class value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by Class value (full)
    page.locator('[input-full-width size-medium status-basic shape-rectangle nb-transition]')

    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]')

    //by xpath (not RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('user facing locators', async({page}) => {

    //by role
    await page.getByRole('textbox', {name: 'Email'}).first().click()
    await page.getByRole('button', {name: 'Sign In'}).first().click()
    
    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId('SignIn').click()

    await page.getByTitle('IoT Dashboard').click()
})

test('find child location', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    //or
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name: 'Sign In'}).first().click()

    //by index
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('find parent locator', async({page}) => {
    //aproach 1
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'}).click()
    //aproach 2
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'}).click()
    //aproach 3
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    //aproach 4
    await page.locator('nb-card').filter({has: page.locator(".status-danger")}).getByRole('textbox', {name: "Password"}).click()
    //get locator by filtering needed elements 
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText:"Sign in"}).getByRole('textbox', {name: "Email"}).click()

    //xpath, one level up
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})

test('Re Using locators', async({page}) =>{
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')

})

test('extracting values from objects', async({page}) => {
    //single text value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator ('button').textContent()
    expect (buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()

    expect(allRadioButtonLabels).toContain("Option 1")

    //get value of input field
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    //
    const placeHolderValue = await emailField.getAttribute('placeholder')
    expect (placeHolderValue).toEqual('Email')
})
