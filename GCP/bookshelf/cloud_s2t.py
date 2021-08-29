from google.cloud import speech_v1p1beta1 as speech


def speech_to_text(config, audio):
    client = speech.SpeechClient()
    response = client.recognize(config=config, audio=audio)
    return print_sentences(response)


def print_sentences(response):
    for result in response.results:
        best_alternative = result.alternatives[0]
        transcript = best_alternative.transcript
        confidence = best_alternative.confidence
        print("-" * 80)
        print(f"Confidence: {confidence:.0%}")
        print(f"Transcript: {transcript}")
        return  f"Transcript: {transcript}"
    return "Null: I have heard nothing"
    
def getaudiotext_test():
    #config = dict(language_code="en-US")
    #audio = dict(uri="gs://cloud-samples-data/speech/brooklyn_bridge.flac")
    import io
    with io.open("/tmp/output.mp3", "rb") as audio_file:
        content = audio_file.read()
    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        #encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        encoding=speech.RecognitionConfig.AudioEncoding.MP3,
        sample_rate_hertz=16000,
        language_code="en-US",
    )
    return speech_to_text(config, audio)

def getaudiotext(id):
    #config = dict(language_code="en-US")
    #audio = dict(uri="gs://cloud-samples-data/speech/brooklyn_bridge.flac")
    import io
    import os
    print("audio_file size = ", os.path.getsize(f"/tmp/upload."+id+".mp3"))

    print("open file ");

    with io.open(f"/tmp/upload."+id+".mp3", "rb") as audio_file:
        content = audio_file.read()

    print("content done ");

    audio = speech.RecognitionAudio(content=content)
    print("audio done ");

    config = speech.RecognitionConfig(
        #encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        encoding=speech.RecognitionConfig.AudioEncoding.MP3,
        sample_rate_hertz=16000,
        language_code="en-US",
    )
    print("config = ", config);
    return speech_to_text(config, audio)
