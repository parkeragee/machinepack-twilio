module.exports = {


  friendlyName: 'Send message',


  description: 'Send a message using the Twilio API',


  inputs: {

    accountSid: {
      example: 'DZe5eafd3c69b1e74example5852c04a9102',
      description: 'The "account sid" associated with your Twilio account.',
      whereToGet: {
        url: 'https://www.twilio.com/user/account/voice-messaging',
        description: 'Visit your Twilio dashboard\'s main page. Click "Show API Credentials", then copy and paste your "ACCOUNT SID".'
      },
      required: true
    },

    authToken: {
      example: 'Dafd4example5852c3c69bZe5e1e704a9102',
      description: 'The "auth token" associated with your Twilio account.',
      whereToGet: {
        url: 'https://www.twilio.com/user/account/voice-messaging',
        description: 'Visit your Twilio dashboard\'s main page. Click "Show API Credentials", then copy and paste your "AUTH TOKEN".'
      },
      required: true
    },

    body: {
      example: 'Example message',
      description: 'This is the body of the message being sent',
      required: true
    },

    from: {
      example: '+16155551234',
      description: 'This is the \'From\' phone number you\'d like to use to send the SMS.',
      extendedDescription: 'This phone number is assigned to you by Twilio. If omitted, the first available number will be used.'
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
        status: 'queued',
        uri: '/2010-04-01/Accounts/Dafd4example5852c3c69bZe5e1e704a9102/Messages/SM25e3fada288945b3af03df87114f5db7.json'
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
      if (err) return exits.error(err);
      return exits.success(response);
    });

  }


};
