
var fs = require('fs');

exports.ics = function(e, t) {
	"use strict";
	var navigator = { appVersion: "00Win" };
	void 0 === e && (e = "default"), void 0 === t && (t = "Calendar");
	var r = -1 !== navigator.appVersion.indexOf("Win") ? "\r\n" : "\n",
		n = [],
		i = ["BEGIN:VCALENDAR", "PRODID:" + t, "VERSION:2.0"].join(r),
		o = r + "END:VCALENDAR",
		a = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
	return {
		addEvent: function(t, i, o, l, u, s) {
			if (void 0 === t || void 0 === i || void 0 === o || void 0 === l || void 0 === u) return !1;
			if (s && !s.rrule) {
				if ("YEARLY" !== s.freq && "MONTHLY" !== s.freq && "WEEKLY" !== s.freq && "DAILY" !== s.freq) throw "Recurrence rrule frequency must be provided and be one of the following: 'YEARLY', 'MONTHLY', 'WEEKLY', or 'DAILY'";
				if (s.until && isNaN(Date.parse(s.until))) throw "Recurrence rrule 'until' must be a valid date string";
				if (s.interval && isNaN(parseInt(s.interval))) throw "Recurrence rrule 'interval' must be an integer";
				if (s.count && isNaN(parseInt(s.count))) throw "Recurrence rrule 'count' must be an integer";
				if (void 0 !== s.byday) {
					if ("[object Array]" !== Object.prototype.toString.call(s.byday)) throw "Recurrence rrule 'byday' must be an array";
					if (s.byday.length > 7) throw "Recurrence rrule 'byday' array must not be longer than the 7 days in a week";
					s.byday = s.byday.filter(function(e, t) {
						return s.byday.indexOf(e) == t
					});
					for (var c in s.byday)
						if (a.indexOf(s.byday[c]) < 0) throw "Recurrence rrule 'byday' values must include only the following: 'SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'"
				}
			}
			var g = new Date(l),
				d = new Date(u),
				f = new Date,
				S = ("0000" + g.getFullYear().toString()).slice(-4),
				E = ("00" + (g.getMonth() + 1).toString()).slice(-2),
				v = ("00" + g.getDate().toString()).slice(-2),
				y = ("00" + g.getHours().toString()).slice(-2),
				A = ("00" + g.getMinutes().toString()).slice(-2),
				T = ("00" + g.getSeconds().toString()).slice(-2),
				b = ("0000" + d.getFullYear().toString()).slice(-4),
				D = ("00" + (d.getMonth() + 1).toString()).slice(-2),
				N = ("00" + d.getDate().toString()).slice(-2),
				h = ("00" + d.getHours().toString()).slice(-2),
				I = ("00" + d.getMinutes().toString()).slice(-2),
				R = ("00" + d.getMinutes().toString()).slice(-2),
				M = ("0000" + f.getFullYear().toString()).slice(-4),
				w = ("00" + (f.getMonth() + 1).toString()).slice(-2),
				L = ("00" + f.getDate().toString()).slice(-2),
				O = ("00" + f.getHours().toString()).slice(-2),
				p = ("00" + f.getMinutes().toString()).slice(-2),
				Y = ("00" + f.getMinutes().toString()).slice(-2),
				U = "",
				V = "";
			y + A + T + h + I + R != 0 && (U = "T" + y + A + T, V = "T" + h + I + R);
			var B, C = S + E + v + U,
				j = b + D + N + V,
				m = M + w + L + ("T" + O + p + Y);
			if (s)
				if (s.rrule) B = s.rrule;
				else {
					if (B = "rrule:FREQ=" + s.freq, s.until) {
						var x = new Date(Date.parse(s.until)).toISOString();
						B += ";UNTIL=" + x.substring(0, x.length - 13).replace(/[-]/g, "") + "000000Z"
					}
					s.interval && (B += ";INTERVAL=" + s.interval), s.count && (B += ";COUNT=" + s.count), s.byday && s.byday.length > 0 && (B += ";BYDAY=" + s.byday.join(","))
				}(new Date). toISOString();
			var H = ["BEGIN:VEVENT", "UID:" + n.length + "@" + e, "CLASS:PUBLIC", "DESCRIPTION:" + i, "DTSTAMP;VALUE=DATE-TIME:" + m, "DTSTART;VALUE=DATE-TIME:" + C, "DTEND;VALUE=DATE-TIME:" + j, "LOCATION:" + o, "SUMMARY;LANGUAGE=en-us:" + t, "TRANSP:TRANSPARENT", "END:VEVENT"];
			return B && H.splice(4, 0, B), H = H.join(r), n.push(H), H
		},

		// creates ics file and returns path to file
		createFile: function(e, t) {
			if (n.length < 1) return !1;
			t = void 0 !== t ? t : ".ics", e = void 0 !== e ? e : "calendar";
			var a, l = i + r + n.join(r) + o;
			var path = 'temp/' + e + '.ics';
			fs.writeFile(path, l, function (err) {
				if (err) throw err;
				console.log('File is created successfully.');
			});
			return path;
		},
	}
};