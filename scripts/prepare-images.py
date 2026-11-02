"""
Prepare source images for the website.

Reads the client's original files from ../recursos (outside the repo),
converts HEIC to JPEG, applies EXIF orientation, strips all metadata
(including GPS), resizes to a sane master size and writes them with
descriptive filenames into src/assets/. Astro then generates AVIF/WebP
responsive variants at build time.

Usage (from /website):  python scripts/prepare-images.py
Requires: pip install pillow pillow-heif
"""
from pathlib import Path

import math

from PIL import Image, ImageDraw, ImageEnhance, ImageFont, ImageOps
import pillow_heif

pillow_heif.register_heif_opener()

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT.parent / "recursos"
PHOTOS_SRC = SRC / "Quality Plus Building Services"
LOGO_SRC = SRC / "LOGO"
OUT_PHOTOS = ROOT / "src" / "assets" / "photos"
OUT_BRAND = ROOT / "src" / "assets" / "brand"
OUT_PUBLIC = ROOT / "public"

MAX_SIDE = 2000
INK = (20, 32, 46)

# original filename -> descriptive output name (without extension)
PHOTOS = {
    "1000001508.JPG": "team-member-mopping-retail-fitting-room-area",
    "30c6591c-2dcf-44d6-a192-31b33ef622e2.jpg.jpg": "restroom-fixture-cleaning-with-gloves",
    "3240b2c5-2088-48fc-ab8d-dd040d3c66d4_Original.jpg": "supervisor-checking-building-corridor",
    "351f75e4-6b16-4107-8d93-6dcf509905a3.jpg.jpg": "wet-floor-sign-service-corridor",
    "357252e0-c0ed-4752-8e07-bc3ec84610fd.jpg.jpg": "fitness-room-floor-mopping",
    "3e52aa7f-dbb3-4003-807f-142fc6dc7d04.jpg.jpg": "hallway-wall-spot-cleaning",
    "41156cb6-f2a1-482d-8a21-c0afdc56ac9e.jpg": "storefront-glass-cleaning-downtown-los-angeles",
    "5C41703B-BF43-445F-BFC2-A24AE063BB50_L0_001-11_30_2023, 11_06_19 AM.jpg.jpg": "restroom-counter-sanitizing",
    "691c6ce1-0975-4f50-8706-22746fa09f6c.jpg.jpg": "elevator-threshold-detail-cleaning",
    "7B83A1B9-4F26-419B-8F5A-262E8AA38C95.jpg.jpg": "exterior-archway-high-dusting",
    "7c435ef9-543a-49c6-a9b1-aac080db024d.jpg.jpg": "exit-sign-dusting",
    "8f7fc4c7-a66e-4af2-a005-c016ef15039b.JPG": "team-member-wiping-wall-quality-plus-shirt",
    "9c42bcf7-f292-4d22-b1fd-fa1de18d9971.jpg.jpg": "restroom-sink-cleaning",
    "IMG_1002.heic": "janitorial-cart-building-hallway",
    "IMG_1003_Original.jpg": "janitorial-cart-team-member-smiling",
    "IMG_1004.heic": "lobby-table-wiping",
    "IMG_1021.heic": "wall-art-dusting",
    "IMG_1149.jpg": "team-outdoor-cleanup-downtown-los-angeles",
    "IMG_1298.heic": "two-team-members-orange-wall",
    "IMG_1631.jpg.jpg": "restroom-floor-cleaning",
    "IMG_2037 2.heic.heic": "team-member-safety-gear-scissor-lift",
    "IMG_2042.heic.heic": "team-member-hard-hat-safety-vest",
    "IMG_2060.jpg": "office-team-with-karla-carpio",
    "IMG_2101 2.HEIC.HEIC": "team-member-safety-vest-loading-area",
    "IMG_2102 2.HEIC.HEIC": "floor-residue-scraping",
    "IMG_5079.HEIC": "power-washing-courtyard-wall",
    "IMG_5117.HEIC": "power-washing-patio-surface-cleaner",
    "PHOTO-2024-01-31-11-48-28.jpg.jpg": "patio-cafe-area-mopping",
    "PHOTO-2024-02-22-16-44-11 3.jpg.jpg": "team-member-mop-bucket-event-space",
    "PHOTO-2024-02-22-16-44-11.jpg.jpg": "door-frame-high-dusting",
    "WhatsApp Image 2023-10-24 at 9.20.06 AM.jpg.jpg": "floor-detail-scrubbing",
    "WhatsApp Image 2025-02-13 at 09.15.52 (1).jpg": "quality-plus-team-group-photo",
    "bc1d0c40-8578-4ecd-8e35-e2e24e187686.jpg.jpg": "two-team-members-mopping-commercial-space",
}


def grade(im: Image.Image) -> Image.Image:
    """
    House look so phone photos from different jobs read as one set:
    neutralize color casts, even out exposure, slightly muted and warm,
    with a gentle S-curve for depth.
    """
    im = ImageOps.autocontrast(im, cutoff=(0.6, 0.4), preserve_tone=False)
    im = ImageEnhance.Color(im).enhance(0.86)
    curve = [round(255 * (0.5 - 0.5 * math.cos(math.pi * (i / 255)))) * 0.28 + i * 0.72 for i in range(256)]
    r_lut = [min(255, round(v * 1.025 + 2)) for v in curve]
    g_lut = [min(255, round(v)) for v in curve]
    b_lut = [min(255, round(v * 0.965)) for v in curve]
    return im.point(r_lut + g_lut + b_lut)


def clean_copy(im: Image.Image, graded: bool = True) -> Image.Image:
    """Return a metadata-free RGB copy with orientation applied (and the house grade)."""
    im = ImageOps.exif_transpose(im).convert("RGB")
    im.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
    fresh = Image.new("RGB", im.size)
    fresh.paste(im)
    return grade(fresh) if graded else fresh


def recolor_for_light(src: Path, dest: Path) -> None:
    """Swap the logo's light grey/white parts to ink so it reads on light backgrounds."""
    im = Image.open(src).convert("RGBA")
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a and max(r, g, b) - min(r, g, b) < 18 and r > 150:
                px[x, y] = (*INK, a)
    im.save(dest, optimize=True)


def main() -> None:
    OUT_PHOTOS.mkdir(parents=True, exist_ok=True)
    OUT_BRAND.mkdir(parents=True, exist_ok=True)

    for name, slug in PHOTOS.items():
        src = PHOTOS_SRC / name
        if not src.exists():
            print(f"missing: {name}")
            continue
        out = OUT_PHOTOS / f"{slug}.jpg"
        clean_copy(Image.open(src)).save(out, "JPEG", quality=84, optimize=True, progressive=True)
        print(f"photo  {out.name}")

    # Logos: dark-background original + light-background recolor
    full = LOGO_SRC / "Quality-Plus-BuildingRecurso 47.png"
    Image.open(full).save(OUT_BRAND / "logo-on-dark.png", optimize=True)
    recolor_for_light(full, OUT_BRAND / "logo-on-light.png")
    Image.open(LOGO_SRC / "quality-plus-Logo-v2.png").save(OUT_BRAND / "logo-white.png", optimize=True)
    print("brand  logos")

    # Favicon/app icons from the orange "Q" of the wordmark
    mark = Image.open(full).convert("RGBA")
    q = mark.crop((0, 120, 120, 260))  # the "Q" glyph area of the 518x315 wordmark
    qpx = q.load()
    for y in range(q.height):  # keep only the orange glyph, drop skyline strokes
        for x in range(q.width):
            r, g, b, a = qpx[x, y]
            if not (r > 200 and g < 160 and b < 110):
                qpx[x, y] = (0, 0, 0, 0)
    q = q.crop(q.getbbox())
    for size, fname in ((512, "icon-512.png"), (180, "apple-touch-icon.png"), (32, "favicon-32.png")):
        canvas = Image.new("RGBA", (size, size), (*INK, 255))
        scale = size * 0.72 / max(q.size)
        inner = q.resize((round(q.width * scale), round(q.height * scale)), Image.LANCZOS)
        canvas.paste(inner, ((size - inner.width) // 2, (size - inner.height) // 2), inner)
        canvas.save(OUT_PUBLIC / fname, optimize=True)
    print("public icons")

    # Social preview (1200x630)
    team = clean_copy(Image.open(PHOTOS_SRC / "WhatsApp Image 2025-02-13 at 09.15.52 (1).jpg"))
    og = ImageOps.fit(team, (1200, 630), Image.LANCZOS, centering=(0.5, 0.45))
    shade = Image.new("RGBA", og.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(shade)
    for x in range(1200):
        alpha = int(235 * max(0.0, 1 - x / 820))
        d.line([(x, 0), (x, 630)], fill=(*INK, alpha))
    og = Image.alpha_composite(og.convert("RGBA"), shade)
    logo = Image.open(OUT_BRAND / "logo-on-dark.png").convert("RGBA")
    logo.thumbnail((380, 380), Image.LANCZOS)
    og.paste(logo, (64, 70), logo)
    try:
        font = ImageFont.truetype("arialbd.ttf", 46)
    except OSError:
        font = ImageFont.load_default()
    ImageDraw.Draw(og).multiline_text(
        (64, 380), "Commercial Cleaning\nin Los Angeles", font=font, fill=(255, 255, 255), spacing=10
    )
    og.convert("RGB").save(OUT_PUBLIC / "og-image.jpg", "JPEG", quality=85, optimize=True)
    print("public og-image.jpg")


if __name__ == "__main__":
    main()
