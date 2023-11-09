from cryptography.fernet import Fernet
import hashlib

def saveFiles(mapString, imgBytes):
    key = Fernet.generate_key()
    cipher = Fernet(key)
    with open('results/key.key', 'wb') as file:
        file.write(key)

    with open('results/map.json.enc', 'wb') as file:
        encString = cipher.encrypt(mapString.encode('utf-8'))
        file.write(encString)

    output = ''
    with open('results/graphPlot.png.enc', 'wb') as file:
        encodedImgBytes = cipher.encrypt(imgBytes)
        output += (f"Original image bytes : {hashlib.sha256(imgBytes).hexdigest()}\n")
        output += (f"Encrypted image bytes: {hashlib.sha256(encodedImgBytes).hexdigest()}\n")
        file.write(encodedImgBytes)

        with open('results/hashResults.txt', 'w') as file:
            file.write(output)

    print(f"DONE WRITING ECNRYPTED FILES!")

