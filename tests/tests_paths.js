module("paths", {
	setup: function() {
		var fixture = $("#qunit-fixture"),
				item = $("<div></div>").addClass("item"),
				size = 6;

		for (var i = 0; i < size; i++) {
			item.clone().appendTo(fixture);
		}
	}
});
test("test_path_line", function() {
		$(".item").pathy("line", [0, 0, 300, 300]);

		var expectedX = [-10, 50, 110, 170, 230, 290],
				expectedY = [-10, 50, 110, 170, 230, 290];

		$(".item").each(function(i) {
				equal($(this).css("left"), expectedX[i] + "px");
				equal($(this).css("top"), expectedY[i] + "px");
		});
});

test("test_patch_arc", function() {
		$(".item").pathy("arc", [150, 150, 150, 0, 300]);

		var expectedX = [290, 215, 65, -10, 65, 215],
				expectedY = [140, 270, 270, 140, 10, 10];

		$(".item").each(function(i) {
				equal($(this).css("left"), expectedX[i] + "px");
				equal($(this).css("top"), expectedY[i] + "px");
		});
});

test("test_path_bezier", function() {
		$(".item").pathy("bezier", [0, 0, 300, 300, 50, 250, 250, 50]);

		var expectedX = [-10, 36, 103, 177, 244, 290],
				expectedY = [-10, 93, 132, 148, 187, 290];

		$(".item").each(function(i) {
				equal($(this).css("left"), expectedX[i] + "px");
				equal($(this).css("top"), expectedY[i] + "px");
		});
});

test("test_custom_path", function() {
		function customPath(t, p0x, p0y, p1x, p1y) {
			// This is actually a normal line path.
			return {
				"x": (p1x - p0x) * t + p0x,
				"y": (p1y - p0y) * t + p0y,
			};
		}
		$(".item").pathy(customPath, [0, 0, 300, 300]);

		var expectedX = [-10, 50, 110, 170, 230, 290],
				expectedY = [-10, 50, 110, 170, 230, 290];

		$(".item").each(function(i) {
				equal($(this).css("left"), expectedX[i] + "px");
				equal($(this).css("top"), expectedY[i] + "px");
		});
});

