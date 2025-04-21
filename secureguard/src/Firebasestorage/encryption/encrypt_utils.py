# encrypt_utils.py

from cryptography.fernet import Fernet

# Generate a key for encryption
def generate_key():
    """
    Generates a new key using Fernet for encryption and decryption.
    Returns:
        str: The generated key.
    """
    return Fernet.generate_key()

# Encrypt data using the given key
def encrypt_data(data, key):
    """
    Encrypts the given data using the provided key.
    Args:
        data (bytes): The data to be encrypted.
        key (bytes): The key used for encryption.
    Returns:
        bytes: The encrypted data.
    """
    fernet = Fernet(key)  # Initialize Fernet encryption system with the provided key
    encrypted_data = fernet.encrypt(data)  # Encrypt the data
    return encrypted_data

# Decrypt data using the given key
def decrypt_data(encrypted_data, key):
    """
    Decrypts the encrypted data using the provided key.
    Args:
        encrypted_data (bytes): The encrypted data.
        key (bytes): The key used for decryption.
    Returns:
        bytes: The decrypted data.
    """
    fernet = Fernet(key)  # Initialize Fernet encryption system with the provided key
    decrypted_data = fernet.decrypt(encrypted_data)  # Decrypt the data
    return decrypted_data
