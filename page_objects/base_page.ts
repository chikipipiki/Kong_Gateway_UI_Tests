import { Page } from "@playwright/test";
import { Bag } from "../fixtures/setupers";

export class BasePage {
    readonly page: Page;
    readonly bag: Bag;

    private _path: string = "";
    private _workspace_name: string = "default";

    public get path(): string {
        return this._path;
    }
    public set path(value: string) {
        this._path = value;
    }

    public get workspace_name(): string {
        return this._workspace_name;
    }
    public set workspace_name(value: string) {
        this._path = value;
    }

    constructor(bag: Bag, page: Page) {
        this.bag = bag;
        this.page = page;
    }

    async goto() {
        await this.page.goto(`${this.bag.ui_url}${this.path}`);
    }
}
