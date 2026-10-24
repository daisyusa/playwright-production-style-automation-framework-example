export default class CheckboxesPage {
    /**
    * @param {import ('@playwright/test').Page} page
    */
   
    constructor (page) {
        this.page = page;
        this.boxes = page.locator('input[type ="checkbox"]');
    }

    async open() { await this.page.goto('/checkboxes');}

    get first() {return this.boxes.nth(0); }
    get second() {return this.boxes.nth(1); }

   async checkFirst()    {await this.first.check(); }
   async uncheckFirst()  {await this.first.uncheck(); }
   async checkSecond()   {await this.second.check(); }
   async uncheckSecond() {await this.second.uncheck();}
}