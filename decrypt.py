from cryptography.fernet import Fernet
import hashlib

def decrypt():
    with open('results/key.key', 'rb') as file:
        key = file.read()
        cipher = Fernet(key)

    # Decode json map
    with open('results/map.json.enc', 'rb') as file:
        mapStringEnc = file.read()
        mapString = cipher.decrypt(mapStringEnc).decode('utf-8')

    with open('results/map.json', 'w') as file:
        file.write(mapString)


    # Decode image
    with open('results/graphPlot.png.enc', 'rb') as file:
        imgBytesEnc = file.read()
        imgBytes = cipher.decrypt(imgBytesEnc)
        print(f"Decrypted bytes: {hashlib.sha256(imgBytes).hexdigest()}")
        print(f"Encrypted bytes: {hashlib.sha256(imgBytesEnc).hexdigest()}")

    with open('results/graphPlot.png', 'wb') as file:
        file.write(imgBytes)

    print(f"DONE WRITING DECRYPTED FILES!")


decrypt()
