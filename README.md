## svgEditor is a JavaScript vector-based graphics editor based on [these guys](https://github.com/bmstu-iu9/utp2018-9-vector-editor)
![svgEditor](https://image.ibb.co/dmqRgd/svg_Editor.png)
### Document tools:
* New Canvas tool.
  > Creates a new canvas
* Import SVG
  > Allows you to load a previously created canvas into the editor for editing
* Export SVG
  > Allows you to unload a canvas for storage or transfer
### Canvas Tools:
* The `Cursor` tool. 
  > Used to select a shape, move it, resize it
* Hand tool 
  > Allows you to move the canvas
* Tool `Multiangle` > Allows you to draw a polygon
  > Allows you to draw a polygon
* Tool `Color`.
  > Opens the palette and allows you to control the color
* Tool `Group tool
  > Groups the shapes. Any transformation of a shape is now transferred to shapes of the same group.
### Functions:
* Move Shape.
  > Select a shape -> grab it by its center and move it to an arbitrary area of the screen
* Change size and position of a shape.
  > Select a shape -> grab one of the edges and move it around
* Changing a shape's color
  > Select a shape -> use `Color Tool` -> select an arbitrary color.
* Deleting a shape
  > Select a shape -> Press `Delete` on your keyboard.
* Grouping of shapes
  > Select multiple shapes by pressing `Ctrl` on the keyboard, then press the `+G` button. Click on the empty space on the screen to continue working with the canvas successfully
* Working with groups of shapes
  > When working with a group of shapes, you only have to change the properties of one shape in the group for the other shapes to do the same (`Move`, `change` dimensions, `color`, `delete` shapes)
  
  > Warning: Changing a group of shapes doesn't work in a very obvious way. For example, changing triangles is only synchronous if you drag just one of their three corners. 

If you have any questions, write to VanekMRZ@yandex.ru with the subject svgEditor
