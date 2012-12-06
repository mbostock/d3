require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.graticule");

var ε = 1e-6;

suite.addBatch({
  "graticule": {
    topic: function() {
      return d3.geo.graticule()
          .extent([[-90, -45], [90, 45]])
          .step([45, 45])
          .precision(3);
    },

    "extent": {
      "defaults to just inside –180º, -90º to +180º, +90º": function() {
        assert.deepEqual(d3.geo.graticule().extent(), [[-180 + ε, -90 + ε], [180 - ε, 90 - ε]]);
      },
      "coerces input values to numbers": function() {
        var graticule = d3.geo.graticule().extent([["-90", "-45"], ["+90", "+45"]]),
            extent = graticule.extent();
        assert.strictEqual(extent[0][0], -90);
        assert.strictEqual(extent[0][1], -45);
        assert.strictEqual(extent[1][0], +90);
        assert.strictEqual(extent[1][1], +45);
      }
    },

    "returns a GeometryCollection of LineStrings": function(graticule) {
      assert.deepEqual(graticule(), {
        type: "GeometryCollection",
        geometries: [
          {type: "LineString", coordinates: [[-90,-45],[-90,-42],[-90,-39],[-90,-36],[-90,-33],[-90,-30],[-90,-27],[-90,-24],[-90,-21],[-90,-18],[-90,-15],[-90,-12],[-90,-9],[-90,-6],[-90,-3],[-90,0],[-90,3],[-90,6],[-90,9],[-90,12],[-90,15],[-90,18],[-90,21],[-90,24],[-90,27],[-90,30],[-90,33],[-90,36],[-90,39],[-90,42],[-90,45]]},
          {type: "LineString", coordinates: [[-45,-45],[-45,-42],[-45,-39],[-45,-36],[-45,-33],[-45,-30],[-45,-27],[-45,-24],[-45,-21],[-45,-18],[-45,-15],[-45,-12],[-45,-9],[-45,-6],[-45,-3],[-45,0],[-45,3],[-45,6],[-45,9],[-45,12],[-45,15],[-45,18],[-45,21],[-45,24],[-45,27],[-45,30],[-45,33],[-45,36],[-45,39],[-45,42],[-45,45]]},
          {type: "LineString", coordinates: [[0,-45],[0,-42],[0,-39],[0,-36],[0,-33],[0,-30],[0,-27],[0,-24],[0,-21],[0,-18],[0,-15],[0,-12],[0,-9],[0,-6],[0,-3],[0,0],[0,3],[0,6],[0,9],[0,12],[0,15],[0,18],[0,21],[0,24],[0,27],[0,30],[0,33],[0,36],[0,39],[0,42],[0,45]]},
          {type: "LineString", coordinates: [[45,-45],[45,-42],[45,-39],[45,-36],[45,-33],[45,-30],[45,-27],[45,-24],[45,-21],[45,-18],[45,-15],[45,-12],[45,-9],[45,-6],[45,-3],[45,0],[45,3],[45,6],[45,9],[45,12],[45,15],[45,18],[45,21],[45,24],[45,27],[45,30],[45,33],[45,36],[45,39],[45,42],[45,45]]},
          {type: "LineString", coordinates: [[-90,-45],[-87,-45],[-84,-45],[-81,-45],[-78,-45],[-75,-45],[-72,-45],[-69,-45],[-66,-45],[-63,-45],[-60,-45],[-57,-45],[-54,-45],[-51,-45],[-48,-45],[-45,-45],[-42,-45],[-39,-45],[-36,-45],[-33,-45],[-30,-45],[-27,-45],[-24,-45],[-21,-45],[-18,-45],[-15,-45],[-12,-45],[-9,-45],[-6,-45],[-3,-45],[0,-45],[3,-45],[6,-45],[9,-45],[12,-45],[15,-45],[18,-45],[21,-45],[24,-45],[27,-45],[30,-45],[33,-45],[36,-45],[39,-45],[42,-45],[45,-45],[48,-45],[51,-45],[54,-45],[57,-45],[60,-45],[63,-45],[66,-45],[69,-45],[72,-45],[75,-45],[78,-45],[81,-45],[84,-45],[87,-45],[90,-45]]},
          {type: "LineString", coordinates: [[-90,0],[-87,0],[-84,0],[-81,0],[-78,0],[-75,0],[-72,0],[-69,0],[-66,0],[-63,0],[-60,0],[-57,0],[-54,0],[-51,0],[-48,0],[-45,0],[-42,0],[-39,0],[-36,0],[-33,0],[-30,0],[-27,0],[-24,0],[-21,0],[-18,0],[-15,0],[-12,0],[-9,0],[-6,0],[-3,0],[0,0],[3,0],[6,0],[9,0],[12,0],[15,0],[18,0],[21,0],[24,0],[27,0],[30,0],[33,0],[36,0],[39,0],[42,0],[45,0],[48,0],[51,0],[54,0],[57,0],[60,0],[63,0],[66,0],[69,0],[72,0],[75,0],[78,0],[81,0],[84,0],[87,0],[90,0]]}
        ]
      });
    },

    "step": {
      "defaults to 22.5º, 22.5º": function(graticule) {
        assert.deepEqual(d3.geo.graticule().step(), [22.5, 22.5]);
      },
      "coerces input values to numbers": function() {
        var graticule = d3.geo.graticule().step(["45", "11.25"]),
            step = graticule.step();
        assert.strictEqual(step[0], 45);
        assert.strictEqual(step[1], 11.25);
      }
    },

    "outline": {
      "returns a Polygon": function(graticule) {
        assert.deepEqual(graticule.outline(), {
          type: "Polygon",
          coordinates: [[
            [-90,-45],[-90,-42],[-90,-39],[-90,-36],[-90,-33],[-90,-30],[-90,-27],[-90,-24],[-90,-21],[-90,-18],[-90,-15],[-90,-12],[-90,-9],[-90,-6],[-90,-3],[-90,0],[-90,3],[-90,6],[-90,9],[-90,12],[-90,15],[-90,18],[-90,21],[-90,24],[-90,27],[-90,30],[-90,33],[-90,36],[-90,39],[-90,42],[-90,45],
            [-87,45],[-84,45],[-81,45],[-78,45],[-75,45],[-72,45],[-69,45],[-66,45],[-63,45],[-60,45],[-57,45],[-54,45],[-51,45],[-48,45],[-45,45],[-42,45],[-39,45],[-36,45],[-33,45],[-30,45],[-27,45],[-24,45],[-21,45],[-18,45],[-15,45],[-12,45],[-9,45],[-6,45],[-3,45],[0,45],[3,45],[6,45],[9,45],[12,45],[15,45],[18,45],[21,45],[24,45],[27,45],[30,45],[33,45],[36,45],[39,45],[42,45],[45,45],[48,45],[51,45],[54,45],[57,45],[60,45],[63,45],[66,45],[69,45],[72,45],[75,45],[78,45],[81,45],[84,45],[87,45],[90,45],
            [90,42],[90,39],[90,36],[90,33],[90,30],[90,27],[90,24],[90,21],[90,18],[90,15],[90,12],[90,9],[90,6],[90,3],[90,0],[90,-3],[90,-6],[90,-9],[90,-12],[90,-15],[90,-18],[90,-21],[90,-24],[90,-27],[90,-30],[90,-33],[90,-36],[90,-39],[90,-42],[90,-45],
            [87,-45],[84,-45],[81,-45],[78,-45],[75,-45],[72,-45],[69,-45],[66,-45],[63,-45],[60,-45],[57,-45],[54,-45],[51,-45],[48,-45],[45,-45],[42,-45],[39,-45],[36,-45],[33,-45],[30,-45],[27,-45],[24,-45],[21,-45],[18,-45],[15,-45],[12,-45],[9,-45],[6,-45],[3,-45],[0,-45],[-3,-45],[-6,-45],[-9,-45],[-12,-45],[-15,-45],[-18,-45],[-21,-45],[-24,-45],[-27,-45],[-30,-45],[-33,-45],[-36,-45],[-39,-45],[-42,-45],[-45,-45],[-48,-45],[-51,-45],[-54,-45],[-57,-45],[-60,-45],[-63,-45],[-66,-45],[-69,-45],[-72,-45],[-75,-45],[-78,-45],[-81,-45],[-84,-45],[-87,-45],[-90,-45]
          ]]
        });
      }
    },

    "line": {
      "returns an array of LineStrings": function(graticule) {
        assert.deepEqual(graticule.lines(), [
          {type: "LineString", coordinates: [[-90,-45],[-90,-42],[-90,-39],[-90,-36],[-90,-33],[-90,-30],[-90,-27],[-90,-24],[-90,-21],[-90,-18],[-90,-15],[-90,-12],[-90,-9],[-90,-6],[-90,-3],[-90,0],[-90,3],[-90,6],[-90,9],[-90,12],[-90,15],[-90,18],[-90,21],[-90,24],[-90,27],[-90,30],[-90,33],[-90,36],[-90,39],[-90,42],[-90,45]]},
          {type: "LineString", coordinates: [[-45,-45],[-45,-42],[-45,-39],[-45,-36],[-45,-33],[-45,-30],[-45,-27],[-45,-24],[-45,-21],[-45,-18],[-45,-15],[-45,-12],[-45,-9],[-45,-6],[-45,-3],[-45,0],[-45,3],[-45,6],[-45,9],[-45,12],[-45,15],[-45,18],[-45,21],[-45,24],[-45,27],[-45,30],[-45,33],[-45,36],[-45,39],[-45,42],[-45,45]]},
          {type: "LineString", coordinates: [[0,-45],[0,-42],[0,-39],[0,-36],[0,-33],[0,-30],[0,-27],[0,-24],[0,-21],[0,-18],[0,-15],[0,-12],[0,-9],[0,-6],[0,-3],[0,0],[0,3],[0,6],[0,9],[0,12],[0,15],[0,18],[0,21],[0,24],[0,27],[0,30],[0,33],[0,36],[0,39],[0,42],[0,45]]},
          {type: "LineString", coordinates: [[45,-45],[45,-42],[45,-39],[45,-36],[45,-33],[45,-30],[45,-27],[45,-24],[45,-21],[45,-18],[45,-15],[45,-12],[45,-9],[45,-6],[45,-3],[45,0],[45,3],[45,6],[45,9],[45,12],[45,15],[45,18],[45,21],[45,24],[45,27],[45,30],[45,33],[45,36],[45,39],[45,42],[45,45]]},
          {type: "LineString", coordinates: [[-90,-45],[-87,-45],[-84,-45],[-81,-45],[-78,-45],[-75,-45],[-72,-45],[-69,-45],[-66,-45],[-63,-45],[-60,-45],[-57,-45],[-54,-45],[-51,-45],[-48,-45],[-45,-45],[-42,-45],[-39,-45],[-36,-45],[-33,-45],[-30,-45],[-27,-45],[-24,-45],[-21,-45],[-18,-45],[-15,-45],[-12,-45],[-9,-45],[-6,-45],[-3,-45],[0,-45],[3,-45],[6,-45],[9,-45],[12,-45],[15,-45],[18,-45],[21,-45],[24,-45],[27,-45],[30,-45],[33,-45],[36,-45],[39,-45],[42,-45],[45,-45],[48,-45],[51,-45],[54,-45],[57,-45],[60,-45],[63,-45],[66,-45],[69,-45],[72,-45],[75,-45],[78,-45],[81,-45],[84,-45],[87,-45],[90,-45]]},
          {type: "LineString", coordinates: [[-90,0],[-87,0],[-84,0],[-81,0],[-78,0],[-75,0],[-72,0],[-69,0],[-66,0],[-63,0],[-60,0],[-57,0],[-54,0],[-51,0],[-48,0],[-45,0],[-42,0],[-39,0],[-36,0],[-33,0],[-30,0],[-27,0],[-24,0],[-21,0],[-18,0],[-15,0],[-12,0],[-9,0],[-6,0],[-3,0],[0,0],[3,0],[6,0],[9,0],[12,0],[15,0],[18,0],[21,0],[24,0],[27,0],[30,0],[33,0],[36,0],[39,0],[42,0],[45,0],[48,0],[51,0],[54,0],[57,0],[60,0],[63,0],[66,0],[69,0],[72,0],[75,0],[78,0],[81,0],[84,0],[87,0],[90,0]]}
        ]);
      }
    }
  }
});

suite.export(module);
