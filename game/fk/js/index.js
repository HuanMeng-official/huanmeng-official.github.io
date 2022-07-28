// globalConfig.js

// ============================================================================

// ============================================================================

// Provides global variables used by the entire program.

// Most of this should be configuration.

// Timing multiplier for entire game engine.

let gameSpeed = 1;

// Colors

const BLUE =   { r: 0x67, g: 0xd7, b: 0xf0 };

const GREEN =  { r: 0xa6, g: 0xe0, b: 0x2c };

const PINK =   { r: 0xfa, g: 0x24, b: 0x73 };

const ORANGE = { r: 0xfe, g: 0x95, b: 0x22 };

const allColors = [BLUE, GREEN, PINK, ORANGE];

// Gameplay

const getSpawnDelay = () => {

	const spawnDelayMax = 1400;	const spawnDelayMin = 550;

	const spawnDelay = spawnDelayMax - state.game.cubeCount * 3.1;

	return Math.max(spawnDelay, spawnDelayMin);

}

const doubleStrongEnableScore = 2000;

// Number of cubes that must be smashed before activating a feature.

const slowmoThreshold = 10;

const strongThreshold = 25;

const spinnerThreshold = 25;

// Interaction state

let pointerIsDown = false;

// The last known position of the primary pointer in screen coordinates.`

let pointerScreen = { x: 0, y: 0 };

// Same as `pointerScreen`, but converted to scene coordinates in rAF.

let pointerScene = { x: 0, y: 0 };

// Minimum speed of pointer before "hits" are counted.

const minPointerSpeed = 60;

// The hit speed affects the direction the target post-hit. This number dampens that force.

const hitDampening = 0.1;

// Backboard receives shadows and is the farthest negative Z position of entities.

const backboardZ = -400;

const shadowColor = '#262e36';

// How much air drag is applied to standard objects

const airDrag = 0.022;

const gravity = 0.3;

// Spark config

const sparkColor = 'rgba(170,221,255,.9)';

const sparkThickness = 2.2;

const airDragSpark = 0.1;

// Track pointer positions to show trail

const touchTrailColor = 'rgba(170,221,255,.62)';

const touchTrailThickness = 7;

const touchPointLife = 120;

const touchPoints = [];

// Size of in-game targets. This affects rendered size and hit area.

const targetRadius = 40;

const targetHitRadius = 50;

const makeTargetGlueColor = target => {

	// const alpha = (target.health - 1) / (target.maxHealth - 1);

	// return `rgba(170,221,255,${alpha.toFixed(3)})`;

	return 'rgb(170,221,255)';

};

// Size of target fragments

const fragRadius = targetRadius / 3;

// Game canvas element needed in setup.js and interaction.js

const canvas = document.querySelector('#c');

// 3D camera config

// Affects perspective

const cameraDistance = 900;

// Does not affect perspective

const sceneScale = 1;

// Objects that get too close to the camera will be faded out to transparent over this range.

// const cameraFadeStartZ = 0.8*cameraDistance - 6*targetRadius;

const cameraFadeStartZ = 0.45*cameraDistance;

const cameraFadeEndZ = 0.65*cameraDistance;

const cameraFadeRange = cameraFadeEndZ - cameraFadeStartZ;

// Globals used to accumlate all vertices/polygons in each frame

const allVertices = [];

const allPolys = [];

const allShadowVertices = [];

const allShadowPolys = [];

// state.js

// ============================================================================

// ============================================================================

///////////

// Enums //

///////////

// Game Modes

const GAME_MODE_RANKED = Symbol('GAME_MODE_RANKED');

const GAME_MODE_CASUAL = Symbol('GAME_MODE_CASUAL');

// Available Menus

const MENU_MAIN = Symbol('MENU_MAIN');

const MENU_PAUSE = Symbol('MENU_PAUSE');

const MENU_SCORE = Symbol('MENU_SCORE');

//////////////////

// Global State //

//////////////////

const state = {

	game: {

		mode: GAME_MODE_RANKED,

		// Run time of current game.

		time: 0,

		// Player score.

		score: 0,

		// Total number of cubes smashed in game.

		cubeCount: 0

	},

	menus: {

		// Set to `null` to hide all menus

		active: MENU_MAIN

	}

};

////////////////////////////

// Global State Selectors //

////////////////////////////

const isInGame = () => !state.menus.active;

const isMenuVisible = () => !!state.menus.active;

const isCasualGame = () => state.game.mode === GAME_MODE_CASUAL;

const isPaused = () => state.menus.active === MENU_PAUSE;

///////////////////

// Local Storage //

///////////////////

const highScoreKey = '__menja__highScore';

const getHighScore = () => {

	const raw = localStorage.getItem(highScoreKey);

	return raw ? parseInt(raw, 10) : 0;

};

const setHighScore = score => localStorage.setItem(highScoreKey, String(score))

// utils.js

// ============================================================================

// ============================================================================

const invariant = (condition, message) => {

	if (!condition) throw new Error(message);

};

/////////

// DOM //

/////////

const $ = selector => document.querySelector(selector);

const handleClick = (element, handler) => element.addEventListener('click', handler);

const handlePointerDown = (element, handler) => {

	element.addEventListener('touchstart', handler);

	element.addEventListener('mousedown', handler);

};

////////////////////////

// Formatting Helpers //

////////////////////////

// Converts a number into a formatted string with thousand separators.

const formatNumber = num => num.toLocaleString();

////////////////////

// Math Constants //

////////////////////

const PI = Math.PI;

const TAU = Math.PI * 2;

const ETA = Math.PI * 0.5;

//////////////////

// Math Helpers //

//////////////////

// Clamps a number between min and max values (inclusive)

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// Linearly interpolate between numbers a and b by a specific amount.

// mix >= 0 && mix <= 1

const lerp = (a, b, mix) => (b - a) * mix + a;

////////////////////

// Random Helpers //

////////////////////

// Generates a random number between min (inclusive) and max (exclusive)

const random = (min, max) => Math.random() * (max - min) + min;

// Generates a random integer between and possibly including min and max values

const randomInt = (min, max) => ((Math.random() * (max - min + 1)) | 0) + min;

// Returns a random element from an array

const pickOne = arr => arr[Math.random() * arr.length | 0];

///////////////////

// Color Helpers //

///////////////////

// Converts an { r, g, b } color object to a 6-digit hex code.

const colorToHex = color => {

	return '#' +

		(color.r | 0).toString(16).padStart(2, '0') +

		(color.g | 0).toString(16).padStart(2, '0') +

		(color.b | 0).toString(16).padStart(2, '0');

};

// Operates on an { r, g, b } color object.

// Returns string hex code.

// `lightness` must range from 0 to 1. 0 is pure black, 1 is pure white.

const shadeColor = (color, lightness) => {

	let other, mix;

	if (lightness < 0.5) {

		other = 0;

		mix = 1 - (lightness * 2);

	} else {

		other = 255;

		mix = lightness * 2 - 1;

	}

	return '#' +

		(lerp(color.r, other, mix) | 0).toString(16).padStart(2, '0') +

		(lerp(color.g, other, mix) | 0).toString(16).padStart(2, '0') +

		(lerp(color.b, other, mix) | 0).toString(16).padStart(2, '0');

};

////////////////////

// Timing Helpers //

////////////////////

const _allCooldowns = [];

const makeCooldown = (rechargeTime, units=1) => {

	let timeRemaining = 0;

	let lastTime = 0;

	const initialOptions = { rechargeTime, units };

	const updateTime = () => {

		const now = state.game.time;

		// Reset time remaining if time goes backwards.

		if (now < lastTime) {

			timeRemaining = 0;

		} else {

			// update...

			timeRemaining -= now-lastTime;

			if (timeRemaining < 0) timeRemaining = 0;

		}

		lastTime = now;

	};

	const canUse = () => {

		updateTime();

		return timeRemaining <= (rechargeTime * (units-1));

	};

	const cooldown = {

		canUse,

		useIfAble() {

			const usable = canUse();

			if (usable) timeRemaining += rechargeTime;

			return usable;

		},

		mutate(options) {

			if (options.rechargeTime) {

				// Apply recharge time delta so change takes effect immediately.

				timeRemaining -= rechargeTime-options.rechargeTime;

				if (timeRemaining < 0) timeRemaining = 0;

				rechargeTime = options.rechargeTime;

			}

			if (options.units) units = options.units;

		},

		reset() {

			timeRemaining = 0;

			lastTime = 0;

			this.mutate(initialOptions);

		}

	};

	_allCooldowns.push(cooldown);

	return cooldown;

};

const resetAllCooldowns = () => _allCooldowns.forEach(cooldown => cooldown.reset());

const makeSpawner = ({ chance, cooldownPerSpawn, maxSpawns }) => {

	const cooldown = makeCooldown(cooldownPerSpawn, maxSpawns);

	return {

		shouldSpawn() {

			return Math.random() <= chance && cooldown.useIfAble();

		},

		mutate(options) {

			if (options.chance) chance = options.chance;

			cooldown.mutate({

				rechargeTime: options.cooldownPerSpawn,

				units: options.maxSpawns

			});

		}

	};

};

////////////////////

// Vector Helpers //

////////////////////

const normalize = v => {

	const mag = Math.hypot(v.x, v.y, v.z);

	return {

		x: v.x / mag,

		y: v.y / mag,

		z: v.z / mag

	};

}

// Curried math helpers

const add = a => b => a + b;

// Curried vector helpers

const scaleVector = scale => vector => {

	vector.x *= scale;

	vector.y *= scale;

	vector.z *= scale;

};

////////////////

// 3D Helpers //

////////////////

// Clone array and all vertices.

function cloneVertices(vertices) {

	return vertices.map(v => ({ x: v.x, y: v.y, z: v.z }));

}

// Copy vertex data from one array into another.

// Arrays must be the same length.

function copyVerticesTo(arr1, arr2) {

	const len = arr1.length;

	for (let i=0; i<len; i++) {

		const v1 = arr1[i];

		const v2 = arr2[i];

		v2.x = v1.x;

		v2.y = v1.y;

		v2.z = v1.z;

	}

}

// Compute triangle midpoint.

// Mutates `middle` property of given `poly`.

function computeTriMiddle(poly) {

	const v = poly.vertices;

	poly.middle.x = (v[0].x + v[1].x + v[2].x) / 3;

	poly.middle.y = (v[0].y + v[1].y + v[2].y) / 3;

	poly.middle.z = (v[0].z + v[1].z + v[2].z) / 3;

}

// Compute quad midpoint.

// Mutates `middle` property of given `poly`.

function computeQuadMiddle(poly) {

	const v = poly.vertices;

	poly.middle.x = (v[0].x + v[1].x + v[2].x + v[3].x) / 4;

	poly.middle.y = (v[0].y + v[1].y + v[2].y + v[3].y) / 4;

	poly.middle.z = (v[0].z + v[1].z + v[2].z + v[3].z) / 4;

}

function computePolyMiddle(poly) {

	if (poly.vertices.length === 3) {

		computeTriMiddle(poly);

	} else {

		computeQuadMiddle(poly);

	}

}

// Compute distance from any polygon (tri or quad) midpoint to camera.

// Sets `depth` property of given `poly`.

// Also triggers midpoint calculation, which mutates `middle` property of `poly`.

function computePolyDepth(poly) {

	computePolyMiddle(poly);

	const dX = poly.middle.x;

	const dY = poly.middle.y;

	const dZ = poly.middle.z - cameraDistance;

	poly.depth = Math.hypot(dX, dY, dZ);

}

// Compute normal of any polygon. Uses normalized vector cross product.

// Mutates `normalName` property of given `poly`.

function computePolyNormal(poly, normalName) {

	// Store quick refs to vertices

	const v1 = poly.vertices[0];

	const v2 = poly.vertices[1];

	const v3 = poly.vertices[2];

	// Calculate difference of vertices, following winding order.

	const ax = v1.x - v2.x;

	const ay = v1.y - v2.y;

	const az = v1.z - v2.z;

	const bx = v1.x - v3.x;

	const by = v1.y - v3.y;

	const bz = v1.z - v3.z;

	// Cross product

	const nx = ay*bz - az*by;

	const ny = az*bx - ax*bz;

	const nz = ax*by - ay*bx;

	// Compute magnitude of normal and normalize

	const mag = Math.hypot(nx, ny, nz);

	const polyNormal = poly[normalName];

	polyNormal.x = nx / mag;

	polyNormal.y = ny / mag;

	polyNormal.z = nz / mag;

}

// Apply translation/rotation/scale to all given vertices.

// If `vertices` and `target` are the same array, the vertices will be mutated in place.

// If `vertices` and `target` are different arrays, `vertices` will not be touched, instead the

// transformed values from `vertices` will be written to `target` array.

function transformVertices(vertices, target, tX, tY, tZ, rX, rY, rZ, sX, sY, sZ) {

	// Matrix multiplcation constants only need calculated once for all vertices.

	const sinX = Math.sin(rX);

	const cosX = Math.cos(rX);

	const sinY = Math.sin(rY);

	const cosY = Math.cos(rY);

	const sinZ = Math.sin(rZ);

	const cosZ = Math.cos(rZ);

	// Using forEach() like map(), but with a (recycled) target array.

	vertices.forEach((v, i) => {

		const targetVertex = target[i];

		// X axis rotation

		const x1 = v.x;

		const y1 = v.z*sinX + v.y*cosX;

		const z1 = v.z*cosX - v.y*sinX;

		// Y axis rotation

		const x2 = x1*cosY - z1*sinY;

		const y2 = y1;

		const z2 = x1*sinY + z1*cosY;

		// Z axis rotation

		const x3 = x2*cosZ - y2*sinZ;

		const y3 = x2*sinZ + y2*cosZ;

		const z3 = z2;

		// Scale, Translate, and set the transform.

		targetVertex.x = x3 * sX + tX;

		targetVertex.y = y3 * sY + tY;

		targetVertex.z = z3 * sZ + tZ;

	});

}

// 3D projection on a single vertex.

// Directly mutates the vertex.

const projectVertex = v => {

	const focalLength = cameraDistance * sceneScale;

	const depth = focalLength / (cameraDistance - v.z);

	v.x = v.x * depth;

	v.y = v.y * depth;

};

// 3D projection on a single vertex.

// Mutates a secondary target vertex.

const projectVertexTo = (v, target) => {

	const focalLength = cameraDistance * sceneScale;

	const depth = focalLength / (cameraDistance - v.z);

	target.x = v.x * depth;

	target.y = v.y * depth;

};

// PERF.js

// ============================================================================

// ============================================================================

// Dummy no-op functions.

// I use these in a special build for custom performance profiling.

const PERF_START = () => {};

const PERF_END = () => {};

const PERF_UPDATE = () => {};

// 3dModels.js

// ============================================================================

// ============================================================================

// Define models once. The origin is the center of the model.

// A simple cube, 8 vertices, 6 quads.

// Defaults to an edge length of 2 units, can be influenced with `scale`.

function makeCubeModel({ scale=1 }) {

	return {

		vertices: [

			// top

			{ x: -scale, y: -scale, z: scale },

			{ x:  scale, y: -scale, z: scale },

			{ x:  scale, y:  scale, z: scale },

			{ x: -scale, y:  scale, z: scale },

			// bottom

			{ x: -scale, y: -scale, z: -scale },

			{ x:  scale, y: -scale, z: -scale },

			{ x:  scale, y:  scale, z: -scale },

			{ x: -scale, y:  scale, z: -scale }

		],

		polys: [

			// z = 1

			{ vIndexes: [0, 1, 2, 3] },

			// z = -1

			{ vIndexes: [7, 6, 5, 4] },

			// y = 1

			{ vIndexes: [3, 2, 6, 7] },

			// y = -1

			{ vIndexes: [4, 5, 1, 0] },

			// x = 1

			{ vIndexes: [5, 6, 2, 1] },

			// x = -1

			{ vIndexes: [0, 3, 7, 4] }

		]

	};

}

// Not very optimized - lots of duplicate vertices are generated.

function makeRecursiveCubeModel({ recursionLevel, splitFn, color, scale=1 }) {

	const getScaleAtLevel = level => 1 / (3 ** level);

	// We can model level 0 manually. It's just a single, centered, cube.

	let cubeOrigins = [{ x: 0, y: 0, z: 0 }];

	// Recursively replace cubes with smaller cubes.

	for (let i=1; i<=recursionLevel; i++) {

		const scale = getScaleAtLevel(i) * 2;

		const cubeOrigins2 = [];

		cubeOrigins.forEach(origin => {

			cubeOrigins2.push(...splitFn(origin, scale));

		});

		cubeOrigins = cubeOrigins2;

	}

	const finalModel = { vertices: [], polys: [] };

	// Generate single cube model and scale it.

	const cubeModel = makeCubeModel({ scale: 1 });

	cubeModel.vertices.forEach(scaleVector(getScaleAtLevel(recursionLevel)));

	// Compute the max distance x, y, or z origin values will be.

	// Same result as `Math.max(...cubeOrigins.map(o => o.x))`, but much faster.

	const maxComponent = getScaleAtLevel(recursionLevel) * (3 ** recursionLevel - 1);

	// Place cube geometry at each origin.

	cubeOrigins.forEach((origin, cubeIndex) => {

		// To compute occlusion (shading), find origin component with greatest

		// magnitude and normalize it relative to `maxComponent`.

		const occlusion = Math.max(

			Math.abs(origin.x),

			Math.abs(origin.y),

			Math.abs(origin.z)

		) / maxComponent;

		// At lower iterations, occlusion looks better lightened up a bit.

		const occlusionLighter = recursionLevel > 2

			? occlusion

			: (occlusion + 0.8) / 1.8;

		// Clone, translate vertices to origin, and apply scale

		finalModel.vertices.push(

			...cubeModel.vertices.map(v => ({

				x: (v.x + origin.x) * scale,

				y: (v.y + origin.y) * scale,

				z: (v.z + origin.z) * scale

			}))

		);

		// Clone polys, shift referenced vertex indexes, and compute color.

		finalModel.polys.push(

			...cubeModel.polys.map(poly => ({

				vIndexes: poly.vIndexes.map(add(cubeIndex * 8))

			}))

		);

	});

	return finalModel;

}

// o: Vector3D - Position of cube's origin (center).

// s: Vector3D - Determines size of menger sponge.

function mengerSpongeSplit(o, s) {

	return [

		// Top

		{ x: o.x + s, y: o.y - s, z: o.z + s },

		{ x: o.x + s, y: o.y - s, z: o.z + 0 },

		{ x: o.x + s, y: o.y - s, z: o.z - s },

		{ x: o.x + 0, y: o.y - s, z: o.z + s },

		{ x: o.x + 0, y: o.y - s, z: o.z - s },

		{ x: o.x - s, y: o.y - s, z: o.z + s },

		{ x: o.x - s, y: o.y - s, z: o.z + 0 },

		{ x: o.x - s, y: o.y - s, z: o.z - s },

		// Bottom

		{ x: o.x + s, y: o.y + s, z: o.z + s },

		{ x: o.x + s, y: o.y + s, z: o.z + 0 },

		{ x: o.x + s, y: o.y + s, z: o.z - s },

		{ x: o.x + 0, y: o.y + s, z: o.z + s },

		{ x: o.x + 0, y: o.y + s, z: o.z - s },

		{ x: o.x - s, y: o.y + s, z: o.z + s },

		{ x: o.x - s, y: o.y + s, z: o.z + 0 },

		{ x: o.x - s, y: o.y + s, z: o.z - s },

		// Middle

		{ x: o.x + s, y: o.y + 0, z: o.z + s },

		{ x: o.x + s, y: o.y + 0, z: o.z - s },

		{ x: o.x - s, y: o.y + 0, z: o.z + s },

		{ x: o.x - s, y: o.y + 0, z: o.z - s }

	];

}

// Helper to optimize models by merging duplicate vertices within a threshold,

// and removing all polys that share the same vertices.

// Directly mutates the model.

function optimizeModel(model, threshold=0.0001) {

	const { vertices, polys } = model;

	const compareVertices = (v1, v2) => (

		Math.abs(v1.x - v2.x) < threshold &&

		Math.abs(v1.y - v2.y) < threshold &&

		Math.abs(v1.z - v2.z) < threshold

	);

	const comparePolys = (p1, p2) => {

		const v1 = p1.vIndexes;

		const v2 = p2.vIndexes;

		return (

			(

				v1[0] === v2[0] ||

				v1[0] === v2[1] ||

				v1[0] === v2[2] ||

				v1[0] === v2[3]

			) && (

				v1[1] === v2[0] ||

				v1[1] === v2[1] ||

				v1[1] === v2[2] ||

				v1[1] === v2[3]

			) && (

				v1[2] === v2[0] ||

				v1[2] === v2[1] ||

				v1[2] === v2[2] ||

				v1[2] === v2[3]

			) && (

				v1[3] === v2[0] ||

				v1[3] === v2[1] ||

				v1[3] === v2[2] ||

				v1[3] === v2[3]

			)

		);

	};

	vertices.forEach((v, i) => {

		v.originalIndexes = [i];

	});

	for (let i=vertices.length-1; i>=0; i--) {

		for (let ii=i-1; ii>=0; ii--) {

			const v1 = vertices[i];

			const v2 = vertices[ii];

			if (compareVertices(v1, v2)) {

				vertices.splice(i, 1);

				v2.originalIndexes.push(...v1.originalIndexes);

				break;

			}

		}

	}

	vertices.forEach((v, i) => {

		polys.forEach(p => {

			p.vIndexes.forEach((vi, ii, arr) => {

				const vo = v.originalIndexes;

				if (vo.includes(vi)) {

					arr[ii] = i;

				}

			});

		});

	});

	polys.forEach(p => {

		const vi = p.vIndexes;

		p.sum = vi[0] + vi[1] + vi[2] + vi[3];

	});

	polys.sort((a, b) => b.sum - a.sum);

	// Assumptions:

	// 1. Each poly will either have no duplicates or 1 duplicate.

	// 2. If two polys are equal, they are both hidden (two cubes touching),

	//    therefore both can be removed.

	for (let i=polys.length-1; i>=0; i--) {

		for (let ii=i-1; ii>=0; ii--) {

			const p1 = polys[i];

			const p2 = polys[ii];

			if (p1.sum !== p2.sum) break;

			if (comparePolys(p1, p2)) {

				polys.splice(i, 1);

				polys.splice(ii, 1);

				i--;

				break;

			}

		}

	}

	return model;

}

// Entity.js

// ============================================================================

// ============================================================================

class Entity {

	constructor({ model, color, wireframe=false }) {

		const vertices = cloneVertices(model.vertices);

		const shadowVertices = cloneVertices(model.vertices);

		const colorHex = colorToHex(color);

		const darkColorHex = shadeColor(color, 0.4);

		const polys = model.polys.map(p => ({

			vertices: p.vIndexes.map(vIndex => vertices[vIndex]),

			color: color, // custom rgb color object

			wireframe: wireframe,

			strokeWidth: wireframe ? 2 : 0, // Set to non-zero value to draw stroke

			strokeColor: colorHex, // must be a CSS color string

			strokeColorDark: darkColorHex, // must be a CSS color string

			depth: 0,

			middle: { x: 0, y: 0, z: 0 },

			normalWorld: { x: 0, y: 0, z: 0 },

			normalCamera: { x: 0, y: 0, z: 0 }

		}));

		const shadowPolys = model.polys.map(p => ({

			vertices: p.vIndexes.map(vIndex => shadowVertices[vIndex]),

			wireframe: wireframe,

			normalWorld: { x: 0, y: 0, z: 0 }

		}));

		this.projected = {}; // Will store 2D projected data

		this.model = model;

		this.vertices = vertices;

		this.polys = polys;

		this.shadowVertices = shadowVertices;

		this.shadowPolys = shadowPolys;

		this.reset();

	}

	// Better names: resetEntity, resetTransform, resetEntityTransform

	reset() {

		this.x = 0;

		this.y = 0;

		this.z = 0;

		this.xD = 0;

		this.yD = 0;

		this.zD = 0;

		this.rotateX = 0;

		this.rotateY = 0;

		this.rotateZ = 0;

		this.rotateXD = 0;

		this.rotateYD = 0;

		this.rotateZD = 0;

		this.scaleX = 1;

		this.scaleY = 1;

		this.scaleZ = 1;

		this.projected.x = 0;

		this.projected.y = 0;

	}

	transform() {

		transformVertices(

			this.model.vertices,

			this.vertices,

			this.x,

			this.y,

			this.z,

			this.rotateX,

			this.rotateY,

			this.rotateZ,

			this.scaleX,

			this.scaleY,

			this.scaleZ

		);

		copyVerticesTo(this.vertices, this.shadowVertices);

	}

	// Projects origin point, stored as `projected` property.

	project() {

		projectVertexTo(this, this.projected);

	}

}

// getTarget.js

// ============================================================================

// ============================================================================

// All active targets

const targets = [];

// Pool target instances by color, using a Map.

// keys are color objects, and values are arrays of targets.

// Also pool wireframe instances separately.

const targetPool = new Map(allColors.map(c=>([c, []])));

const targetWireframePool = new Map(allColors.map(c=>([c, []])));

const getTarget = (() => {

	const slowmoSpawner = makeSpawner({

		chance: 0.5,

		cooldownPerSpawn: 10000,

		maxSpawns: 1

	});

	let doubleStrong = false;

	const strongSpawner = makeSpawner({

		chance: 0.3,

		cooldownPerSpawn: 12000,

		maxSpawns: 1

	});

	const spinnerSpawner = makeSpawner({

		chance: 0.1,

		cooldownPerSpawn: 10000,

		maxSpawns: 1

	});

	// Cached array instances, no need to allocate every time.

	const axisOptions = [

		['x', 'y'],

		['y', 'z'],

		['z', 'x']

	];

	function getTargetOfStyle(color, wireframe) {

		const pool = wireframe ? targetWireframePool : targetPool;

		let target = pool.get(color).pop();

		if (!target) {

			target = new Entity({

				model: optimizeModel(makeRecursiveCubeModel({

					recursionLevel: 1,

					splitFn: mengerSpongeSplit,

					scale: targetRadius

				})),

				color: color,

				wireframe: wireframe

			});

			// Init any properties that will be used.

			// These will not be automatically reset when recycled.

			target.color = color;

			target.wireframe = wireframe;

			// Some properties don't have their final value yet.

			// Initialize with any value of the right type.

			target.hit = false;

			target.maxHealth = 0;

			target.health = 0;

		}

		return target;

	}

	return function getTarget() {

		if (doubleStrong && state.game.score <= doubleStrongEnableScore) {

			doubleStrong = false;

			// Spawner is reset automatically when game resets.

		} else if (!doubleStrong && state.game.score > doubleStrongEnableScore) {

			doubleStrong = true;

			strongSpawner.mutate({ maxSpawns: 2 });

		}

		// Target Parameters

		// --------------------------------

		let color = pickOne([BLUE, GREEN, ORANGE]);

		let wireframe = false;

		let health = 1;

		let maxHealth = 3;

		const spinner = state.game.cubeCount >= spinnerThreshold && isInGame() && spinnerSpawner.shouldSpawn();

		// Target Parameter Overrides

		// --------------------------------

		if (state.game.cubeCount >= slowmoThreshold && slowmoSpawner.shouldSpawn()) {

			color = BLUE;

			wireframe = true;

		}

		else if (state.game.cubeCount >= strongThreshold && strongSpawner.shouldSpawn()) {

			color = PINK;

			health = 3;

		}

		// Target Creation

		// --------------------------------

		const target = getTargetOfStyle(color, wireframe);

		target.hit = false;

		target.maxHealth = maxHealth;

		target.health = health;

		updateTargetHealth(target, 0);

		const spinSpeeds = [

			Math.random() * 0.1 - 0.05,

			Math.random() * 0.1 - 0.05

		];

		if (spinner) {

			// Ends up spinning a random axis

			spinSpeeds[0] = -0.25;

			spinSpeeds[1] = 0;

			target.rotateZ = random(0, TAU);

		}

		const axes = pickOne(axisOptions);

		spinSpeeds.forEach((spinSpeed, i) => {

			switch (axes[i]) {

				case 'x':

					target.rotateXD = spinSpeed;

					break;

				case 'y':

					target.rotateYD = spinSpeed;

					break;

				case 'z':

					target.rotateZD = spinSpeed;

					break;

			}

		});

		return target;

	}

})();

const updateTargetHealth = (target, healthDelta) => {

	target.health += healthDelta;

	// Only update stroke on non-wireframe targets.

	// Showing "glue" is a temporary attempt to display health. For now, there's

	// no reason to have wireframe targets with high health, so we're fine.

	if (!target.wireframe) {

		const strokeWidth = target.health - 1;

		const strokeColor = makeTargetGlueColor(target);

		for (let p of target.polys) {

			p.strokeWidth = strokeWidth;

			p.strokeColor = strokeColor;

		}

	}

};

const returnTarget = target => {

	target.reset();

	const pool = target.wireframe ? targetWireframePool : targetPool;

	pool.get(target.color).push(target);

};

function resetAllTargets() {

	while(targets.length) {

		returnTarget(targets.pop());

	}

}

// createBurst.js

// ============================================================================

// ============================================================================

// Track all active fragments

const frags = [];

// Pool inactive fragments by color, using a Map.

// keys are color objects, and values are arrays of fragments.

// // Also pool wireframe instances separately.

const fragPool = new Map(allColors.map(c=>([c, []])));

const fragWireframePool = new Map(allColors.map(c=>([c, []])));

const createBurst = (() => {

	// Precompute some private data to be reused for all bursts.

	const basePositions = mengerSpongeSplit({ x:0, y:0, z:0 }, fragRadius*2);

	const positions = cloneVertices(basePositions);

	const prevPositions = cloneVertices(basePositions);

	const velocities = cloneVertices(basePositions);

	const basePositionNormals = basePositions.map(normalize);

	const positionNormals = cloneVertices(basePositionNormals);

	const fragCount = basePositions.length;

	function getFragForTarget(target) {

		const pool = target.wireframe ? fragWireframePool : fragPool;

		let frag = pool.get(target.color).pop();

		if (!frag) {

			frag = new Entity({

				model: makeCubeModel({ scale: fragRadius }),

				color: target.color,

				wireframe: target.wireframe

			});

			frag.color = target.color;

			frag.wireframe = target.wireframe;

		}

		return frag;

	}

	return (target, force=1) => {

		// Calculate fragment positions, and what would have been the previous positions

		// when still a part of the larger target.

		transformVertices(

			basePositions, positions,

			target.x, target.y, target.z,

			target.rotateX, target.rotateY, target.rotateZ,

			1, 1, 1

		);

		transformVertices(

			basePositions, prevPositions,

			target.x - target.xD, target.y - target.yD, target.z - target.zD,

			target.rotateX - target.rotateXD, target.rotateY - target.rotateYD, target.rotateZ - target.rotateZD,

			1, 1, 1

		);

		// Compute velocity of each fragment, based on previous positions.

		// Will write to `velocities` array.

		for (let i=0; i<fragCount; i++) {

			const position = positions[i];

			const prevPosition = prevPositions[i];

			const velocity = velocities[i];

			velocity.x = position.x - prevPosition.x;

			velocity.y = position.y - prevPosition.y;

			velocity.z = position.z - prevPosition.z;

		}

		// Apply target rotation to normals

		transformVertices(

			basePositionNormals, positionNormals,

			0, 0, 0,

			target.rotateX, target.rotateY, target.rotateZ,

			1, 1, 1

		);

		for (let i=0; i<fragCount; i++) {

			const position = positions[i];

			const velocity = velocities[i];

			const normal = positionNormals[i];

			const frag = getFragForTarget(target);

			frag.x = position.x;

			frag.y = position.y;

			frag.z = position.z;

			frag.rotateX = target.rotateX;

			frag.rotateY = target.rotateY;

			frag.rotateZ = target.rotateZ;

			const burstSpeed = 2 * force;

			const randSpeed = 2 * force;

			const rotateScale = 0.015;

			frag.xD = velocity.x + (normal.x * burstSpeed) + (Math.random() * randSpeed);

			frag.yD = velocity.y + (normal.y * burstSpeed) + (Math.random() * randSpeed);

			frag.zD = velocity.z + (normal.z * burstSpeed) + (Math.random() * randSpeed);

			frag.rotateXD = frag.xD * rotateScale;

			frag.rotateYD = frag.yD * rotateScale;

			frag.rotateZD = frag.zD * rotateScale;

			frags.push(frag);

		};

	}

})();

const returnFrag = frag => {

	frag.reset();

	const pool = frag.wireframe ? fragWireframePool : fragPool;

	pool.get(frag.color).push(frag);

};

// sparks.js

// ============================================================================

// ============================================================================

const sparks = [];

const sparkPool = [];

function addSpark(x, y, xD, yD) {

	const spark = sparkPool.pop() || {};

	spark.x = x + xD * 0.5;

	spark.y = y + yD * 0.5;

	spark.xD = xD;

	spar
