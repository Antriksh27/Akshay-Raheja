from PIL import Image, ImageDraw, ImageFont
import os
import random

releases = [
    ("ae-ri-sakhi", "SUBEDAAR", "Ae Ri Sakhi"),
    ("choli-ke-peeche", "CREW", "Choli Ke"),
    ("sona-kitna-sona-hai", "CREW", "Sona Kitna"),
    ("dar-ba-dar", "CREW", "Dar Ba Dar"),
    ("dupahiya", "DUPAHIYA", "Original"),
    ("gori-hai-kalaiyan", "M.H.K.B", "Gori Hai"),
    ("ishq-e-desi", "JASSI", "Ishq-E-Desi"),
    ("chunnari-chunnari", "H.J.T.I.H", "Chunnari"),
    ("chaanta-tera", "HAPPY PATEL", "Chaanta Tera"),
    ("maa-behen", "MAA BEHEN", "EP"),
    ("shershaah", "SHERSHAAH", "Original Score"),
    ("kesari", "KESARI", "Original Score"),
    ("runway-34", "RUNWAY 34", "Original Score"),
    ("phillauri", "PHILLAURI", "Original Score"),
    ("hichki", "HICHKI", "Original Score"),
    ("maska", "MASKA", "Original Score"),
    ("previous", "PREVIOUS", "Archive"),
    ("sharafat-gayi-tel-lene", "SHARAFAT", "Original Score")
]

output_dir = "public/images/covers"
os.makedirs(output_dir, exist_ok=True)

width, height = 1000, 1000

# Color palettes for a "stark, high-contrast, modern-luxury aesthetic"
palettes = [
    ("#0a0a0a", "#333333", "#ffffff"), # Deep black, charcoal, stark white
    ("#11151c", "#212d40", "#d6e0f0"), # Slate blue
    ("#0d0d0d", "#4a4a4a", "#f0f0f0"), # Grayscale
    ("#080808", "#1c1c1c", "#e0e0e0"), # Almost black
    ("#121212", "#2a2a2a", "#cccccc"), # Muted
]

for id, title, sub in releases:
    # Deterministic randomness based on id
    random.seed(id)
    bg_color, accent_color, text_color = random.choice(palettes)
    
    img = Image.new("RGB", (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Draw a stark geometric shape
    shape_type = random.choice(["circle", "rect", "line", "poly"])
    
    if shape_type == "circle":
        r = random.randint(200, 400)
        cx, cy = width/2, height/2 - 50
        draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=accent_color)
    elif shape_type == "rect":
        w = random.randint(300, 600)
        h = random.randint(300, 600)
        cx, cy = width/2, height/2 - 50
        draw.rectangle([cx-w/2, cy-h/2, cx+w/2, cy+h/2], fill=accent_color)
    elif shape_type == "line":
        draw.line([200, height/2, 800, height/2], fill=accent_color, width=random.randint(10, 50))
    else:
        # Polygon
        pts = [
            (random.randint(100, 900), random.randint(100, 800)),
            (random.randint(100, 900), random.randint(100, 800)),
            (random.randint(100, 900), random.randint(100, 800))
        ]
        draw.polygon(pts, fill=accent_color)
        
    # Draw some noise/grain
    for _ in range(5000):
        x = random.randint(0, width-1)
        y = random.randint(0, height-1)
        draw.point((x,y), fill=(random.randint(0,50), random.randint(0,50), random.randint(0,50)))
        
    output_path = os.path.join(output_dir, f"{id}.jpg")
    img.save(output_path, quality=90)
    print(f"Generated {output_path}")

print("Done generating assets.")
