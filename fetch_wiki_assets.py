import os
import requests
from io import BytesIO
from PIL import Image
import urllib.parse
import time

releases = [
    ("ae-ri-sakhi", "Subedaar"),
    ("choli-ke-peeche", "Crew (film)"),
    ("sona-kitna-sona-hai", "Crew (film)"),
    ("dar-ba-dar", "Crew (film)"),
    ("dupahiya", "Dupahiya"),
    ("gori-hai-kalaiyan", "Mere Husband Ki Biwi"),
    ("ishq-e-desi", "Jassi Weds Jassi"),
    ("chunnari-chunnari", "Hai Jawani Toh Ishq Hona Hai"),
    ("chaanta-tera", "Happy Patel Khatarnak Jasoos"),
    ("maa-behen", "Maa Behen"),
    ("shershaah", "Shershaah"),
    ("kesari", "Kesari (2019 film)"),
    ("runway-34", "Runway 34"),
    ("phillauri", "Phillauri (film)"),
    ("hichki", "Hichki"),
    ("maska", "Maska (2020 film)"),
    ("previous", "Maska (2020 film)"), # fallback
    ("sharafat-gayi-tel-lene", "Sharafat Gayi Tel Lene")
]

output_dir = "public/images/covers"
os.makedirs(output_dir, exist_ok=True)

def get_wiki_image(title):
    try:
        url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=pageimages&format=json&pithumbsize=1000"
        r = requests.get(url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'})
        data = r.json()
        pages = data.get("query", {}).get("pages", {})
        for k, v in pages.items():
            if "thumbnail" in v:
                return v["thumbnail"]["source"]
    except Exception as e:
        print(f"Failed to fetch wiki API for {title}: {e}")
    return None

def crop_center(image, min_dim):
    width, height = image.size
    left = (width - min_dim) / 2
    top = (height - min_dim) / 2
    right = (width + min_dim) / 2
    bottom = (height + min_dim) / 2
    return image.crop((left, top, right, bottom))

for id, title in releases:
    output_path = os.path.join(output_dir, f"{id}.jpg")
    print(f"Searching Wikipedia for: {title}")
    
    img_url = get_wiki_image(title)
    if img_url:
        print(f"Found image for {title}: {img_url}")
        try:
            response = requests.get(img_url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'})
            if response.status_code == 200:
                img = Image.open(BytesIO(response.content)).convert("RGB")
                
                # Resize and crop to 800x800 square
                min_dim = min(img.width, img.height)
                img = crop_center(img, min_dim)
                img = img.resize((800, 800), Image.Resampling.LANCZOS)
                
                img.save(output_path, quality=90)
                print(f"Saved {output_path}")
        except Exception as e:
            print(f"Failed to download image for {title}: {e}")
    else:
        print(f"No image found for {title}")
        
    time.sleep(1)

print("Done generating assets.")
