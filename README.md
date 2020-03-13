# maxminesnodejsapi
[MaxMines API](http://maxmines.com/documentation/http-api) NodeJS
## Cách dùng
```
const MaxMinesAPI = require('./app');

//Khởi tạo class bằng secret key của bạn
let maxminesapi = new MaxMinesAPI('YOUR_SECRET_KEY');

//token/verify
maxminesapi.verify("TOKEN_NEED_TO_VERIFY", "HASHES", res => {
    console.log(res);
})

//user/balance
maxminesapi.balance("USERNAME", res => {
    console.log(res);
})

//user/withdraw
maxminesapi.withdraw("USERNAME", "HASHES", res => {
    console.log(res);
})

//user/top
maxminesapi.top("NUMBER_OF_RECORDS", null, res => {
    console.log(res);
})

//user/list
maxminesapi.list("NUMBER_OF_RECORDS", "PAGE_NUMBER", res => {
    console.log(res);
})

//user/reset
maxminesapi.reset("USERNAME", res => {
    console.log(res);
})

//user/reset-all
maxminesapi.resetAll(res => {
    console.log(res);
})

//link/create
maxminesapi.create("URL_TO_SHORT", "HASHES", res => {
    console.log(res);
})

//stats/payout
maxminesapi.payout(res => {
    console.log(res);
})

//stats/site
maxminesapi.site(res => {
    console.log(res);
})

//stats/history
maxminesapi.history("BEGIN_TIME", "END_TIME", res => {
    console.log(res);
})
```
