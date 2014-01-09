/* jslint unused: false */
function getTransformMatrix(el) {
	var st = window.getComputedStyle(el, null),
			matrix = st.getPropertyValue("-webkit-transform") ||
					st.getPropertyValue("-moz-transform") ||
					st.getPropertyValue("-ms-transform") ||
					st.getPropertyValue("-o-transform") ||
					st.getPropertyValue("transform") ||
					null;

	if (matrix === null || matrix === "none")
		ok(false);

	return matrix.split("(")[1].split(")")[0].split(",");
}

function getAngle(m) {
	var angle = Math.atan2(m[1], m[0]);
	if (angle < 0)
		angle += 2 * Math.PI;

	return angle.toFixed(2);
}

function closeEnough(a, b, msg) {
	ok(Math.abs(a - b) < 0.015, msg + ": " + a + " not close enough to " + b);
}
/* jslint unused: true */

