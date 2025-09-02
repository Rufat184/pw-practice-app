import { Page } from "@playwright/test"
import { time } from "console"

export class HelperBase {

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async waitForNUmberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout (timeInSeconds * 1000)
    }
}