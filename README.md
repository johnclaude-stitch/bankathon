To run the login flow, run:
1. In modules/login.module.ts, replace the following values with account credentials.
```
 // Input values
  let accountNumber = "123456";
  let pin = "1234";
  let userNumber = "1";
  let userPassword = "1234567";
```
2. Then run `npm run debug` - This will open the browser and execute the actions
3. You can run a specific test using `.only` on the test e.g `describe.only`