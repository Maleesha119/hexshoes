import sys
import json
import torch
import open_clip
from PIL import Image

print("Loading CLIP model...")
model, _, preprocess = open_clip.create_model_and_transforms(
    'ViT-B-32', pretrained='openai'
)
model.eval()

def get_embedding(image_path):
    image = Image.open(image_path).convert("RGB")
    image_input = preprocess(image).unsqueeze(0)
    with torch.no_grad():
        embedding = model.encode_image(image_input)
        embedding = embedding / embedding.norm(dim=-1, keepdim=True)
    return embedding.squeeze()

def cosine_similarity(a, b):
    return torch.dot(a, b).item()

# Load the catalog
with open("catalog_embeddings.json", "r") as f:
    catalog = json.load(f)

# Get the query image path from the command line
query_path = sys.argv[1]
query_embedding = get_embedding(query_path)

# Compare against every catalog item
results = []
for item in catalog:
    catalog_embedding = torch.tensor(item["embedding"])
    score = cosine_similarity(query_embedding, catalog_embedding)
    results.append((item["filename"], score))

# Sort by highest similarity first
results.sort(key=lambda x: x[1], reverse=True)

print(f"\nTop matches for {query_path}:\n")
for filename, score in results[:5]:
    print(f"  {filename}  —  {score:.4f}")