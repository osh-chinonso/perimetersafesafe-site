from flask import Flask, render_template, request, redirect, url_for, flash, session
import mysql.connector
import os
import mimetypes
from werkzeug.utils import secure_filename
from datetime import datetime


# --- Config ---
app = Flask(__name__)
app.secret_key = '10e3157c14eec0ffc9d0cee722ecf366'
UPLOAD_FOLDER = 'static/gallery_uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'webm', 'mov'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# --- MySQL ---
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Osh251610$$##",
    database="perimetersafe"
)
cursor = db.cursor(dictionary=True)

# --- Helpers ---
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- Public Pages ---
@app.route('/')
def index(): return render_template('index.html')

@app.route('/services')
def services(): return render_template('services.html')

@app.route('/about')
def about(): return render_template('about.html')

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        if request.form.get("website"):  # Honeypot for spam
            return redirect(url_for("contact"))

        name = request.form["name"]
        email = request.form["email"]
        message = request.form["message"]

        cursor.execute("""
            INSERT INTO messages (name, email, message, is_read) 
            VALUES (%s, %s, %s, 0)
        """, (name, email, message))
        db.commit()

        flash("Message submitted successfully!", "success")
        return redirect(url_for("contact"))

    return render_template("contact.html")

@app.route('/gallery')
def gallery():
    cursor.execute("SELECT * FROM gallery_images ORDER BY id DESC")
    images = cursor.fetchall()
    return render_template('gallery.html', images=images)
# --- Admin Login ---
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == 'osh' and password == 'osh251610$$##':
            session['admin_logged_in'] = True
            return redirect(url_for('admin_dashboard'))  # ✅ Redirect here
        else:
            return render_template('admin_login.html', error="Invalid credentials")
    return render_template('admin_login.html')

# --- Admin Dashboard ---
@app.route("/admin-dashboard", methods=["GET", "POST"])
def admin_dashboard():
    if not session.get("admin_logged_in"):
        return redirect(url_for("admin_login"))

    if request.method == "POST":
        file = request.files.get("media")
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

            mime_type, _ = mimetypes.guess_type(filepath)
            media_type = "video" if mime_type and mime_type.startswith("video") else "image"

            cursor.execute("INSERT INTO gallery_images (filename, media_type) VALUES (%s, %s)", (filename, media_type))
            db.commit()
            flash(f"{media_type.capitalize()} uploaded successfully!", "success")
        else:
            flash("Invalid media format!", "danger")

    # Always return the dashboard page
    cursor.execute("SELECT * FROM messages ORDER BY id DESC")
    messages = cursor.fetchall()
    cursor.execute("SELECT * FROM gallery_images ORDER BY id DESC")
    images = cursor.fetchall()
    return render_template("admin_dashboard.html", messages=messages, images=images)

# --- Mark Message as Read ---
@app.route("/mark-as-read/<int:message_id>")
def mark_as_read(message_id):
    if session.get("admin_logged_in"):
        cursor.execute("UPDATE messages SET is_read = 1 WHERE id = %s", (message_id,))
        db.commit()
    return redirect(url_for("admin_dashboard"))

# --- Delete Message ---
@app.route('/delete-message/<int:message_id>', methods=['POST'])
def delete_message(message_id):
    if not session.get("admin_logged_in"):
        flash("Access denied. Please log in as admin.", "danger")
        return redirect(url_for("admin_login"))

    try:
        cursor.execute("DELETE FROM messages WHERE id = %s", (message_id,))
        db.commit()
        flash("Message deleted successfully!", "success")
    except Exception as e:
        db.rollback()
        flash(f"Error deleting message: {e}", "danger")

    return redirect(url_for("admin_dashboard"))

# --- Upload Image ---
@app.route('/upload-image', methods=['POST'])
def upload_image():
    if not session.get("admin_logged_in"):
        flash("Access denied.", "danger")
        return redirect(url_for("admin_login"))

    file = request.files.get("image")
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        cursor.execute("INSERT INTO gallery_images (filename, media_type) VALUES (%s, %s)", (filename, "image"))
        db.commit()
        flash("Image uploaded successfully!", "success")
    else:
        flash("Invalid file format!", "danger")

    return redirect(url_for('admin_dashboard'))


# --- Delete Image/Video ---
@app.route('/delete-image/<int:image_id>', methods=['POST'])
def delete_image(image_id):
    if not session.get("admin_logged_in"):
        flash("Unauthorized access", "danger")
        return redirect(url_for('admin_login'))

    cursor.execute("SELECT filename FROM gallery_images WHERE id = %s", (image_id,))
    result = cursor.fetchone()

    if result:
        filename = result['filename']
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if os.path.exists(filepath):
            os.remove(filepath)

        cursor.execute("DELETE FROM gallery_images WHERE id = %s", (image_id,))
        db.commit()
        flash("Media deleted successfully!", "success")
    else:
        flash("File not found!", "warning")

    return redirect(url_for('admin_dashboard'))


if __name__ == "__main__":
    app.run(debug=True)
