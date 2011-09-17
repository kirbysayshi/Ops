!function(exports){
	
	var vops = {

		'+': function(v1, v2){
			return [
				v1[0] + v2[0],
				v1[1] + v2[1],
				v1[2] + v2[2]
			]
		}
		,'+=': function(v1, v2){
			
				v1[0] += v2[0]
				v1[1] += v2[1]
				v1[2] += v2[2]

			return v1;
		}

		,'-': function(v1, v2){
			return [
				v1[0] - v2[0],
				v1[1] - v2[1],
				v1[2] - v2[2]
			]	
		}
		,'-=': function(v1, v2){
			
				v1[0] -= v2[0]
				v1[1] -= v2[1]
				v1[2] -= v2[2]

			return v1;
		}

		,'*': function(v1, v2){
			return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
		}
		,'x': function(v1, v2){
			var 
				 x = v1[0]
				,y = v1[1]
				,z = v1[2]
				
				,x2 = v2[0]
				,y2 = v2[1]
				,z2 = v2[2];
			
			return [
				 y*z2 - z*y2
				,z*x2 - x*z2
				,x*y2 - y*x2
			]
		}

		,'=': function(v1, v2){
			v1[0] = v2[0];
			v1[1] = v2[1];
			v1[2] = v2[2];

			return v1;
		}
	}


	exports.vop = function o(v1, op, v2){
		return vops[op](v1, v2);
	}

}(typeof exports === 'undefined' ? window : exports)
