import firebase_admin 
from firebase_admin import credentials, storage

def initialize_firebase():
    try:
        cred = credentials.Certificate("/home/eli/AISecRaspberryPI/secureguard/src/myproject/encryption/raspberry-3cca4-firebase-adminsdk-fbsvc-5b718d579c.json")
  
        if not firebase_admin._apps:
            firebase_admin.initialize_app(cred, {
                'storageBucket': 'raspberry-3cca4.firebasestorage.app'
            })
            print("Firebase Initialized successfully.")
        else:
            print("Firebase app already initialized.")

        bucket = storage.bucket()
        if bucket:
            print("Initialized successfully.")
            return bucket
        else:
            print("Failed to initialize.")
            return None
    except Exception as e:
        print(f"Error: {e}")
        return None


