from flask import Flask, render_template, request, redirect, url_for # type: ignore
import os

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        # Handle text input
        text_input = request.form.get("text_input")
        
        # Handle image upload
        file = request.files.get('image')
        if file and allowed_file(file.filename):
            filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filename)
            return render_template("indexW.html", text_input=text_input, image_filename=file.filename)

    return render_template("indexW.html")

if __name__ == "__main__":
    app.run(debug=True)

