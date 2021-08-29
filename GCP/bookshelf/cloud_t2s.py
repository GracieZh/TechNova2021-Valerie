from google.cloud import texttospeech as tts
from flask import send_file
#import google.cloud.texttospeech as tts

def text_to_mp3(voice_name: str, text: str, id:str):
    language_code = "-".join(voice_name.split("-")[:2])
    text_input = tts.SynthesisInput(text=text)
    voice_params = tts.VoiceSelectionParams(
        language_code=language_code, name=voice_name
    )
    audio_config = tts.AudioConfig(
        audio_encoding=tts.AudioEncoding.MP3)
        #audio_encoding=tts.AudioEncoding.LINEAR16)

    client = tts.TextToSpeechClient()
    response = client.synthesize_speech(
        input=text_input, voice=voice_params, audio_config=audio_config
    )
    print("text is:", text)

    # filename = f"./images/answer."+id+".mp3"
    # with open(filename, "wb") as out1:
    #     out1.write(response.audio_content)

    filename = f"/tmp/answer."+id+".mp3"
    with open(filename, "wb") as out:
        out.write(response.audio_content)

    #    print(f'Generated speech saved to "{filename}"')

    return send_file(filename)

def synthesize_text(text: str, id:str):
#    return send_file("/tmp/horse.mp3")    
    # return text_to_mp3("en-AU-Wavenet-A", "Hello Gracie, What is the temperature in Sydney?")
    return text_to_mp3("en-AU-Wavenet-A", text, id)


def synthesize_text_0_old_obsolete_not_used():
   #if request.method == "POST":
   #     text = request.form['text']
        text = 'to be or not to be, this is a question'

        import os 
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="~/key.json"

        client = texttospeech.TextToSpeechClient()
        input_text = texttospeech.types.SynthesisInput(text=text)
        voice = texttospeech.types.VoiceSelectionParams(
            language_code='en-US',
            name='en-US-Standard-C',
            ssml_gender=texttospeech.enums.SsmlVoiceGender.FEMALE)

        audio_config = texttospeech.types.AudioConfig(
            audio_encoding=texttospeech.enums.AudioEncoding.MP3)

        response = client.synthesize_speech(input_text, voice, audio_config)

        # The response's audio_content is binary.
        with open('/tmp/output.mp3', 'wb') as out:
            out.write(response.audio_content)

        return send_file("/tmp/output.mp3")
    #else:
    #    return send_file("/tmp/horse.mp3")    
