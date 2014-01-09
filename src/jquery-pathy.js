/**
 * Copyright (c) 2014 Andrei Picus
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */


(function($) {

	function _deg2rad(angle) {
		return angle * Math.PI / 180;
	}

	function _pathBezier(t, p0x, p0y, p1x, p1y, c0x, c0y, c1x, c1y) {
		t = 1 - t;

		var i = 1 - t,
				x = t * t,
				y = i * i,
				a = x * t,
				b = 3 * x * i,
				c = 3 * t * y,
				d = y * i,
				tx = x * (c0x - p0x) + 2 * i * t * (c1x - c0x) + y * (p1x - c1x),
				ty = x * (c0y - p0y) + 2 * i * t * (c1y - c0y) + y * (p1y - c1y);

		return {
				"x": a * p0x + b * c0x + c * c1x + d * p1x,
				"y": a * p0y + b * c0y + c * c1y + d * p1y,
				"angle": Math.atan2(ty, tx)
		};
	}

	function _pathArc(t, cx, cy, radius, start, end) {
		end = _deg2rad(end);
		start = _deg2rad(start);
		var angle = (end - start) * t + start;
		if (angle > 2 * Math.PI)
			angle -= 2 * Math.PI;

		return  {
				"x": (Math.cos(angle) * radius) + cx,
				"y": (Math.sin(angle) * radius) + cy,
				"angle": angle + Math.PI / 2
		};
	}

	function _pathLine(t, p0x, p0y, p1x, p1y) {
		return {
				"x": (p1x - p0x) * t + p0x,
				"y": (p1y - p0y) * t + p0y,
				"angle": Math.atan2(p1y - p0y, p1x - p0x)
		};
	}

	function _getPath(pathType, coords) {
		function _createPathFunc(f, t, coords) {
			var args = [t].concat(coords);
			return f.apply(this, args);
		}

		if ($.isFunction(pathType))
			return function(t) { return _createPathFunc(pathType, t, coords); };

		if (pathType === "line")
			return function(t) { return _createPathFunc(_pathLine, t, coords); };

		if (pathType === "arc")
			return function(t) { return _createPathFunc(_pathArc, t, coords); };

		if (pathType === "bezier")
			return function(t) { return _createPathFunc(_pathBezier, t, coords); };
	}


	$.fn.pathy = function(pathType, pathCoords, options) {
		var defaults = {
			middle: true,
			offset: false,
			rotate: false,
			duration: 0,
			easing: "linear",
		};

		var settings = $.extend({}, defaults, options);

		var t = 0,
				size = this.length,
				step = 1 / (size - 1),
				offsetX = 0, offsetY = 0, offset,
				ret;

		if (settings.offset === true) {
			// Coordinates are against the parent, calculate offsets.
			offset = this.element.position();
			offsetX = offset.left;
			offsetY = offset.top;
		}

		// Get the actual path function.
		var _pathFunc = _getPath(pathType, pathCoords),
				attributes;

		this.each(function() {
			ret = _pathFunc(t);
			t += step;

			// Align with the middle of the item.
			if (settings.middle === true) {
				ret.x -= $(this).outerWidth(true) / 2;
				ret.y -= $(this).outerHeight(true) / 2;
			}

			attributes = {}; // Clear previous values.
			attributes.left = Math.round(ret.x) - offsetX + "px";
			attributes.top = Math.round(ret.y) - offsetY + "px";

			$(this).css("position", "absolute");

			if (settings.rotate === true)
				$(this).css("transform", "rotate(" + ret.angle.toFixed(2) + "rad)");

			$(this).animate(attributes, {
				duration: settings.duration,
				easing: settings.easing
			});
		});

		return this;
	};

}(jQuery));

