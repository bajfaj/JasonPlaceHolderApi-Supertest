import { BeforeAll, Before, After } from "@cucumber/cucumber";
import '../support/env'

BeforeAll(function() {
    console.log(`Running tests against ENV: ${process.env.ENV}`);
})

// Clear shared response so scenarios don't leak data
Before(function () {
  this.response = null;
});

After(async function ({result}) {
    if(result?.status === 'FAILED') {
        console.log(`Failed response body: ${JSON.stringify(this.response?.body)}`);
    }
})