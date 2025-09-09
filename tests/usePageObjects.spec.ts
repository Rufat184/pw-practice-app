import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach(async ({ page }) => {
    await page.goto('/')

})

test('navigate to from page', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toasterPage()
    await pm.navigateTo().toolTipPage()
})

test('parametrized methods', async ({ page }) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`.toLowerCase()

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', "Option 2")
    await page.screenshot({ path: 'screenshots/parametrizedGridForm.png' })
    await page.locator('nb-card', { hasText: "Inline form" }).screenshot({ path: 'screenshots/parametrizedGridFormLocator.png' })
    await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckedBox(randomFullName, randomEmail, true)
    // await pm.navigateTo().datePickerPage()
    // await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10)
    // await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(1, 2)
})


