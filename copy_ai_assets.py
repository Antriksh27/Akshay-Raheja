import os
import shutil

source_dir = r"C:\Users\antri\.gemini\antigravity-ide\brain\1de4343d-60f0-4866-b3d0-7f134d44f104"
dest_dir = r"c:\Users\antri\OneDrive\Desktop\MAIN\Akshay Raheja\public\images\covers"

# Map generated image files to destination tracks
mapping = {
    # We will search for files starting with the prefix in source_dir
    "subedaar_cover_": ["ae-ri-sakhi.jpg"],
    "crew_cover_": ["choli-ke-peeche.jpg", "sona-kitna-sona-hai.jpg", "dar-ba-dar.jpg"],
    "dupahiya_cover_": ["dupahiya.jpg", "chaanta-tera.jpg"],
    "gori_hai_kalaiyan_cover_": ["gori-hai-kalaiyan.jpg", "ishq-e-desi.jpg", "chunnari-chunnari.jpg"],
    "shershaah_cover_": ["shershaah.jpg", "kesari.jpg"], # kesari failed generation, use shershaah
    "runway34_cover_": ["runway-34.jpg", "phillauri.jpg"],
    "abstract_cover_": ["maa-behen.jpg", "hichki.jpg", "maska.jpg", "previous.jpg", "sharafat-gayi-tel-lene.jpg"]
}

# Find exact filenames in source_dir
source_files = os.listdir(source_dir)

for prefix, dest_files in mapping.items():
    # find the matching source file
    match = next((f for f in source_files if f.startswith(prefix) and f.endswith(".png")), None)
    if match:
        src_path = os.path.join(source_dir, match)
        for dest in dest_files:
            dest_path = os.path.join(dest_dir, dest)
            shutil.copy2(src_path, dest_path)
            print(f"Copied {match} to {dest}")
    else:
        print(f"Could not find source file for prefix {prefix}")

print("Done copying high quality assets!")
