
//Driver
const wdio = require("webdriverio")
const assert = require("assert");


const opts = {
		path: '/wd/hub',
		port: 4723,
		capabilities: {
			platformName: "Android",
			platformVersion: "11",
			deviceName: "Pixel_5_API_30",
			app: "/Users/tasneem13/eclipse-workspace/faheemApp/qa-assignment/application.apk",
			automationName: "UiAutomator2"


		}
};

async function main() {
	const client = await wdio.remote(opts);
	// Write your test code here

	client.setImplicitTimeout(5000)

	//******************check logo is visible ******************
	const Logo=await client.$("android.widget.ImageView");
	let isDisplayed = await Logo.isDisplayed();
	assert.strictEqual(isDisplayed,true);
	console.log("logo is visible"+isDisplayed)
	
	//****************** check browseAsVisitor link is enabled and  the text value ******************
	const BrowseAsVisitor = await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.TextView");
	const BrowseAsVisitorValue = await BrowseAsVisitor.getText();
	assert.strictEqual(BrowseAsVisitorValue,"تصفح كزائر");
	let isEnabled = await BrowseAsVisitor.getAttribute("enabled");
	assert.strictEqual(isEnabled,'true');

	//******************click on "تصفح كزائر"******************
	BrowseAsVisitor.click();

	//******************check the pop-up is displayed******************
	const page = await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup');
	let isDisplayedPage = await page.isDisplayed();
	assert.strictEqual(isDisplayedPage,true);

	//******************check the title of the pop-up******************
	const title = await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView');
	const dropdownTitle=await title.getText();
	assert.strictEqual(dropdownTitle,"مرحلتك الدراسية");
	let titleIsDisplayed = await title.isDisplayed();

	


}


main();

