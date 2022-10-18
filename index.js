const bodyParser = require("body-parser");
var express = require("express");
const axios = require("axios");
const path = require('path');

var app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
app.get("/", function(req, res) {
  res.send('home page')
})

app.post("/payment-success", function(req, res) {
  let obj_ = req.params
  if (req.body !== "" || req.body !== undefined) {
    // console.log(req.body);
    // console.log(req.body.command);
       let  data = {
            "service_command": req.body.command,
            "merchant_reference": '6311E2A4-C343-ED11-9526-D540254B5C86',
            "fort_id":"",
            "status": req.body.status,
            "payment_option": req.body.payment_option,
            "amount": req.body.amount,
            "response_code": req.body.response_code,
            "card_number": req.body.card_number,
            "signature": req.body.signature,
            "merchant_identifier": req.body.merchant_identifier,
            "access_code": req.body.access_code,
            "expiry_date": req.body.expiry_date,
            "customer_ip": req.body.customer_ip,
            "language": req.body.language,
            "eci": req.body.eci,
            "command": req.body.command,//16
            "response_message": req.body.response_code,//17
            "authorization_code": req.body.authorization_code,//18
            "customer_email": req.body.customer_email,//19
            "token_name": req.body.token_name,//20
            "currency": req.body.currency,//21
            "card_bin": "123",//22
            "card_holder_name": req.body.card_holder_name,//23
            "remember_me": "",//24
            "return_url": "http://localhost:3000/",//25
            "customer_name": "Rayi test",//26
            "settlement_reference": "",//27
            "phone_number": "9750593005"//28
    }

    axios({
      method: "post",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjM2NTY1NTUsImlzcyI6Imh0dHA6Ly9KdXNzdXIuY29tIiwiYXVkIjoiaHR0cDovL0p1c3N1ci5jb20ifQ.eR9bgd088VDfTEPsDTbmcCipsMrLDV1F-IJ9uRYH7aI",
      },
      url:
        "https://crm.jussuremdad.com/DEVMobAppAPI/api/payment/CompletePayment",
      data: data,
      // {
      //         "service_command": req.body.command,
      //         "merchant_reference": req.body.merchant_reference,
      //         "fort_id": req.body.fort_id,
      //         "status": req.body.status,
      //         "payment_option": req.body.payment_option,
      //         "amount": req.body.amount,
      //         "response_code": req.body.response_code,
      //         "card_number": req.body.card_number,
      //         "signature": req.body.signature,
      //         "merchant_identifier": req.body.merchant_identifier,
      //         "access_code": req.body.access_code,
      //         "expiry_date": req.body.expiry_date,
      //         "customer_ip": req.body.customer_ip,
      //         "language": req.body.language,
      //         "eci": req.body.eci,
      //         "command": req.body.command,//16
      //         "response_message": req.body.response_code,//17
      //         "authorization_code": req.body.authorization_code,//18
      //         "customer_email": req.body.customer_email,//19
      //         "token_name": req.body.token_name,//20
      //         "currency": req.body.currency,//21
      //         "card_bin": "123",//22
      //         "card_holder_name": req.body.card_holder_name,//23
      //         "remember_me": "",//24
      //         "return_url": "http://localhost:3000/",//25
      //         "customer_name": "Rayi test",//26
      //         "settlement_reference": "",//27
      //         "phone_number": "9750593005"//28
      // }
    }).then(function(response) {
      if (response.status === 200) {
        console.log(response.data);
        res.sendFile('./index.html', {root: __dirname })
      }
    });
  }
});

app.post("/view-summary", function(req, res) {
    console.log('sms send function')
    let data = {
        "SMSID": "",
        "Message": "hello",
        "Mobile": "918807401368"
      }
    //   try {
    //     axios({
    //         method: "post",
    //         headers: {
    //           Authorization:
    //             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjM2NTY1NTUsImlzcyI6Imh0dHA6Ly9KdXNzdXIuY29tIiwiYXVkIjoiaHR0cDovL0p1c3N1ci5jb20ifQ.eR9bgd088VDfTEPsDTbmcCipsMrLDV1F-IJ9uRYH7aI",
    //         },
    //         url:
    //           "https://crm.jussuremdad.com/DEVMobAppAPI/api/service/SendMobileSms",
    //         data: data,
    //     }).then(function(response) {
    //         if (response.status === 400) {
    //         //   if(response.data.Message==='Error has been occurred.'){
    //         //   res.sendFile('./index.html', {root: __dirname })
    //         res.send('sms send successfully')
    //         //   }
    //         }
    //       });
    //   } catch (error) {
        res.sendFile('./summaryPage/summary.html',{root: __dirname })
    //   }


});


var server = app.listen(PORT, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
