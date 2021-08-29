
def searchforanswer(question, id):
    answer = "Your question is: " + question + ", I don't know how to answer this question."

    import io
    with io.open(f"/tmp/text."+id+".txt", "w") as f:
        f.write('{"question":"'+question+'", "answer":"'+answer+'"}')
        f.close();

    return answer;
