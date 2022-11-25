const bodyParser = require("body-parser");
var express = require("express");
const axios = require("axios");
const path = require('path');
const fs = require('fs');
// const { error } = require("console");
// const payment_token = require("apple-pay-token-decrypt")

var contract_id = ''

var app = express();
const indexPath = path.resolve(__dirname, "summaryPage", "summary.html");
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
const publicCert = fs.readFileSync(path.join(__dirname, './summaryPage/apple_pay.pem'), 'utf8') // import your certificate file
const privateKey = fs.readFileSync(path.join(__dirname, './summaryPage/YourPrivateKey.pem'), 'utf8') // import your private key file

const PORT = process.env.PORT || 5000;
app.get("/", function(req, res) {
  res.send('home page')
})

app.post("/payment-complete/*", function(req, res) {
  let obj_ = req.params
  let merchant_refer = Object.values(obj_)[0]
  console.log('merchant', merchant_refer)
  console.log(req.body)
  if (req.body !== "" || req.body !== undefined) {
       let  data = {
            "service_command": req.body.command,
            "merchant_reference": merchant_refer,
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
    try {
      axios({
        method: "post",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjM2NTY1NTUsImlzcyI6Imh0dHA6Ly9KdXNzdXIuY29tIiwiYXVkIjoiaHR0cDovL0p1c3N1ci5jb20ifQ.eR9bgd088VDfTEPsDTbmcCipsMrLDV1F-IJ9uRYH7aI",
        },
        url:
          "https://crm.jussuremdad.com/DEVMobAppAPI/api/payment/CompletePayment",
        data: data,
      }).catch((err)=>{
        axios({
          method: "post",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjM2NTY1NTUsImlzcyI6Imh0dHA6Ly9KdXNzdXIuY29tIiwiYXVkIjoiaHR0cDovL0p1c3N1ci5jb20ifQ.eR9bgd088VDfTEPsDTbmcCipsMrLDV1F-IJ9uRYH7aI",
          },
          url:
            "https://crm.jussuremdad.com/DEVMobAppAPI/api/payment/CompletePayment",
          data: data,
         
        }).then(function(response) {
          if (response.status === 200) {
          console.log(response.data)
            res.sendFile('./index.html', {root: __dirname })
          }
        })
      }
      )
          // res.sendFile('./index.html', {root: __dirname })
    } catch (error) {
      axios({
        method: "post",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjM2NTY1NTUsImlzcyI6Imh0dHA6Ly9KdXNzdXIuY29tIiwiYXVkIjoiaHR0cDovL0p1c3N1ci5jb20ifQ.eR9bgd088VDfTEPsDTbmcCipsMrLDV1F-IJ9uRYH7aI",
        },
        url:
          "https://crm.jussuremdad.com/DEVMobAppAPI/api/payment/CompletePayment",
        data: data,
       
      }).then(function(response) {
        if (response.status === 200) {
        console.log(response.data)
          res.sendFile('./index.html', {root: __dirname })
        }
      });
    }
 
  }
});

app.post("/payment-success/*", function(req, res) {
  let obj_ = req.params
  contract_id=Object.values(obj_)[0]
  res.sendFile('./index.html', {root: __dirname })
});

app.post("/view-summary", function(req, res) {
    console.log('sms send function')
    let data = {
        "SMSID": "",
        "Message": "hello",
        "Mobile": "918807401368"
      }
      var name ='rayi'
          axios({
            method: "get",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjM2NTY1NTUsImlzcyI6Imh0dHA6Ly9KdXNzdXIuY29tIiwiYXVkIjoiaHR0cDovL0p1c3N1ci5jb20ifQ.eR9bgd088VDfTEPsDTbmcCipsMrLDV1F-IJ9uRYH7aI",
            },
            url:
              "https://crm.jussuremdad.com/DEVMobAppAPI/api/longterm/GetContractDetails?ContractId=53E82082-EE8E-EC11-951F-BF9B05C28034",
        }).then(function(response) {
            fs.readFile(indexPath, "utf8", (err, htmlData) => {
            if(contract_id==""){
              htmlData = htmlData
                  .replaceAll("mnum", response.data.longTermcontractInfo[0].mnum)
                  .replaceAll('dayname',response.data.longTermcontractInfo[0].dayname)
                  .replaceAll('HijiriDate',response.data.longTermcontractInfo[0].HijiriDate)
                  .replaceAll('CurrentDate',response.data.longTermcontractInfo[0].CurrentDate)
                  .replaceAll('idnum', response.data.longTermcontractInfo[0].idnum)
                  .replaceAll('xmail',response.data.longTermcontractInfo[0].xmail)
                  .replaceAll('workingplace',response.data.longTermcontractInfo[0].workingplace)
                  .replaceAll('postoffice',response.data.longTermcontractInfo[0].postoffice)
                  .replaceAll('pnum',response.data.longTermcontractInfo[0].pnum)
                  .replaceAll('postcod',response.data.longTermcontractInfo[0].postcod)
                  .replaceAll('<h3>Contract Id:contract_id</h3>',contract_id)
            }else{
              htmlData = htmlData
              .replaceAll("mnum", response.data.longTermcontractInfo[0].mnum)
              .replaceAll('dayname',response.data.longTermcontractInfo[0].dayname)
              .replaceAll('HijiriDate',response.data.longTermcontractInfo[0].HijiriDate)
              .replaceAll('CurrentDate',response.data.longTermcontractInfo[0].CurrentDate)
              .replaceAll('idnum', response.data.longTermcontractInfo[0].idnum)
              .replaceAll('xmail',response.data.longTermcontractInfo[0].xmail)
              .replaceAll('workingplace',response.data.longTermcontractInfo[0].workingplace)
              .replaceAll('postoffice',response.data.longTermcontractInfo[0].postoffice)
              .replaceAll('pnum',response.data.longTermcontractInfo[0].pnum)
              .replaceAll('postcod',response.data.longTermcontractInfo[0].postcod)
              .replaceAll('contract_id',contract_id)

            }
              return res.send(htmlData)
            })

        })
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
    //   }


});

app.get("/view-summary/*", function(req, res) {
  let obj_ = req.params
  contract_id=Object.values(obj_)[0].split('/')[0]
  console.log(obj_,contract_id);
  console.log('sms send function')
  let data = {
      "SMSID": "",
      "Message": "hello",
      "Mobile": "918807401368"
    }
    var name ='rayi'

        axios({
          method: "get",
          headers: {
            Authorization:
              `Bearer ${Object.values(obj_)[0].split('/')[1]}`,
          },
          url:
            `https://crm.jussuremdad.com/DEVMobAppAPI/api/longterm/GetContractDetails?ContractId=${contract_id}`,
      }).then(function(response) {
        // if(response.status==400){
        //   res.send('<p>Contract id not supported')
        // }else{
          console.log(response.data)
          fs.readFile(indexPath, "utf8", (err, htmlData) => {
          if(contract_id==""){
            try {
          
            htmlData = htmlData
                .replaceAll("mnum", response.data.longTermcontractInfo[0].mnum)
                .replaceAll('dayname',response.data.longTermcontractInfo[0].dayname)
                .replaceAll('HijiriDate',response.data.longTermcontractInfo[0].HijiriDate)
                .replaceAll('CurrentDate',response.data.longTermcontractInfo[0].CurrentDate)
                .replaceAll('idnum', response.data.longTermcontractInfo[0].idnum)
                .replaceAll('xmail',response.data.longTermcontractInfo[0].xmail)
                .replaceAll('workingplace',response.data.longTermcontractInfo[0].workingplace)
                .replaceAll('postoffice',response.data.longTermcontractInfo[0].postoffice)
                .replaceAll('pnum',response.data.longTermcontractInfo[0].pnum)
                .replaceAll('postcod',response.data.longTermcontractInfo[0].postcod)
                .replaceAll('<h3>Contract Id:contract_id</h3>',contract_id)
              } catch (error) {
      res.sendFile('./summaryPage/Error.html', {root: __dirname })
              
              }
          }else{
            try{
            htmlData = htmlData
            .replaceAll("mnum", response.data.longTermcontractInfo[0].mnum)
            .replaceAll('dayname',response.data.longTermcontractInfo[0].dayname)
            .replaceAll('HijiriDate',response.data.longTermcontractInfo[0].HijiriDate)
            .replaceAll('CurrentDate',response.data.longTermcontractInfo[0].CurrentDate)
            .replaceAll('idnum', response.data.longTermcontractInfo[0].idnum)
            .replaceAll('xmail',response.data.longTermcontractInfo[0].xmail)
            .replaceAll('workingplace',response.data.longTermcontractInfo[0].workingplace)
            .replaceAll('postoffice',response.data.longTermcontractInfo[0].postoffice)
            .replaceAll('pnum',response.data.longTermcontractInfo[0].pnum)
            .replaceAll('postcod',response.data.longTermcontractInfo[0].postcod)
            .replaceAll('contract_id',contract_id)
            .replaceAll('custname', response.data.longTermcontractInfo[0].custname)
            .replaceAll('countname', response.data.longTermcontractInfo[0].countname)
            .replaceAll('السيد/ اسمالعميلعربى', response.data.longTermcontractInfo[0].custname_ar)
            .replaceAll('اسمبلد', response.data.longTermcontractInfo[0].countname_ar)
          } catch (error) {
      res.sendFile('./summaryPage/Error.html', {root: __dirname })
              
          }

          }
            return res.send(htmlData)
          })
        // }
      }) .catch((error)=>{
        console.log('error')
      // res.send('contract id not supported')
      res.sendFile('./summaryPage/Error.html', {root: __dirname })

      })         
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
  //   }


});

// app.post("/token-decrypt", function(req, res){
//   let token_get = req.body
//   // console.log(obj_)
// //   let token_get=Object.values(obj_)[0]
// //   console.log(token)

//   const token = new payment_token(token_get)
// const decryptedToken = token.decrypt(publicCert, privateKey)
// decryptedToken.then( ret => {
//     console.log(ret)
//     res.send(ret)
//     // return ret
// }).catch( err => {
//     console.error(err)
//     return err
// })
// })

var server = app.listen(PORT, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
