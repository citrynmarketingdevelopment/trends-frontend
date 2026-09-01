"""Prepare the immutable Illustrator glTF for deterministic web optimization.

Run with Blender 5.2 in factory-startup mode. The script removes only zero-area
faces, consolidates identical material assignments, joins static meshes, bakes
the mark upright, writes a working .blend, exports an uncompressed GLB candidate,
and renders the final hero camera plus four audit angles.
"""

from __future__ import annotations

import hashlib
import json
import math
import sys
from pathlib import Path

import bpy
import bmesh
from mathutils import Vector


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest().upper()


def look_at(camera: bpy.types.Object, target: Vector) -> None:
    camera.rotation_euler = (target - camera.location).to_track_quat("-Z", "Y").to_euler()


def render_preview(
    scene: bpy.types.Scene,
    camera: bpy.types.Object,
    target: Vector,
    location: tuple[float, float, float],
    output: Path,
) -> None:
    camera.location = location
    look_at(camera, target)
    scene.render.filepath = str(output)
    bpy.ops.render.render(write_still=True)


def main() -> None:
    arguments = sys.argv[sys.argv.index("--") + 1 :]
    if len(arguments) != 5:
        raise SystemExit(
            "Expected: <source.gltf> <working.blend> <candidate.glb> <preview-dir> <report.json>"
        )

    source, working, candidate, preview_dir, report_path = (
        Path(argument).resolve() for argument in arguments
    )
    for directory in (working.parent, candidate.parent, preview_dir, report_path.parent):
        directory.mkdir(parents=True, exist_ok=True)

    source_hash_before = sha256(source)

    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablocks in (bpy.data.meshes, bpy.data.materials, bpy.data.images):
        for datablock in list(datablocks):
            datablocks.remove(datablock)

    bpy.ops.import_scene.gltf(filepath=str(source), import_pack_images=True)
    meshes = [obj for obj in bpy.context.scene.objects if obj.type == "MESH"]
    if not meshes:
        raise RuntimeError("The source glTF did not contain any mesh objects.")

    before_objects = len(meshes)
    before_vertices = sum(len(obj.data.vertices) for obj in meshes)
    for obj in meshes:
        obj.data.calc_loop_triangles()
    before_triangles = sum(len(obj.data.loop_triangles) for obj in meshes)
    material_count_before = len(bpy.data.materials)
    image_count_before = len(bpy.data.images)

    removed_zero_area = 0
    for obj in meshes:
        mesh = obj.data
        degenerate_indices = {
            polygon.index for polygon in mesh.polygons if polygon.area <= 1e-12
        }
        bm = bmesh.new()
        bm.from_mesh(mesh)
        bm.faces.ensure_lookup_table()
        # Blender's evaluated polygon areas identify the 251 Illustrator slivers
        # consistently. BMesh recomputes two of them just above this threshold,
        # so preserve the original polygon-index selection through deletion.
        degenerate = [face for face in bm.faces if face.index in degenerate_indices]
        removed_zero_area += len(degenerate)
        if degenerate:
            bmesh.ops.delete(bm, geom=degenerate, context="FACES")
        bm.to_mesh(mesh)
        bm.free()
        mesh.update(calc_edges=True)

    canonical = meshes[0].data.materials[0] if meshes[0].data.materials else None
    if canonical is None:
        raise RuntimeError("The source glTF did not contain an assigned material.")
    canonical.name = "TrendsLogoMaterial"

    for obj in meshes:
        material_slots = obj.data.materials
        material_slots.clear()
        material_slots.append(canonical)
        for polygon in obj.data.polygons:
            polygon.material_index = 0

    bpy.ops.object.select_all(action="DESELECT")
    for obj in meshes:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = meshes[0]
    bpy.ops.object.join()
    logo = bpy.context.view_layer.objects.active
    if logo is None:
        raise RuntimeError("Mesh join did not produce an active object.")
    logo.name = "TrendsLogo"
    logo.data.name = "TrendsLogoMesh"

    logo.rotation_euler.x = math.radians(90)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)

    world_corners = [logo.matrix_world @ Vector(corner) for corner in logo.bound_box]
    minimum = Vector((min(v.x for v in world_corners), min(v.y for v in world_corners), min(v.z for v in world_corners)))
    maximum = Vector((max(v.x for v in world_corners), max(v.y for v in world_corners), max(v.z for v in world_corners)))
    center = (minimum + maximum) * 0.5
    logo.location -= Vector((center.x, center.y, minimum.z))
    bpy.ops.object.transform_apply(location=True, rotation=False, scale=False)

    bpy.ops.wm.save_as_mainfile(filepath=str(working), compress=True)

    bpy.ops.object.select_all(action="DESELECT")
    logo.select_set(True)
    bpy.context.view_layer.objects.active = logo
    bpy.ops.export_scene.gltf(
        filepath=str(candidate),
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_yup=True,
        export_materials="EXPORT",
        export_image_format="AUTO",
        export_texcoords=True,
        export_normals=True,
        export_tangents=True,
        export_animations=False,
        export_cameras=False,
        export_lights=False,
        export_extras=False,
        export_unused_images=False,
        export_unused_textures=False,
        export_meshopt_compression_enable=False,
        export_draco_mesh_compression_enable=False,
    )

    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE"
    scene.render.resolution_x = 1200
    scene.render.resolution_y = 1200
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.film_transparent = True
    scene.render.image_settings.color_depth = "8"
    scene.view_settings.look = "AgX - Medium High Contrast"

    camera_data = bpy.data.cameras.new("HeroCamera")
    camera = bpy.data.objects.new("HeroCamera", camera_data)
    scene.collection.objects.link(camera)
    scene.camera = camera
    camera.data.lens = 62

    dimensions = logo.dimensions
    target = Vector((0, 0, dimensions.z * 0.48))
    distance = max(dimensions.x, dimensions.z) * 2.55

    world = bpy.data.worlds.new("TrendsStudioWorld") if not bpy.data.worlds else bpy.data.worlds[0]
    scene.world = world
    world.use_nodes = True
    background = world.node_tree.nodes.get("Background") if world.node_tree else None
    if background:
        background.inputs[0].default_value = (0.008, 0.008, 0.01, 1)
        background.inputs[1].default_value = 0.12

    for name, energy, location, color, size in (
        ("Key", 520, (-1.2, -1.3, 1.1), (1.0, 0.82, 0.62), 2.2),
        ("Fill", 310, (1.4, -0.7, 0.7), (0.75, 0.82, 1.0), 1.6),
        ("Rim", 440, (0.1, 0.9, 1.2), (0.78, 0.18, 0.12), 1.5),
    ):
        light_data = bpy.data.lights.new(name, "AREA")
        light_data.energy = energy
        light_data.color = color
        light_data.shape = "DISK"
        light_data.size = size
        light = bpy.data.objects.new(name, light_data)
        light.location = location
        look_at(light, target)
        scene.collection.objects.link(light)

    previews = {
        "hero": (distance * 0.2, -distance, target.z * 1.08),
        "front": (0, -distance, target.z),
        "right": (distance, 0, target.z),
        "back": (0, distance, target.z),
        "left": (-distance, 0, target.z),
    }
    for name, location in previews.items():
        render_preview(scene, camera, target, location, preview_dir / f"trends-logo-{name}.png")

    logo.data.calc_loop_triangles()
    after_vertices = len(logo.data.vertices)
    after_triangles = len(logo.data.loop_triangles)
    dimensions = tuple(round(value, 9) for value in logo.dimensions)
    source_hash_after = sha256(source)
    if source_hash_after != source_hash_before:
        raise RuntimeError("Immutable source hash changed during processing.")

    report = {
        "assetClass": "HERO PROP",
        "blenderVersion": bpy.app.version_string,
        "source": {
            "path": str(source.resolve()),
            "bytes": source.stat().st_size,
            "sha256": source_hash_before,
            "postProcessSha256": source_hash_after,
        },
        "before": {
            "meshObjects": before_objects,
            "vertices": before_vertices,
            "triangles": before_triangles,
            "materials": material_count_before,
            "images": image_count_before,
        },
        "cleanup": {
            "zeroAreaFacesRemoved": removed_zero_area,
            "validNormalsRecalculated": False,
            "joinedStaticMeshes": True,
            "uprightTransformBaked": True,
        },
        "candidate": {
            "path": str(candidate.resolve()),
            "bytes": candidate.stat().st_size,
            "sha256": sha256(candidate),
            "meshObjects": 1,
            "vertices": after_vertices,
            "triangles": after_triangles,
            "materials": 1,
            "dimensionsBlenderXYZ": dimensions,
        },
        "workingBlend": str(working.resolve()),
        "previews": {name: str((preview_dir / f"trends-logo-{name}.png").resolve()) for name in previews},
    }
    report_path.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
