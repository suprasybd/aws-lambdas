console.log('Loading function');
var ElasticEmail = require('@elasticemail/elasticemail-client');

export const handler = async (event) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    
    const client = ElasticEmail.ApiClient.instance;
    const apikey = client.authentications['apikey'];
    apikey.apiKey = "2B8A6EAC96AC45A4528A4D196D18706F38A34E14F19BE1CF9EABB10E5F32CE497DC0FE5D1ABBB8C2E2015AA2254C533F";

    const emailsApi = new ElasticEmail.EmailsApi();

    const callback = (error, data, response) => {
      if (error) {
          console.error(error);
      } else {
          console.log('API called successfully.');
          console.log('Email sent.');
      }
  };

  
    for (const { messageId, body } of event.Records) {
        emailsApi.emailsTransactionalPost(JSON.parse(emailData), callback);

        console.log('SQS message %s: %j', messageId, body);
    }
    return `Successfully processed ${event.Records.length} messages.`;
};
