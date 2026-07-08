import re

file_path = "lib/data/releases.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# We want to replace coverArtPath: "/images/covers/placeholder.jpg",
# with coverArtPath: f"/images/covers/{id}.jpg",
# For this we need to find the id of each block.

# Find all occurrences of id: "...",
pattern = r'id:\s*"([^"]+)",(.*?)(coverArtPath:\s*)"/images/covers/placeholder\.jpg"'

# We need a re.sub with a function
def replacer(match):
    id_val = match.group(1)
    middle = match.group(2)
    prop = match.group(3)
    return f'id: "{id_val}",{middle}{prop}"/images/covers/{id_val}.jpg"'

new_content = re.sub(pattern, replacer, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Updated releases.ts")
