from PIL import Image
import pytesseract

print(pytesseract.image_to_string(Image.open('ashish.png')))


print(pytesseract.image_to_string(Image.open('download.png'), config='--psm 10 --oem 3 -c tessedit_char_whitelist=0123456789'))

