(function() {
  var mapModule = angular.module('app.map');

  var projectionExtent = [485869.5728, 837076.5648, 76443.1884, 299941.7864];
  var projection = ol.proj.configureProj4jsProjection({
    code: 'EPSG:21781',
    extent: projectionExtent
  });

  mapModule.filter('coordXY', function() {
    return function(input, precision) {
      return ol.coordinate.toStringXY(input, precision);
    }
  });

  mapModule.controller('MapController',
      ['$scope', '$http', function($scope, $http) {

    var map = new ol.Map({
      renderer: ol.RendererHint.CANVAS,
      view: new ol.View2D({
        projection: projection,
        center: ol.extent.getCenter(projectionExtent),
        zoom: 2
      })
    });

    $http.get('http://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml').success(
        function(data, status, header, config) {
          var parser = new ol.parser.ogc.WMTSCapabilities();
          var capabilities = parser.read(data);
          var wmtsSourceOptions = ol.source.WMTS.optionsFromCapabilities(
              capabilities, 'ch.swisstopo.pixelkarte-farbe');
          var wmtsSource = new ol.source.WMTS(wmtsSourceOptions);
          var wmtsLayer = new ol.layer.TileLayer({source: wmtsSource});
          map.addLayer(wmtsLayer);
        });

    $scope.map = map;

    // mouse position:
    var mapProjection = map.getView().getProjection();
    var transform;
    $scope.$watch('mousePositionProjection', function(code) {
      transform = ol.proj.getTransform(mapProjection, ol.proj.get(code))
    });

    map.on('mousemove', function(event) {
      // see http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
      $scope.$apply(function() {
        $scope.mousePositionValue = transform(event.getCoordinate());
      });
    });

    $scope.mousePositionProjection = mapProjection.getCode();
  }]);
})();
