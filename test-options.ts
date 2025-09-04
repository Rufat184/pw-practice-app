import {test as base} from '@playwright/test'

export type TestOptions = {
    globalQAUrl: string
}

export const test = base.extend<TestOptions>({
    globalQAUrl: ['', {option: true}]
})
  