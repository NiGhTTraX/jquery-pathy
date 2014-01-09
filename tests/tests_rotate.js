module("rotate", {
	setup: function() {
		var fixture = $("#qunit-fixture"),
				item = $("<div></div>").addClass("item"),
				size = 6;

		for (var i = 0; i < size; i++) {
			item.clone().appendTo(fixture);
		}
	}
});
test("test_rotate_line", function() {
	$(".item").pathy("line", [0, 0, 300, 300], {rotate: true});

	var expected = Math.PI / 4;
	$(".item").each(function(i) {
			var m = getTransformMatrix(this);
			closeEnough(getAngle(m), expected.toFixed(2), i);
	});
});

test("test_rotate_arc", function() {
	var start = 0, end = 300,
			step = Math.PI / 3;

	$(".item").pathy("arc", [150, 150, 150, start, end], {rotate: true});

	$(".item").each(function(i) {
			var m = getTransformMatrix(this),
					expected = step * i + Math.PI / 2;
			if (expected > 2 * Math.PI)
				expected -= 2 * Math.PI;
			closeEnough(getAngle(m), expected.toFixed(2), i);
	});
});

test("test_rotate_bezier", function() {
	$(".item").pathy("bezier", [0, 0, 300, 300, 50, 250, 250, 50], {rotate: true});

	var expected = [1.37, 0.82, 0.27, 0.27, 0.82, 1.37];
	$(".item").each(function(i) {
			var m = getTransformMatrix(this);
			closeEnough(getAngle(m), expected[i].toFixed(2), i);
	});
});

