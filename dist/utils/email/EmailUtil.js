// import { SESClient, SESClientConfig, SendEmailCommand } from "@aws-sdk/client-ses";
// import * as fs from "fs";
// import * as path from "path";
// import * as handlebars from "handlebars";
// import { IRecoveryPassEmailDTO } from "../../dtos/EmailDTO";
// import { html } from "./RecoveryPassword.html";
// const sesConfig: SESClientConfig = {
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.ACCESS_KEY,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY
//   }
// }
// if (process.env.APP_ENV === "local") { 
//   sesConfig.endpoint = "http://localstack_xbio:4566"
// }
// const sesClient = new SESClient(sesConfig);
// export async function sendRecoveryPassEmail(mailObject: IRecoveryPassEmailDTO): Promise<void> {
//     const template = handlebars.compile(html);
//     const replacements = {
//       userPassword: mailObject.password,
//     };
//     const htmlToSend = template(replacements);
//     const params = {
//       Source: process.env.SMTP_USER, 
//       Destination: { 
//         ToAddresses: [
//           mailObject.emailToSend,
//         ]
//       },
//       Message: { 
//         Subject: {
//           Data: mailObject.title,
//           Charset: 'UTF-8'
//         },
//         Body: { 
//           Html: {
//             Data: htmlToSend,
//             Charset: 'UTF-8'
//           }
//         }
//       }
//     };
//     try {
//       await sesClient.send(new SendEmailCommand(params));
//     } catch (err) {
//       console.log(err);
//     }
//   }
//# sourceMappingURL=EmailUtil.js.map