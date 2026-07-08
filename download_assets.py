import os
import requests
from io import BytesIO
from PIL import Image
from duckduckgo_search import DDGS
import time

releases = [
    ("ae-ri-sakhi", "Subedaar movie poster 2024"),
    ("choli-ke-peeche", "Crew movie 2024 poster"),
    ("sona-kitna-sona-hai", "Crew movie 2024 poster"),
    ("dar-ba-dar", "Crew movie 2024 poster"),
    ("dupahiya", "Dupahiya web series poster"),
    ("gori-hai-kalaiyan", "Mere Husband Ki Biwi movie poster"),
    ("ishq-e-desi", "Jassi Weds Jassi movie poster"),
    ("chunnari-chunnari", "Hai Jawani Toh Ishq Hona Hai movie poster"),
    ("chaanta-tera", "Happy Patel Khatarnak Jasoos movie poster"),
    ("maa-behen", "Maa Behen movie poster"),
    ("shershaah", "Shershaah movie poster"),
    ("kesari", "Kesari movie poster"),
    ("runway-34", "Runway 34 movie poster"),
    ("phillauri", "Phillauri movie poster"),
    ("hichki", "Hichki movie poster"),
    ("maska", "Maska movie poster 2020"),
    ("previous", "abstract cinematic dark texture"),
    ("sharafat-gayi-tel-lene", "Sharafat Gayi Tel Lene movie poster")
]

output_dir = "public/images/covers"
os.makedirs(output_dir, exist_ok=True)

def crop_center(image, min_dim):
    width, height = image.size
    left = (width - min_dim) / 2
    top = (height - min_dim) / 2
    right = (width + min_dim) / 2
    bottom = (height + min_dim) / 2
    return image.crop((left, top, right, bottom))

with DDGS() as ddgs:
    for id, query in releases:
        output_path = os.path.join(output_dir, f"{id}.jpg")
        if os.path.exists(output_path):
            print(f"Skipping {id}, already exists.")
            continue
            
        print(f"Searching for: {query}")
        try:
            results = list(ddgs.images(query, max_results=3))
            
            if not results:
                print(f"No results for {query}")
                continue
                
            for res in results:
                url = res.get("image")
                try:
                    response = requests.get(url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'})
                    if response.status_code == 200:
                        img = Image.open(BytesIO(response.content)).convert("RGB")
                        
                        # Resize and crop to 800x800 square
                        min_dim = min(img.width, img.height)
                        img = crop_center(img, min_dim)
                        img = img.resize((800, 800), Image.Resampling.LANCZOS)
                        
                        img.save(output_path, quality=85)
                        print(f"Saved {output_path}")
                        break
                except Exception as e:
                    print(f"Failed to download {url}: {e}")
            
            time.sleep(1) # sleep to avoid rate limiting
        except Exception as e:
            print(f"Error searching {query}: {e}")

print("Done!")
