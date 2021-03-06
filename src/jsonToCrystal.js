export default function jsonToCrystal(json, indent = "") {
	let type = typeof(json);
	if (json == null) {
		return "nil";
	} else if (type == "boolean") {
		return json.toString();
	} else if (type == "number") {
		return json.toString();
	} else if (type == "string") {
		return '"' + json.toString() + '"';
	} else if (Array.isArray(json)) {
		let ret = "[\n";
		json.forEach((element) => {
			ret += indent + "  ";
			ret += jsonToCrystal(element, indent + "  ");
			ret += ",\n";
		});
		ret = ret.slice(0, -2);
		ret += "\n" + indent + "]";
		return ret;
	} else if (type == "object") {
		let ret = "{\n";
		for (var key in json) {
			ret += indent + "  ";
			ret += jsonToCrystal(key);
			ret += " => ";
			ret += jsonToCrystal(json[key], indent + "  ");
			ret += ",\n";
		}
		ret = ret.slice(0, -2);
		ret += "\n" + indent + "}";
		return ret;
	} else {
		throw "Invalid JSON object";
	}
}
