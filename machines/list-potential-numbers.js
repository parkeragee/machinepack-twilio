module.exports = {


  friendlyName: 'List potential numbers',


  description: 'List the phone numbers potentially available (but not yet provisioned) to your Twilio account.',


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
    },

    country: {
      description: 'The ISO country code of phone numbers to return.',
      example: 'US',
      defaultsTo: 'US'
    },

    type: {
      description: 'The type of phone numbers to return- "local", "mobile", or "tollFree". If omitted, defaults to "local".',
      example: 'local',
      defaultsTo: 'local'
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

    client.availablePhoneNumbers(inputs.country||'US')[inputs.type||'local'].list({}, function(err, response) {
      if (err) return exits.error(err);

      try {
        var numbers = _.pluck(response.availablePhoneNumbers, 'phone_number');
        return exits.success(numbers);
      }
      catch (e) {
        return exits.error(e);
      }
    });
  },



};
