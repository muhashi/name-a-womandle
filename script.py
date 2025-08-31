import pandas as pd
import json

# Load the CSV
df = pd.read_csv("notable_women.csv")

# Clean date to YYYY-MM-DD
df["birthDate"] = df["birthDate"].dropna().apply(lambda x: str(x)[:10])

# Group by person ID
people = {}
for _, row in df.iterrows():
    pid = row["person"]
    name = row["personLabel"]

    if not name or type(name) != str:
        continue

    if pid not in people:
        people[pid] = {
            "n": row["personLabel"],
            "a": set(),
            "d": row["birthDate"] if pd.notna(row["birthDate"]) else None,
            "c": row["countryLabel"] if pd.notna(row["countryLabel"]) else None,
            "j": set(),
            "w": row["article"][30:],
        }

    # Add alias if present
    if pd.notna(row["altName"]):
        people[pid]["a"].add(row["altName"])

    # Add occupation if present
    if pd.notna(row["occupationLabel"]):
        people[pid]["j"].add(row["occupationLabel"])

# Convert sets to sorted lists, keep occupations as a string if you prefer
output = []
for person in people.values():
    output.append({
        "n": person["n"],
        "a": list(person["a"]),
        "d": person["d"],
        "c": person["c"],
        "j": list(person["j"]),
        "w": person["w"],
    })

# Save to JSON
with open("notable_women.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, separators=(',', ':'))

print(f"Saved {len(output)} people to notable_women.json")
