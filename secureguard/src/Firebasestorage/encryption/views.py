from django.shortcuts import render
import os
from django.http import JsonResponse, HttpResponse
from .encrypt_utils import encrypt_data, generate_key
from .firebase_client import initialize_firebase  # Only import initialize_firebase

def home(request):
    return render(request, 'home.html')

def videoencrypt(request):
    print("Please Upload your files:\n")

    bucket = initialize_firebase()

    if not bucket:
        print("Firebase Storage not initialized properly.")
        return JsonResponse({"error": "Firebase Storage is not initialized."}, status=500)

    if request.method == 'POST':
        file = request.FILES.get('file')
        if file:
            formatfile = os.path.splitext(file.name)[1].lower()
            encryption = generate_key()
            encryptfile = encrypt_data(file.read(), encryption)
            Addfile = bucket.blob(f"Uploads/{file.name}")
            Addfile.upload_from_string(encryptfile)

            if formatfile in ['.mp4', '.mov', '.avi', '.webm', '.mkv', '.flv']:
                return HttpResponse(f"Uploaded Footage {file.name}")
            elif formatfile in ['.jpg', '.jpeg', '.png', 'pdf', '.tif', 'webp']:
                return HttpResponse(f"Uploaded Face profile {file.name}")
            elif formatfile in ['.txt', '.tsx']:
                return HttpResponse(f"Uploaded activity logs {file.name}")
            else:
                return JsonResponse({"message": "The type of file is not acceptable"}, status=400)
        else:
            return JsonResponse({"message": "The file you loaded is not acceptable"}, status=400)

    return render(request, 'home.html')

               
