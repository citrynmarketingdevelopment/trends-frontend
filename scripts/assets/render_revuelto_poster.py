"""Render the verified web Revuelto GLB as the progressive-enhancement poster."""

from __future__ import annotations

import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector


def look_at(obj: bpy.types.Object, target: Vector) -> None:
    obj.rotation_euler = (target - obj.location).to_track_quat("-Z", "Y").to_euler()


source, output = (Path(value).resolve() for value in sys.argv[sys.argv.index("--") + 1 :])
output.parent.mkdir(parents=True, exist_ok=True)

bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.gltf(filepath=str(source), import_pack_images=True)

imported = list(bpy.context.scene.objects)
meshes = [obj for obj in imported if obj.type == "MESH"]
if not meshes:
    raise RuntimeError("The Revuelto GLB did not contain meshes.")

root = bpy.data.objects.new("RevueltoPosterRoot", None)
bpy.context.scene.collection.objects.link(root)
top_level = [obj for obj in imported if obj.parent is None]
for obj in top_level:
    obj.parent = root

corners = [obj.matrix_world @ Vector(corner) for obj in meshes for corner in obj.bound_box]
minimum = Vector((min(v.x for v in corners), min(v.y for v in corners), min(v.z for v in corners)))
maximum = Vector((max(v.x for v in corners), max(v.y for v in corners), max(v.z for v in corners)))
center = (minimum + maximum) * 0.5
size = maximum - minimum
scale = 5.05 / max(size.x, size.y)
root.scale = (scale, scale, scale)
root.location = Vector((-center.x * scale, -center.y * scale, -minimum.z * scale + 0.045))
bpy.context.view_layer.update()

for material in bpy.data.materials:
    name = material.name.lower()
    if "vehicle_generic_smallspecmap [primary]" not in name:
        continue
    material.diffuse_color = (0.09, 0.008, 0.012, 1)
    material.metallic = 0.12
    material.roughness = 0.24
    if material.use_nodes and material.node_tree:
        for node in material.node_tree.nodes:
            if node.type != "BSDF_PRINCIPLED":
                continue
            base_color = node.inputs.get("Base Color")
            if base_color:
                for link in list(base_color.links):
                    material.node_tree.links.remove(link)
                base_color.default_value = (0.09, 0.008, 0.012, 1)
            metallic = node.inputs.get("Metallic")
            roughness = node.inputs.get("Roughness")
            if metallic:
                metallic.default_value = 0.18
            if roughness:
                roughness.default_value = 0.24

scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE"
scene.render.resolution_x = 1600
scene.render.resolution_y = 900
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGB"
scene.render.filepath = str(output)
scene.view_settings.look = "AgX - Medium High Contrast"

world = bpy.data.worlds.new("RevueltoWorld") if not bpy.data.worlds else bpy.data.worlds[0]
scene.world = world
world.use_nodes = True
background = world.node_tree.nodes.get("Background") if world.node_tree else None
if background:
    background.inputs[0].default_value = (0.006, 0.006, 0.008, 1)
    background.inputs[1].default_value = 0.18

bpy.ops.mesh.primitive_plane_add(size=30, location=(0, 0, 0))
ground = bpy.context.object
ground.name = "StudioGround"
ground_material = bpy.data.materials.new("StudioGroundMaterial")
ground_material.diffuse_color = (0.008, 0.008, 0.011, 1)
ground_material.metallic = 0.15
ground_material.roughness = 0.42
ground_material.use_nodes = True
if ground_material.node_tree:
    ground_shader = ground_material.node_tree.nodes.get("Principled BSDF")
    if ground_shader:
        ground_shader.inputs["Base Color"].default_value = (0.002, 0.002, 0.003, 1)
        ground_shader.inputs["Metallic"].default_value = 0.08
        ground_shader.inputs["Roughness"].default_value = 0.5
ground.data.materials.append(ground_material)

target = Vector((0, 0, 0.52))
for name, light_type, energy, location, color, size in (
    ("Key", "AREA", 520, (-3.5, 2.5, 6.8), (1.0, 0.86, 0.72), 5.0),
    ("Rim", "AREA", 420, (4.5, -3.2, 3.8), (0.65, 0.75, 1.0), 3.5),
    ("RedEdge", "AREA", 340, (-4.2, -3.5, 2.0), (0.78, 0.05, 0.08), 2.8),
):
    light_data = bpy.data.lights.new(name, light_type)
    light_data.energy = energy
    light_data.color = color
    light_data.shape = "DISK"
    light_data.size = size
    light = bpy.data.objects.new(name, light_data)
    light.location = location
    look_at(light, target)
    scene.collection.objects.link(light)

camera_data = bpy.data.cameras.new("PosterCamera")
camera = bpy.data.objects.new("PosterCamera", camera_data)
scene.collection.objects.link(camera)
scene.camera = camera
camera.data.lens = 54
camera.location = (4.35, 6.3, 1.6)
look_at(camera, target)

bpy.ops.render.render(write_still=True)
print(f"Rendered {output}")
