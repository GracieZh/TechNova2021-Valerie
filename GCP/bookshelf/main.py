# Copyright 2019 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import logging

import firestore
from flask import current_app, flash, Flask, Markup, redirect, render_template
from flask import request, url_for
from google.cloud import error_reporting
import google.cloud.logging
import storage

from flask import jsonify
from flask import send_file
import json

from cloud_t2s import synthesize_text
from cloud_s2t import getaudiotext
from cloud_jina import searchforanswer

# [START upload_image_file]
def upload_image_file(img):
    """
    Upload the user-uploaded file to Google Cloud Storage and retrieve its
    publicly-accessible URL.
    """
    if not img:
        return None

    public_url = storage.upload_file(
        img.read(),
        img.filename,
        img.content_type
    )

    current_app.logger.info(
        'Uploaded file %s as %s.', img.filename, public_url)

    return public_url
# [END upload_image_file]


# [START upload_mp3_file]
def upload_mp3_file(img, id:str):
    """
    Upload the user-uploaded file to Google Cloud Storage and retrieve its
    publicly-accessible URL.
    """
    #if not img:
    #    return None

    filename = f"/tmp/upload."+id+".mp3"

    print("..... filename .....  ", filename)

    import io
    try:
        with io.open(filename, "wb") as out:
            print(" open file done")
            out.write(img.read())
            print(" write done")
            out.close();
    except IOError as e:
        print("makedirs err = ", err)
        raise        

    return "return from upload_mp3_file"
# [END upload_mp3_file]

app = Flask(__name__)
app.config.update(
    SECRET_KEY='secret',
    MAX_CONTENT_LENGTH=8 * 1024 * 1024,
    ALLOWED_EXTENSIONS=set(['png', 'jpg', 'jpeg', 'gif'])
)

app.debug = False
app.testing = False

# Configure logging
if not app.testing:
    logging.basicConfig(level=logging.INFO)
    client = google.cloud.logging.Client()
    # Attaches a Google Stackdriver logging handler to the root logger
    client.setup_logging()


@app.route('/')
def list():
    start_after = request.args.get('start_after', None)
    books, last_title = firestore.next_page(start_after=start_after)

    return render_template('list.html', books=books, last_title=last_title)

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        data = request.form.to_dict(flat=True)

        book_id = '1';
        book = firestore.read(book_id)
        if book != None:
            book_id = book['id'];
        else:
            book = {'title': '123123', 'author': 'b', 'publishedDate': 'c', 'description': '1'}

        try:
            book['description'] = str( (int(book['description']) + 1 ) )
        except ValueError:
            book['description'] = "1"


        book = firestore.update(book, book_id)

        id = book['description'];
        print("id=", id, "book=", book )

        print("============upload file:==============", request.files)
        upload_mp3_file(request.files.get('image'), id)

        print("..... upload done .....  ")

        text = getaudiotext(id)

        print("..... text .....  ", text)

        if text.startswith('Transcript: '):
            answer = searchforanswer(text[12: len(text)], id)
            print("=====> question:", text)
            print("=====> answer:", answer)
            synthesize_text(answer, id)
            return jsonify({'ok':'true', 'id':id}), 200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*'}

    return render_template('form.html', action='Add', book={})

@app.route('/text', methods=['GET', 'POST'])
def gettext():
    id = '0'
    request_json = request.get_json()
    if request.args and 'id' in request.args:
        id = request.args.get('id')
    elif request_json and 'id' in request_json:
        id = request_json['id']
    text = "";        
    import io
    with io.open(f"/tmp/text."+id+".txt", "r") as f:
        text = f.read()
        f.close();
    return jsonify({'ok':'true', 'text':json.loads(text)}), 200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*'}

@app.route('/mp3', methods=['GET', 'POST'])
def getmp3():
    id = '0'
    request_json = request.get_json()
    if request.args and 'id' in request.args:
        id = request.args.get('id')
    elif request_json and 'id' in request_json:
        id = request_json['id']
    return send_file(f"/tmp/upload."+id+".mp3")

@app.route('/test1')
def test1():
    return render_template('cloud_test1.html')

@app.route('/audio/horse.mp3')
def playAudioFile():
    return synthesize_text()

@app.route('/audio/text')
def getAudioText():
    return getaudiotext()

@app.route('/books/<book_id>')
def view(book_id):
    book = firestore.read(book_id)
    return render_template('view.html', book=book)

@app.route('/books/add', methods=['GET', 'POST'])
def add():
    if request.method == 'POST':
        data = request.form.to_dict(flat=True)

        # If an image was uploaded, update the data to point to the new image.
        image_url = upload_image_file(request.files.get('image'))

        if image_url:
            data['imageUrl'] = image_url
        print("=======> book:", data)

        book = firestore.create(data)


        scores = {'id': '1', 'title': '123123', 'author': 'b', 'publishedDate': 'c', 'description': 'd', 'imageUrl': ''}
        print("=======> Score:", scores)

        return redirect(url_for('.view', book_id=book['id']))

    return render_template('form.html', action='Add', book={})


@app.route('/books/<book_id>/edit', methods=['GET', 'POST'])
def edit(book_id):
    book = firestore.read(book_id)

    if request.method == 'POST':
        data = request.form.to_dict(flat=True)

        # If an image was uploaded, update the data to point to the new image.
        image_url = upload_image_file(request.files.get('image'))

        if image_url:
            data['imageUrl'] = image_url

        book = firestore.update(data, book_id)

        return redirect(url_for('.view', book_id=book['id']))

    return render_template('form.html', action='Edit', book=book)


@app.route('/books/<book_id>/delete')
def delete(book_id):
    firestore.delete(book_id)
    return redirect(url_for('.list'))


@app.route('/logs')
def logs():
    logging.info('Hey, you triggered a custom log entry. Good job!')
    flash(Markup('''You triggered a custom log entry. You can view it in the
        <a href="https://console.cloud.google.com/logs">Cloud Console</a>'''))
    return redirect(url_for('.list'))


@app.route('/errors')
def errors():
    raise Exception('This is an intentional exception.')


# Add an error handler that reports exceptions to Stackdriver Error
# Reporting. Note that this error handler is only used when debug
# is False
@app.errorhandler(500)
def server_error(e):
    client = error_reporting.Client()
    client.report_exception(
        http_context=error_reporting.build_flask_context(request))
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500


# This is only used when running locally. When running live, gunicorn runs
# the application.
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
