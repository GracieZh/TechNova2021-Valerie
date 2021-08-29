def hasword(sentence, word):
    if sentence.find(word) < 0 :
        return False
    return True

def what_is_mental_health(question, id):
    return "What Is Mental Health?  Mental health includes our emotional, psychological, and social well-being.  It affects how we think, feel, and act.  It also helps determine how we handle stress, relate to others, and make choices.  Mental health is important at every stage of life, from childhood and adolescence through adulthood."

def searchforanswer(question, id):
    sentence = question.lower()
    mental = hasword(sentence, "mental");
    health = hasword(sentence, "health");
    what = hasword(sentence, "what");

    answer = "Your question is: " + question + ", I don't know how to answer this question."
    # answer = " Sorry, I don't know how to answer this question."

    #if what and mental and health:
    answer = what_is_mental_health(question, id);

    import io
    with io.open(f"/tmp/text."+id+".txt", "w") as f:
        f.write('{"question":"'+question+'", "answer":"'+answer+'"}')
        f.close();

    return answer
