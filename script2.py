import json
import unicodedata
import zlib

def normalize_name(name: str) -> str:
    """
    Lowercase, strip, and replace accented characters
    with closest ASCII equivalents (ł -> l, é -> e, etc.)
    """
    if not name:
        return ""
    # Normalize to NFKD and drop accents
    normalized = unicodedata.normalize("NFKD", name)
    ascii_str = "".join([c for c in normalized if not unicodedata.combining(c)])
    return ascii_str.lower().strip()

def build_lookup(input_file: str, output_file: str):
    with open(input_file, "r", encoding="utf-8") as f:
        people = json.load(f)

    lookup = {}

    for person in people:
        # Extract main fields
        name = person.get("n")
        aliases = person.get("a", [])
        birth_date = person.get("d")
        country = person.get("c")
        occupations = person.get("j", [])
        wikipedia = person.get("w")

        # Base object
        entry = {
            "n": name,
            "d": birth_date,
            "c": country,
            "j": occupations,
            "w": wikipedia
        }

        # Add main name
        if name:
            norm_name = normalize_name(name)
            lookup[norm_name] = entry

        # Add aliases
        for alias in aliases:
            norm_alias = normalize_name(alias)
            if norm_alias and norm_alias not in lookup:
                lookup[norm_alias] = entry

    json_data = json.dumps(lookup, ensure_ascii=False, separators=(',', ':'))
    compressed_data = zlib.compress(json_data.encode("utf-8"), level=9)

    with open("src/data/" + output_file, "w", encoding="utf-8") as f:
        json.dump(lookup, f, ensure_ascii=False, separators=(',', ':'))

    # Save compressed file
    # with open(output_file + ".zlib", "wb") as f:
        # f.write(compressed_data)

    # print("Compressed lookup dictionary saved as notable_women.json.zlib")
    print(f"Original size: {len(json_data.encode('utf-8')) / 1024 / 1024:.2f} MB")
    # print(f"Compressed size: {len(compressed_data) / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    build_lookup("notable_women.json", "notable_women_lookup.json")
