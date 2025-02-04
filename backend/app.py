from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as palm  # Import the Gemini library
import fitz  # PyMuPDF for handling PDFs

app = Flask(__name__)
CORS(app)

key = "AIzaSyDxByW2GpWT0OKSLifZbiFatBZyG_8QfDE"  # Replace this with your actual API key
if not key:
    raise ValueError("GOOGLE_API_KEY environment variable not set.")

# Configure the API
palm.configure(api_key=key)
model = palm.GenerativeModel("gemini-1.5-flash")

def extract_text_from_pdf(pdf_file):
    """Extracts clean text from a PDF file."""
    try:
        doc = fitz.open(stream=pdf_file, filetype="pdf")  # Open PDF from bytes
        text = ""
        for page_num in range(doc.page_count):  # Iterate through all pages
            page = doc.load_page(page_num)  # Load each page
            text += page.get_text("text")  # Extract text from page
        return text
    except Exception as e:
        print(f"Error extracting text from PDF: {str(e)}")
        return None

@app.route('/summarize', methods=['POST'])
def summarize():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    uploaded_file = request.files['file']

    if uploaded_file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        file_content = ""
        if uploaded_file.filename.endswith('.pdf'):
            # Extract text from PDF
            file_content = extract_text_from_pdf(uploaded_file.read())
            print(file_content)
            if not file_content:
                return jsonify({"error": "Failed to extract text from PDF"}), 400
        elif uploaded_file.filename.endswith('.txt'):
            # Read text file directly
            file_content = uploaded_file.read().decode('utf-8', errors='ignore')
        else:
            return jsonify({"error": "Unsupported file format"}), 400
        
        print("File content extracted successfully")
        
        # Initialize and generate summary
        response = model.generate_content(file_content)
        
        # Get the summary directly from the response
        summary = response.text  # Fixed: no parentheses
        print("Summary generated successfully")
        
        # Check if the summary is empty or None
        if not summary:
            return jsonify({"error": "No summary generated"}), 500

        return jsonify({"summary": summary})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
