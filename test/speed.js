var  Benchmark = require('benchmark')
	,glmatrix = require('./glMatrix')
	,ops = require('../src/ops.js')

	,suiteOptions = {
		onStart: function(){
			existsA = [1,1,1]
			existsB = [1,1,1]				
		}
		,onCycle: function(){
			existsA = [1,1,1]
			existsB = [1,1,1]			
		}
	}

	,add = new Benchmark.Suite('glmatrix vs ops: add', suiteOptions)
	,sub = new Benchmark.Suite('glmatrix vs ops: sub', suiteOptions)
	,dot = new Benchmark.Suite('glmatrix vs ops: dot', suiteOptions)
	,cross = new Benchmark.Suite('glmatrix vs ops: cross', suiteOptions)

	,existsA
	,existsB;

// +

add.add('vec3#add new arrays into new', function(){
	var a = glmatrix.vec3.add([1,1,1], [1,1,1], []);
})

add.add('vop#add new arrays into new', function(){
	var a = ops.vop([1,1,1], '+', [1,1,1]);
})


add.add('vec3#add existing arrays into new', function(){
	var a = glmatrix.vec3.add(existsA, existsB, []);
})

add.add('vop#add existing arrays into new', function(){
	var a = ops.vop(existsA, '+', existsB);
})


add.add('vec3#add existing plusEqual', function(){
	var a = glmatrix.vec3.add(existsA, existsB);
})

add.add('vop#add existing plusEqual', function(){
	var a = ops.vop(existsA, '+=', existsB);
})

// -

sub.add('vec3#subtract existing arrays into new', function(){
	var a = glmatrix.vec3.subtract(existsA, existsB, []);
})

sub.add('vop#subtract existing arrays into new', function(){
	var a = ops.vop(existsA, '-', existsB);
})


sub.add('vec3#subtract existing minusEqual', function(){
	var a = glmatrix.vec3.subtract(existsA, existsB);
})

sub.add('vop#subtract existing minusEqual', function(){
	var a = ops.vop(existsA, '+=', existsB);
})

// *

dot.add('vec3#dot', function(){
	var a = glmatrix.vec3.dot(existsA, existsB);
})

dot.add('vop#dot', function(){
	var a = ops.vop(existsA, '*', existsB);
})

// x

cross.add('vec3#cross', function(){
	var a = glmatrix.vec3.cross(existsA, existsB, []);
})

cross.add('vop#cross', function(){
	var a = ops.vop(existsA, 'x', existsB);
})



function onCycle(event, bench){
	console.log(String(bench));
}

function onComplete() {
	console.log('--> Fastest is ' + this.filter('fastest').pluck('name'));
}


add.on('cycle', onCycle);
sub.on('cycle', onCycle);
dot.on('cycle', onCycle);
cross.on('cycle', onCycle);

add.on('complete', onComplete);
sub.on('complete', onComplete);
dot.on('complete', onComplete);
cross.on('complete', onComplete);

add.run();
sub.run();
dot.run();
cross.run();

