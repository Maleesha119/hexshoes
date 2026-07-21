from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import torch
import open_clip
import json
from PIL import Image
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading CLIP model...")
model, _, preprocess = open_clip.create_model_and_transforms(
    'ViT-B-32', pretrained='openai'
)
model.eval()

with open("catalog_embeddings.json", "r") as f:
    catalog = json.load(f)

def get_embedding_from_bytes(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image_input = preprocess(image).unsqueeze(0)
    with torch.no_grad():
        embedding = model.encode_image(image_input)
        embedding = embedding / embedding.norm(dim=-1, keepdim=True)
    return embedding.squeeze()

def cosine_similarity(a, b):
    return torch.dot(a, b).item()

@app.post("/search")
async def search(file: UploadFile = File(...)):
    image_bytes = await file.read()
    query_embedding = get_embedding_from_bytes(image_bytes)

    results = []
    for item in catalog:
        catalog_embedding = torch.tensor(item["embedding"])
        score = cosine_similarity(query_embedding, catalog_embedding)
        results.append({"filename": item["filename"], "score": round(score, 4)})

    results.sort(key=lambda x: x["score"], reverse=True)
    return {"matches": results[:5]}