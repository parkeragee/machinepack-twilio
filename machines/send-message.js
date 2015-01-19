module.exports = {
  friendlyName: 'Send message',
  description: 'Send a message using the Twilio API',

  inputs: {

    accountSid: {
      example: 'DZe5eafd3c69b1e74example5852c04a9102',
      description: 'Your account SID Number located on your dashboard\'s main page.',
      required: true
    },

    authToken: {
      example: 'Dafd4example5852c3c69bZe5e1e704a9102',
      description: 'Your account Auth Token located on your dashboard\'s main page.',
      required: true
    },

    body: {
      example: 'Example message',
      description: 'This is the body of the message being sent',
      required: true
    },

    from: {
      example: '+16155551234',
      description: 'This is the \'From\' phone number assigned to you from Twilio.',
      required: true
    },

    to: {
      example: '+16155556789',
      description: 'This is the \'To\' phone number the message is sending to.',
      required: true
    }

  },

  defaultExit: 'success',


  exits: {

    error: {
      description: 'Message failed to send',
      void: true
    },

    success: {
      description: 'Message sent successfully',
      variableName: 'messageSent',
      example:  {
        sid: 'SM25e3fada288945b3af03df87114f5db7',
        date_created: 'Fri, 16 Jan 2015 14:03:51 +0000',
        date_updated: 'Fri, 16 Jan 2015 14:03:51 +0000',
        date_sent: null,
        account_sid: 'Dafd4example5852c3c69bZe5e1e704a9102',
        to: '+16155551234',
        from: '+15005550006',
        body: 'Test message',
        status: 'queued',
        num_segments: '1',
        num_media: '0',
        direction: 'outbound-api',
        api_version: '2010-04-01',
        price: null,
        price_unit: 'USD',
        uri: '/2010-04-01/Accounts/Dafd4example5852c3c69bZe5e1e704a9102/Messages/SM25e3fada288945b3af03df87114f5db7.json',
        subresource_uris: { media: '/2010-04-01/Accounts/Dafd4example5852c3c69bZe5e1e704a9102/Messages/SM25e3fada288945b3af03df87114f5db7/Media.json' },
        dateCreated: 'Fri Jan 16 2015 08:03:51 GMT-0600 (CST)',
        dateUpdated: 'Fri Jan 16 2015 08:03:51 GMT-0600 (CST)',
        dateSent: null,
        accountSid: 'Dafd4example5852c3c69bZe5e1e704a9102',
        numSegments: '1',
        numMedia: '0',
        apiVersion: '2010-04-01',
        priceUnit: 'USD',
        subresourceUris: { media: '/2010-04-01/Accounts/Dafd4example5852c3c69bZe5e1e704a9102/Messages/SM25e3fada288945b3af03df87114f5db7/Media.json' }
      }
    }

  },

  fn: function (inputs, exits) {

    var client = require('twilio')(inputs.accountSid, inputs.authToken);

    client.messages.create({
        body: inputs.body,
        to: inputs.to,
        from: inputs.from,
    }, function(err, response) {
      if(err) return exits.error(err);
      return exits.success(response);
    });

  }

};
