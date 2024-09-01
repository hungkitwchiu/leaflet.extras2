# leaflet.extras2 (development version)

* Included [Leaflet MovingMarkers](https://github.com/ewoken/Leaflet.MovingMarker) plugin
* Included [Leaflet Spin](https://github.com/makinacorpus/Leaflet.Spin) plugin. Thanks to @radbasa
* Included [Labelgun](https://github.com/Geovation/labelgun) plugin.
* `addTimeslider` gained styling options and the arguments `label`, `labelOptions`, `sameDate` and `ordertime` and works for Point / Linestring Simple Feature Collections
* Enable multiple sidebars. Thanks to @jeffreyhanson
* Option `fit` removed for sidebars as plugin CSS/JS was adapted
* Deprecated `menuItem`/`mapmenuItems`/`markermenuItems` and renamed with prefix `context_`. Fixes #10 and #17
* Some improvement for the `easyprint` plugin: (Fixes #31)
  - It is now possible to include multiple custom `sizeModes` in `easyprintOptions`. The example [easyprint_app.R](./inst/examples/easyprint_app.R) has been extended to demonstrate the new functionalities. **Unfortunately** the `CurrentSize` option via `easyprintMap` always returns a gray background, although via the control button it works just fine. 
  - The `tileLayer` option now accepts a group name for a tilelayer for which printing will wait until the layer is fully loaded.
* The `addPlayback` is now capable of displaying labels and popups for every timestep. The transition of labels and popups can be controlled with `transitionpopup` and `transitionlabel`.
* The function `addHistory` now requires the *fontawesome* package, since the dependency is not included in shiny's shared directory anymore.
* The function `addWMS` gained the argument `checkempty`, which will check the returning HTML-body tag. If the body is empty, no popup is opened.

# leaflet.extras2 1.1.0

* Included [Leaflet Contextmenu](https://github.com/aratcliffe/Leaflet.contextmenu) plugin
* Included [Leaflet TimeSlider](https://github.com/dwilhelm89/LeafletSlider) plugin
* `addWMS` gained the `layerId` argument and works like `leaflet::addWMSTiles` except for the `popupOptions`
* `Side-by-Side` doesn't propagate click events when dragging. Thanks to `f905a47` of [#23](https://github.com/digidem/leaflet-side-by-side/pull/23) 


# leaflet.extras2 1.0.0

* Initial release
