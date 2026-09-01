"""Report degenerate-area thresholds for the immutable Trends logo source."""

from __future__ import annotations

import sys
from pathlib import Path

import bpy
import bmesh


source = Path(sys.argv[sys.argv.index("--") + 1]).resolve()
bpy.ops.import_scene.gltf(filepath=str(source))
areas = [
    polygon.area
    for obj in bpy.context.scene.objects
    if obj.type == "MESH"
    for polygon in obj.data.polygons
]
thresholds = (1e-14, 1e-12, 1e-10, 1e-9, 1e-8, 1e-7, 1e-6)
print({threshold: sum(area <= threshold for area in areas) for threshold in thresholds})
print({"minimumArea": min(areas), "triangles": len(areas)})

bmesh_areas = []
for obj in bpy.context.scene.objects:
    if obj.type != "MESH":
        continue
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    bmesh_areas.extend(face.calc_area() for face in bm.faces)
    bm.free()
print({threshold: sum(area <= threshold for area in bmesh_areas) for threshold in thresholds})
print(sorted(bmesh_areas)[:260][-15:])
