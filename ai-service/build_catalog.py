import os
import json
import torch
import open_clip
from PIL import Image

# Load the pretrained CLIP model
print("Loading CLIP model... (this may take a minute the first time)")
model, _, preprocess = open_clip.create_model_and_transforms(
    'ViT-B-32', pretrained='openai'
)
model.eval()

CATALOG_DIR = "catalog_images"
OUTPUT_FILE = "catalog_embeddings.json"

catalog_data = []

image_files = [f for f in os.listdir(CATALOG_DIR) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
print(f"Found {len(image_files)} images to process.")

for filename in image_files:
    path = os.path.join(CATALOG_DIR, filename)
    image = Image.open(path).convert("RGB")
    image_input = preprocess(image).unsqueeze(0)

    with torch.no_grad():
        embedding = model.encode_image(image_input)
        embedding = embedding / embedding.norm(dim=-1, keepdim=True)

    catalog_data.append({
        "filename": filename,
        "embedding": embedding.squeeze().tolist()
    })
    print(f"Processed {filename}")

with open(OUTPUT_FILE, "w") as f:
    json.dump(catalog_data, f)

print(f"\nDone. Saved {len(catalog_data)} embeddings to {OUTPUT_FILE}")