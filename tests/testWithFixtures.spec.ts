import { test } from '../test-options'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

test('parametrized methods', async ({ pageManager }) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`.toLowerCase()

    await pageManager.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', "Option 2")
    await pageManager.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckedBox(randomFullName, randomEmail, true)

})


