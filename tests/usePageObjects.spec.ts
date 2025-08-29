import {test, expect} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datePickerPage'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200')
    
})

test ('navigate to from page', async({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toasterPage()
    await navigateTo.toolTipPage()
})

test ('parametrized methods', async ({page}) =>{
    const navigateTo = new NavigationPage (page)
    const onFormLayoutsPage = new FormLayoutsPage(page)
    const onDatePickerPage = new DatePickerPage (page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', "Option 2")
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckedBox('John Smith', 'johntest@test.com', true)
    await navigateTo.datePickerPage()
    await onDatePickerPage.selectCommonDatePickerDateFromToday(10)
    await onDatePickerPage.selectDatePickerWithRangeFromToday(1, 2)
})


