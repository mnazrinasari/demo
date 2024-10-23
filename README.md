how to run the test?
Mocha
===================================================================
-mocha runner

npx playwright test

specific test eg, npx playwright test
specific test file eg, npx playwright test tests/demo.spec.js

Cucumber
====================================================================
-cucumber runner
npx cucumber-js 

specific feature eg, npx cucumber-js features/EC_login.feature

specific scenario with tags eg, --tags "@xxx"

run with report  eg, npx cucumber-js --format html:report.html
