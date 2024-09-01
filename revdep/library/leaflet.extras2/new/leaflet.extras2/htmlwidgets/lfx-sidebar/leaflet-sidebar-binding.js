/* global LeafletWidget, $, L */
LeafletWidget.methods.addSidebar = function(id, options) {
  (function(){
    var map = this;

    // Add css class ('sidebar-map') to map
    if (!map._container.classList.contains('sidebar-map')) {
      map._container.classList.add('sidebar-map');
    }

    // Move Sidebar inside Map-Div
    if (options && options.fit === true) {
      // Append sidebar container to map div
      if ($('.leaflet-sidebar-container').length === 0) {
        var mapdiv = document.createElement('div');
        mapdiv.className = 'leaflet-sidebar-container';
        $(mapdiv).appendTo($('.leaflet.html-widget-output'));
      }
      $('.sidebar.collapsed').appendTo('.leaflet-sidebar-container');

      // Disable/Re-enable dragging+scrolling when user's cursor enters/exits the element
      var content = $('.sidebar-content');
      content.on('mouseover', function () {
          map.dragging.disable();
          content.on('mousewheel', L.DomEvent.stopPropagation);
      });
      content.on('mouseout', function () {
          map.dragging.enable();
      });
    }

    // Show Sidebar & content
    setTimeout(function(){
      $('.sidebar.collapsed .sidebar-tabs, .sidebar.collapsed .sidebar-content').css('display','block');
    }, 400);

    // Extend onClick method to trigger 'shown' event, otherwise Shiny-Inputs/Outputs are not reactive
    L.Control.Sidebar = L.Control.Sidebar.extend({
      _onClick: function() {
        if (L.DomUtil.hasClass(this, 'active')) {
          this._sidebar.close();
        } else if (!L.DomUtil.hasClass(this, 'disabled')) {
          this._sidebar.open(this.querySelector('a').hash.slice(1));
          $(this.firstElementChild.attributes.href.nodeValue).trigger('shown');
        }
      }
    });

    // initialize sidebar element of map
    if (!map.sidebar) {
      map.sidebar = {};
    }
    map.sidebar[id] = L.control.sidebar(id, options);
    map.controls.add(map.sidebar[id]);

  }).call(this);
};

LeafletWidget.methods.removeSidebar = function(sidebar_id) {
  var map = this;
  if (map.sidebar) {
    // if no sidebar_id specified, then use the first sidebar
    var tid =
      typeof(sidebar_id) === "string" ?
        sidebar_id : Object.keys(map.sidebar)[0];
    var sidebar = $(`#${tid}`);
    if (sidebar[0]) {
      // Remove left/right CSS
      if (L.DomUtil.hasClass(sidebar[0], 'sidebar-left')) {
        $('.leaflet-left').css('left', 0);
      } else {
        $('.leaflet-right').css('right', 0);
      }
      // Remove Sidebar and Delete from map
      sidebar.remove();
      delete map.sidebar[tid];
    }
  }
};

LeafletWidget.methods.closeSidebar = function(sidebar_id) {
  var map = this;
  if (map.sidebar) {
    // if no sidebar_id specified, then use the first sidebar
    var tid =
      typeof(sidebar_id) === "string" ?
        sidebar_id : Object.keys(map.sidebar)[0];
    if (map.sidebar[tid]) {
      map.sidebar[tid].close();
    }
  }
};

LeafletWidget.methods.openSidebar = function(x) {
  var map = this;
  if (map.sidebar) {
    // if no sidebar_id specified, then use the first sidebar
    var tid =
      typeof(x.sidebar_id) === "string" ?
        x.sidebar_id : Object.keys(map.sidebar)[0];
    if (map.sidebar[tid]) {
      map.sidebar[tid].open(x.id);
    }
  }
};
