var  Benchmark = require('benchmark')
	,glmatrix = require('./glMatrix')
	,ops = require('../src/ops.js')

	,suiteOptions = {
		onStart: function(){
			existsA = [1,1,1]
			existsB = [1,1,1]				
		}
		,onCycle: function(event, bench){
			console.log(String(bench));
			existsA = [1,1,1]
			existsB = [1,1,1]			
		}
		,onComplete: function() {
			console.log('--> Fastest is ' + this.filter('fastest').pluck('name'));
		}
	}

	,addNew = new Benchmark.Suite('glmatrix vs ops: add new into new', suiteOptions)
	,addExist = new Benchmark.Suite('glmatrix vs ops: add existing into new', suiteOptions)
	,addEq = new Benchmark.Suite('glmatrix vs ops: add existing plusEqual', suiteOptions)

	,sub = new Benchmark.Suite('glmatrix vs ops: sub existing into new', suiteOptions)
	,subEq = new Benchmark.Suite('glmatrix vs ops: sub existing minusEqual', suiteOptions)
	
	,dot = new Benchmark.Suite('glmatrix vs ops: dot', suiteOptions)
	,cross = new Benchmark.Suite('glmatrix vs ops: cross', suiteOptions)

	,set = new Benchmark.Suite('glmatrix vs ops: set', suiteOptions)

	,existsA
	,existsB;

// +

addNew.add('vec3#add new arrays into new', function(){
	var a = glmatrix.vec3.add([1,1,1], [1,1,1], []);
})

addNew.add('vop#add new arrays into new', function(){
	var a = ops.vop([1,1,1], '+', [1,1,1]);
})


addExist.add('vec3#add existing arrays into new', function(){
	var a = glmatrix.vec3.add(existsA, existsB, []);
})

addExist.add('vop#add existing arrays into new', function(){
	var a = ops.vop(existsA, '+', existsB);
})


addEq.add('vec3#add existing plusEqual', function(){
	var a = glmatrix.vec3.add(existsA, existsB);
})

addEq.add('vop#add existing plusEqual', function(){
	var a = ops.vop(existsA, '+=', existsB);
})

// -

sub.add('vec3#subtract existing arrays into new', function(){
	var a = glmatrix.vec3.subtract(existsA, existsB, []);
})

sub.add('vop#subtract existing arrays into new', function(){
	var a = ops.vop(existsA, '-', existsB);
})


subEq.add('vec3#subtract existing minusEqual', function(){
	var a = glmatrix.vec3.subtract(existsA, existsB);
})

subEq.add('vop#subtract existing minusEqual', function(){
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

// = / set

set.add('vec3#set', function(){
	var a = glmatrix.vec3.set(existsA, existsB);
})

set.add('vop#set', function(){
	var a = ops.vop(existsB, '=', existsA);	
})



addNew.run();
addExist.run();
addEq.run();

sub.run();
subEq.run();

dot.run();
cross.run();
set.run();

