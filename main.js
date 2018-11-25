var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');


// Passwords and API Key
var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  api_key: 'ec6ee8789ddd19c4747cc4ab3ee09f7dd0b2d6f8'
});

var text_to_speech = new TextToSpeechV1 ({
    username: '005aeec3-fa81-4734-b427-cfbb2b5f82d5',
    password: '1B4tqoV8Eqxj'
  });

var images_file = fs.createReadStream(__dirname + '/images/em.jpg')

var params = {
  images_file: images_file
};

visualRecognition.detectFaces(params, function(err, response) {
  if (err)
    console.log(err);
  else
    {
        console.log(JSON.stringify(response, null, 2))
        var jsontxt = JSON.stringify(response, null, 2)

        var params = {
            text: jsontxt,
            voice: 'en-US_AllisonVoice',
            accept: 'audio/wav'
        };

        text_to_speech.synthesize(params).on('error', function(error) {
            console.log('Error:', error);
        }).pipe(fs.createWriteStream('testing.wav'));
    }

});