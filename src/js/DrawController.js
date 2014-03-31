(function() {
  goog.provide('ga_draw_controller');

  var module = angular.module('ga_draw_controller', [
    'pascalprecht.translate'
  ]);

  module.controller('GaDrawController',
      function($scope, $translate, gaGlobalOptions) {
        
        // Defines static styles
        var white = [255, 255, 255];
        var black = [0, 0, 0];
        var transparent = [0, 0, 0, 0];
        var transparentCircle =  new ol.style.Circle({
          radius: 1,
          fill: new ol.style.Fill({color: transparent}),
          stroke: new ol.style.Stroke({color: transparent})
        }); 

        // Defines directive options
        $scope.options = {
          translate: $translate, // For translation of ng-options
          waitClass: 'ga-draw-wait',
          text: '',
          tools: [
            {id: 'point',   iconClass: 'icon-ga-point'},
            {id: 'line',    iconClass: 'icon-ga-line'},
            {id: 'polygon', iconClass: 'icon-ga-polygon'},
            {id: 'text',    iconClass: 'icon-ga-text'},
            {id: 'modify',  iconClass: 'icon-ga-edit'},
            {id: 'delete',  iconClass: 'icon-ga-delete'}
          ],
          colors: [
            {name: 'black',  fill: [0, 0, 0],       textStroke: white},
            {name: 'blue',   fill: [0, 0, 255],     textStroke: white},
            {name: 'gray',   fill: [128, 128, 128], textStroke: white},
            {name: 'green',  fill: [0, 128, 0],     textStroke: white},
            {name: 'orange', fill: [255, 165, 0],   textStroke: black},
            {name: 'red',    fill: [255, 0, 0],     textStroke: white},
            {name: 'white',  fill: [255, 255, 255], textStroke: black},
            {name: 'yellow', fill: [255, 255, 0],   textStroke: black}
          ],
          iconSizes:[
            {label:'24 px', value: [24, 24]},
            {label:'36 px', value: [36, 36]},
            {label:'48 px', value: [48, 48]}
          ],
          icons: [
            
            // Basics
            {id: 'circle'},
            {id: 'circle-stroked'},
            {id: 'square'},
            {id: 'square-stroked'},
            {id: 'triangle'},
            {id: 'triangle-stroked'},
            {id: 'star'},
            {id: 'star-stroked'},
            {id: 'marker'},
            {id: 'marker-stroked'},
            {id: 'cross'},
            {id: 'disability'},
            {id: 'danger'},
            
            // Shops 
            {id: 'art-gallery'},
            {id: 'alcohol-shop'},
            {id: 'bakery'},
            {id: 'bank'},
            {id: 'bar'},
            {id: 'beer'},
            {id: 'cafe'},
            {id: 'cinema'},
            {id: 'commercial'},
            {id: 'clothing-store'},
            {id: 'grocery'},
            {id: 'fast-food'},
            {id: 'hairdresser'},
            {id: 'fuel'},
            {id: 'laundry'},
            {id: 'library'},
            {id: 'lodging'},
            {id: 'pharmacy'},
            {id: 'restaurant'},
            {id: 'shop'},
            
            // Transport
            {id: 'airport'},
            {id: 'bicycle'},
            {id: 'bus'},
            {id: 'car'},
            {id: 'ferry'},
            {id: 'london-underground'},
            {id: 'rail'},
            {id: 'rail-above'},
            {id: 'rail-light'},
            {id: 'rail-metro'},
            {id: 'rail-underground'},
            {id: 'scooter'},

            // Sport 
            {id: 'america-football'},
            {id: 'baseball'},
            {id: 'basketball'},
            {id: 'cricket'},
            {id: 'golf'},
            {id: 'skiing'},
            {id: 'soccer'},
            {id: 'swimming'},
            {id: 'tennis'},
            
            // Places 
            {id: 'airfield'},
            {id: 'building'},
            {id: 'campsite'},
            {id: 'cemetery'},
            {id: 'city'},
            {id: 'college'},
            {id: 'dog-park'},
            {id: 'embassy'},
            {id: 'farm'},
            {id: 'fire-station'},
            {id: 'garden'},
            {id: 'harbor'},
            {id: 'heliport'},
            {id: 'hospital'},
            {id: 'industrial'},
            {id: 'land-use'},
            {id: 'lighthouse'},
            {id: 'monument'},
            {id: 'minefield'},
            {id: 'museum'},
            {id: 'oil-well'},
            {id: 'park2'},
            {id: 'park'},
            {id: 'parking'},
            {id: 'parking-garage'},
            {id: 'pitch'},
            {id: 'place-of-worship'},
            {id: 'playground'},
            {id: 'police'},
            {id: 'polling-place'},
            {id: 'post'},
            {id: 'religious-christian'},
            {id: 'religious-jewish'},
            {id: 'religious-muslim'},
            {id: 'prison'},
            {id: 'school'},
            {id: 'slaughterhouse'},
            {id: 'theatre'},
            {id: 'toilets'},
            {id: 'town'},
            {id: 'town-hall'},
            {id: 'village'},
            {id: 'warehouse'},
            {id: 'wetland'},
            {id: 'zoo'},

            
            {id: 'camera'},
            {id: 'chemist'},
            {id: 'dam'},
            {id: 'emergency-telephone'},
            {id: 'entrance'},
            {id: 'heart'},
            {id: 'logging'},
            {id: 'mobilephone'},
            {id: 'music'},
            {id: 'roadblock'},
            {id: 'rocket'},
            {id: 'suitcase'},
            {id: 'telephone'},
            {id: 'waste-basket'},
            {id: 'water'}
          ]  
        };
        
        // Set default color
        $scope.options.color = $scope.options.colors[5];
        
        // Set default icon
        $scope.options.icon = $scope.options.icons[0];
        
        // Set default icon
        $scope.options.iconSize = $scope.options.iconSizes[0];

        // Define tools identifiers
        for (var i = 0, ii = $scope.options.tools.length; i < ii; i++) {
          var tool = $scope.options.tools[i];
          tool.activeKey = 'is' + tool.id.charAt(0).toUpperCase() + tool.id.slice(1) + 'Active';
          tool.cssClass = 'ga-draw-' + tool.id + '-bt';
          tool.title = 'draw_' + tool.id;
          tool.description = 'draw_' + tool.id + '_description';
          tool.instructions = 'draw_' + tool.id + '_instructions';
        }
 
        // Define icons properties
        for (var i = 0, ii = $scope.options.icons.length; i < ii; i++) {
          var icon = $scope.options.icons[i];
          icon.url = gaGlobalOptions.resourceUrl + 'img/maki/' + icon.id + '-24@2x.png';
        }
        $scope.getIconUrl = function(i) {
          return i.url;
        };
        // Define layer style function
        $scope.options.styleFunction = (function() {
          return function(feature, resolution) {
            
            if (feature.getStyleFunction() &&
                feature.getStyleFunction()() !== null) {
              return feature.getStyleFunction()(resolution); 
            }
            
            // Only update features with new colors if its style is null
            var text;
            var color = $scope.options.color;
            var fill = new ol.style.Fill({
              color: color.fill.concat([0.4])
            })
            var stroke = new ol.style.Stroke({
              color: color.fill.concat([1]),
              width: 3
            });
            var icon = new ol.style.Circle({
              radius: 4,
              fill: fill,
              stroke: stroke
            });


            if (($scope.options.isTextActive ||
                ($scope.options.isModifyActive &&
                    feature.getGeometry() instanceof ol.geom.Point &&
                    feature.get('useText'))) &&
                angular.isDefined($scope.options.text)) {

              text = new ol.style.Text({
                font: 'normal 16px Helvetica',
                text: $scope.options.text,
                fill: new ol.style.Fill({
                  color: stroke.getColor()
                }),
                stroke: new ol.style.Stroke({
                  color: color.textStroke.concat([1]),
                  width: 3
                })
              });
              fill = undefined;
              stroke = undefined;
            } 
            feature.set('useText', (!!text));

            
            if (($scope.options.isPointActive ||
                ($scope.options.isModifyActive &&
                    feature.getGeometry() instanceof ol.geom.Point &&
                    feature.get('useIcon'))) &&
                angular.isDefined($scope.options.icon)) {

              icon = new ol.style.Icon({
                src: $scope.getIconUrl($scope.options.icon),
                size: $scope.options.iconSize.value
              });
              fill = undefined;
              stroke = undefined;
            } 
            feature.set('useIcon', (!!icon));
            
            var styles = [
              new ol.style.Style({
                fill: fill,
                stroke: stroke,
                text: text,
                image: (text) ? transparentCircle : icon
              })
            ];

            return styles;
          };
        })()

        $scope.options.drawStyleFunction = (function() {
          return function(feature, resolution) {
            var styles;
            if (feature.getGeometry().getType() === 'Polygon') {
              styles =  [
                new ol.style.Style({
                  fill: new ol.style.Fill({
                    color: [255, 255, 255, 0.4]
                  }),
                  stroke: new ol.style.Stroke({
                    color: [255, 255, 255, 0],
                    width: 0
                  })
                })
              ];
            } else {
              styles = $scope.options.styleFunction(feature, resolution);
            }
            return styles;
          }
        })();
         
        $scope.options.selectStyleFunction = (function() {
          var fill = new ol.style.Fill({
            color: white.concat([0.4])
          });
          var stroke = new ol.style.Stroke({
            color: white.concat([0.6]),
            width: 3 
          });
          
          var vertexStyle = new ol.style.Style({
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: white.concat([1])
              }),
              stroke: new ol.style.Stroke({
                color: black.concat([1])
              })
            }) 
          })
           
          return function(feature, resolution) {
            if (!feature.getStyleFunction() ||
                feature.getStyleFunction()()=== null) {
              return [vertexStyle];
            }
            var styles = feature.getStyleFunction()(resolution);
            var style = styles[0];
            var text = style.getText();
            if (text) {
              text = new ol.style.Text({
                font: text.getFont(),
                text: text.getText(),
                fill: fill,
                stroke: stroke
              });
            }

            return [
              new ol.style.Style({
                fill: fill,
                stroke: stroke,
                text: text,
                image: (text) ? style.getImage() :
                  new ol.style.Circle({
                    radius: 4,
                    fill: fill,
                    stroke: stroke
                  }) 
              })
            ];
          }
        })();
      });
})();
