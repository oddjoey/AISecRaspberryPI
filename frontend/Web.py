from flask import Flask, render_template, request, redirect, url_for # type: ignore
import os

ac = Flask(__name__)

ac.config['Upload pictures'] = 'uploads/'
ac.config['file format'] = {'png', 'jpg', 'jpeg', 'gif'}

def format(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['file formart']

@ac.route("/", methods=["GET", "POST"])
def index():
    if "text" in request.form:
        text = request.form["text"]
    else:
        text_input = None

    file = request.files.get("image")
    if file and allowed_file(file.filename):
        filename = os.path.join(ac.config['Upload pictures'], file.filename)
        file.save(filename)
        return render_template("indexW.html", text_input=text_input, image_filename=file.filename)

    return render_template("indexW.html")

if __name__ == "__main__":
    app.run(debug=True)

