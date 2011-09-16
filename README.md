= Ops: trying to make vector math look a little better in JS =

JavaScript does not have operator overloading (not necessary a bad thing...), so to perform vector calculations, you have two options:

	var  a = [1,1,1]
		,b = [2,2,2]
		,c;

	// by hand:
	c = [
		a[0] + b[0], a[1] + b[1], a[2] + b[2],
	];

	// library - notice how assignment reads in opposite direction of JS 
	vec3.add(a, b, c)

This example is trivial, but when calculations become more complex, it becomes harder and harder to read what's actually going on, especially when dealing with 'plus/minus equals' vs a new vector. The assignment begins to read from right to left, instead of the typical left to right.

As an experiment, I created Ops: an attempt at making vector math read more intuitively.

	var  a = [1,1,1]
		,b = [2,2,2]
		,c;
	
	// vop stands for vector operation
	c = vop( a, '+', b );

Ops is meant to be used alongside a more powerful library, like [glMatrix](code.google.com/p/glmatrix/). It is not a replacement, nor is it meant to be. It's named Ops and not vop because maybe in the future it will handle more than just vector math.

== Pros ==

  * Hopefully easier to read
  * Still a strong indication that these are not ordinary numbers, unlike when using operator overloads
  * No custom objects. Still completely interoperable with glMatrix (and others that use arrays)
  * Can alias the `vop` method to `v` for even shorter reference

== Cons ==

  * Sometimes slightly slower than glMatrix (most of the time faster or same: see test/speed.js)
  * Strings, Captain! STRINGS!

= API = 

All vops take the form: `vector1, op, vector2`, where `op` can be one of the following:

`+` : adds the two vectors, returns the new vector
`-` : subtracts the two vectors, returns the new vector
`+=` : adds `vector2` into `vector1`, and returns `vector1`
`-=` : subtracts `vector2` from `vector1`, and returns `vector1`
`*` : returns the scalar dot product of the two vectors
`x` : returns a new vector containing the cross product

= Examples =

=== Particle Projection ===

Using only glMatrix, computing the projection of a particle is slightly confusing. The values resulting from the below line are actually being assigned to `this.tpos` (in place).

	vec3.add( this.pos, vec3.scale(this.vel, this.damping * dt), this.tpos );

Ops allows the statement to read like a typical assignment, but also returns a new array implicitly.

	this.tpos = vop( this.pos, '+', vec3.scale(this.vel, this.damping * dt) )

Granted, glMatrix allows you to do something similar, but you are left with the possibly confusing empty array as the third param, which is required to force glMatrix to not perform a `+=` operation:

	this.tpos = vec3.add( this.pos, vec3.scale(this.vel, this.damping * dt), [] );

=== Adding Force ===

	// glmatrix
	vec3.add(this.vel, vec3.scale(f, this.invMass));

	// vop
	vop(this.vel, '+=', vec3.scale(f, this.invMass))

= Speed =

Run `node test/speed.js`. Requires [benchmark](http://benchmarkjs.com/). Current output:

	vec3#add new arrays into new x 4,203,323 ops/sec ±2.52% (90 runs sampled)
	vop#add new arrays into new x 10,820,042 ops/sec ±1.53% (91 runs sampled)
	vec3#add existing arrays into new x 5,166,261 ops/sec ±2.54% (87 runs sampled)
	vop#add existing arrays into new x 11,797,793 ops/sec ±1.18% (91 runs sampled)
	vec3#add existing plusEqual x 15,142,537 ops/sec ±1.15% (92 runs sampled)
	vop#add existing plusEqual x 13,905,744 ops/sec ±1.45% (88 runs sampled)
	--> Fastest is vec3#add existing plusEqual

	vec3#subtract existing arrays into new x 5,283,542 ops/sec ±2.08% (91 runs sampled)
	vop#subtract existing arrays into new x 12,016,066 ops/sec ±1.46% (92 runs sampled)
	vec3#subtract existing minusEqual x 15,360,859 ops/sec ±1.36% (90 runs sampled)
	vop#subtract existing minusEqual x 14,437,870 ops/sec ±1.71% (93 runs sampled)
	--> Fastest is vec3#subtract existing minusEqual

	vec3#dot x 20,988,440 ops/sec ±1.29% (93 runs sampled)
	vop#dot x 15,938,175 ops/sec ±1.87% (88 runs sampled)
	--> Fastest is vec3#dot

	vec3#cross x 4,935,437 ops/sec ±2.50% (87 runs sampled)
	vop#cross x 9,764,686 ops/sec ±1.71% (88 runs sampled)
	--> Fastest is vop#cross

The grouping is deceptive, but Ops is often faster. What you should really read out of this is that Ops is "fast enough, seriously."

= Conclusion =

This is an experiment, and one that I'm not in love with! But you have to try things to see what works, right?
