import {expect, test} from '@playwright/test'
import { timeout } from 'rxjs-compat/operator/timeout'

test.beforeEach(async({page}, testInfo) => {
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})
test ('await method', async({page}) =>{
    const successBtn = page.locator('.bg-success')

    //await successBtn.click()

    //const text = await  successBtn.textContent()
    // await successBtn.waitFor({state: 'attached'})
    // const text = await successBtn.allTextContents()

    // expect(text).toEqual('Data loaded with AJAX get request.')

    await expect(successBtn).toHaveText('Data loaded with AJAX get request.', {timeout:20000})
})

test ('alternative await methods', async({page}) =>{
    const successBtn = page.locator('.bg-success')
    //Wait for element
    //await page.waitForSelector('.bg-success')

    //Wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //Wait for network calls to be completed {not recommended}
    await page.waitForLoadState('networkidle')

    //Wait 
    await page.waitForTimeout(5000)

    await page.waitForURL('spirit.com')

    const text = await  successBtn.textContent()
    expect(text).toContain('Data loaded with AJAX get request.')

})

test ('timeouts', async({page}) =>{
    const successBtn = page.locator('.bg-success')
    await successBtn.click()



})