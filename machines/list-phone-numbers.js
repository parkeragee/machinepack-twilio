module.exports = {


  friendlyName: 'List phone numbers',


  description: 'List the available phone numbers for a particular account.',


  extendedDescription: '',


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
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: 'Done.',
      example: ['+15128459328']
    },

  },


  fn: function (inputs,exits) {

    var _ = require('lodash');
    var client = require('twilio')(inputs.accountSid, inputs.authToken);

    client.incomingPhoneNumbers.list({}, function(err, response) {
      if (err) return exits.error(err);
      try {
        var numbers = _.pluck(response.incomingPhoneNumbers, 'phone_number');
        return exits.success(numbers);
      }
      catch (e) {
        return exits.error(e);
      }
    });
  },



};
