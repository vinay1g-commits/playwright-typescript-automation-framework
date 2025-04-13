import {test,expect} from '@playwright/test';

test.describe("download check",()=>{
  test("downloading",async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/download");
    const [download]=await Promise.all([
      page.waitForEvent('download'),
      page.locator('text=students.json').click()
    ])
    //gets the default name of the file
    const filename=download.suggestedFilename();
    //saves the file in the current directory
    await download.saveAs(filename);
    //shows the file name
    console.log(`file dowloaded as: ${filename}`);
    //checks that the file is expected one
    expect(filename).toMatch(/students/);
  })
})