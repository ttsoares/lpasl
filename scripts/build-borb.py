"""Splits brand/borb-source.png into a left and a right wing for the flap animation.

The source is a 640x480 RGBA sketch with the butterfly (~100x114px) in the middle.
We clean the grey fringe, upsample, rotate so the body is vertical, and cut along
the body. The page rotates the pair back (BODY_TILT) and squeezes each wing
toward the body. Run: python3 scripts/build-borb.py
"""
from PIL import Image
import numpy as np
from scipy import ndimage

SRC = "brand/borb-source.png"
OUT = "public/brand/"
BODY_TILT = 23.5          # degrees the body leans from vertical (top to the right)
BODY_POINT = (308.3, 188.3)  # a point on the body axis, in source pixels
SCALE = 3

im = Image.open(SRC).convert("RGBA")

# Grey/white pixels are the sketch's halo; the outline is black and the wings amber.
a = np.array(im)
rgb = a[..., :3].astype(int)
chroma = rgb.max(axis=2) - rgb.min(axis=2)
luma = (0.2126 * rgb[..., 0] + 0.7152 * rgb[..., 1] + 0.0722 * rgb[..., 2])
halo = (chroma < 30) & (luma > 90)
a[halo, 3] = 0
a[a[..., 3] < 24, 3] = 0

# Keep only the butterfly: drop specks that are not part of the biggest blob
# (grown a little so the antennae, which nearly touch the wings, stay).
solid = a[..., 3] > 0
labels, count = ndimage.label(ndimage.binary_dilation(solid, iterations=3))
if count > 1:
    sizes = ndimage.sum(solid, labels, range(1, count + 1))
    a[labels != 1 + int(np.argmax(sizes))] = 0
im = Image.fromarray(a)

# Work on a big square canvas with the body point at its centre, then rotate.
pad = 700
canvas = Image.new("RGBA", (pad, pad), (0, 0, 0, 0))
big = im.resize((im.width * SCALE, im.height * SCALE), Image.LANCZOS)
cx, cy = BODY_POINT[0] * SCALE, BODY_POINT[1] * SCALE
canvas.paste(big, (int(pad / 2 - cx), int(pad / 2 - cy)))
canvas = canvas.rotate(BODY_TILT, resample=Image.BICUBIC)  # counter-clockwise

box = canvas.getchannel("A").getbbox()
half = max(pad // 2 - box[0], box[2] - pad // 2)
top, bottom = box[1], box[3]

left = canvas.crop((pad // 2 - half, top, pad // 2, bottom))
right = canvas.crop((pad // 2, top, pad // 2 + half, bottom))
left.save(OUT + "borb-left.png", optimize=True)
right.save(OUT + "borb-right.png", optimize=True)
print("wing size", left.size, "tilt", BODY_TILT)
