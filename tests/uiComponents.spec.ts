import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// test.afterEach(async({page}) =>{
//     await page.close()
// })

test.describe('Form Layouts page', () =>{
    test.beforeEach(async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    })

    test('input fields', async({page})=>{
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500})

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

    test('radio buttons', async({page})=>{
        const usingTheGridRadioButton = page.locator('nb-card', {hasText: 'Using the Grid'})
        //await usingTheGridRadioButton.getByLabel('Option 1').check({force: true})
        await usingTheGridRadioButton.getByRole('radio', {name: 'Option 2'}).check({force: true})

        const radioStatus = await usingTheGridRadioButton.getByRole('radio', {name: 'Option 2'}).isChecked()
        expect(radioStatus).toBeTruthy()

        await expect(usingTheGridRadioButton.getByRole('radio', {name: 'Option 2'})).toBeChecked()
        const usingTheSubmitButton = page.locator('nb-card', {hasText: 'Basic form'})
        await usingTheSubmitButton.getByRole('button', {name: 'Submit'}).click()
    })


})