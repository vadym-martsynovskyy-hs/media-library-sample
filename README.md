# Running the App
`npm install`
`npm start`
Put your API key in ```app.js``` under CLIENT_ID on ~line 11
Navigate to `localhost:8080/v1/media` or `localhost:8080/v1/status`

# Testing your Media Library App with Runscope

Before you can release a Media Library app for use with the Hootsuite platform, your app must pass a set of tests verifying
that it satisfies our API requirements. You can run these tests yourself using Runscope and the `MediaLibraryAppVerificationTest.json`
file included in this repo.

Read below for instructions on setting up a Runscope account. If you already have a Runscope account, skip ahead to the
section [Customizing the Tests](#customizing-the-tests).

## Setting up Runscope

In order to use Runscope to run these API tests, you will need a Runscope account. If you don't already have one, sign up
for an account [here](https://www.runscope.com). After you have an account, follow the steps below to add the tests to your
account.

1. Download `MediaLibraryAppVerificationTest.json` from this repo.
2. Login to Runscope and select the `Tests` tab in the top-left.
3. Click `Import Test` in the bottom left.
4. You will be taking to a page titled `Import Tests into Cheerful String`. On this page, select `Runscope API Tests`. Then,
add the `MediaLibraryAppVerificationTest.json` file that you downloaded previously.
5. Click `Import Tests`, and then go back to the `Tests` tab. You should see a new box labeled `Media Library App Verification
Test`.

Next, you will have to customize the test to work with your app.

## Customizing the Tests

After you've imported the test suite into Runscope, you will need to change the settings to work with your app. Here are instructions
for doing that:

1. Select the `Tests` tab in the upper-left, then hover over the `Media Library App Verification Test` that you just imported.
Click the `Edit` button that will appear in the lower-left corner of the box.
2. Under the `Environment` header, click the arrow next to `Test Settings` to expand it. The `Initial Variables` tab should
already be selected.
3. Click `Add Initial Variable`. We will be adding two variables to the tests.
4. The first variable is named `baseURL` (case-sensitive). For the value, enter the URL that your app has exposed for API calls.
(If you are only running your app locally at this point in development, we recommend using the excellent program [ngrok](https://ngrok.com/)
to get a URL that is accessible over the Internet.)
5. The second variable is named `supportedMediaTypes`. For the value, copy and paste in this array: `['image', 'gif', 'video', folder']`.
Then, delete the variables that your app does not support from that array. For example, if your app only searches for images
and gifs, you would delete `'video'` and `'folder'` from the array, so that the value reads `['image', 'gif']`. This step
will prevent the test suite from running tests on functionality that you don't support.
6. At this point, the tests are fully configured. Click `Save & Run` near the top of the page in order to run the tests
against your app!