angular.module('starter.services',[])
//Set API Key
.value('PARSE_CREDENTIALS',{
    APP_ID: 'rmh6s73DYeTgIfgUff5bhL4fkp2DyWlrBYEOONyc',
    REST_API_KEY:'QTMAql2rQkrMXsUymihyuIiutrJLDoIel3tAqKjJ'
})

.factory('Users',['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){
    return {
        getAll:function(){
            return $http.get('https://api.parse.com/1/classes/_User',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        get:function(id){
            return $http.get('https://api.parse.com/1/classes/_User/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        create:function(data){
            return $http.post('https://api.parse.com/1/classes/_User',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        edit:function(id,data){
            return $http.put('https://api.parse.com/1/classes/_User/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        delete:function(id){
            return $http.delete('https://api.parse.com/1/classes/_User/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
		logIn: function(username, password) {
			
			 return $http.get('https://api.parse.com/1/login',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                },
				params: { 
					username: username ,
					password: password
              }
            });	
			
   
        }
		
    }
}])
.factory('Dreams',function(){
    return {
	}
})

.factory('Camera', ['$q', function($q) {
 
  return {
    getPicture: function(options) {
      var q = $q.defer();
      
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    }
  }
}]);