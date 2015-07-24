angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
  
 
   $scope.redirect = function() {
			
			alert('aa');
   };
   
  
   
   
})
.controller('UsersCtrl', ['$scope',function($scope){
	
	
	
  //For Email Vaidation
  $scope.checkEmail = function (emailAddress) {
		  var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
		  var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
		  var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
		  var sQuotedPair = '\\x5c[\\x00-\\x7f]';
		  var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
		  var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
		  var sDomain_ref = sAtom;
		  var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
		  var sWord = '(' + sAtom + '|' + sQuotedString + ')';
		  var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
		  var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
		  var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
		  var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

		  var reValidEmail = new RegExp(sValidEmail);

		  return reValidEmail.test(emailAddress);
	};
  
  // Signup Users
  $scope.create = function() {
	  
		$scope.firstNameBlank=false;
		$scope.lastNameBlank=false;
		$scope.emailBlank=false;
		$scope.emailinValid=false;
		$scope.passwordBlank=false;
		$scope.rePasswordBlank=false;
		$scope.rePasswordinValid=false;
		$scope.emailAlready=false;
		
		
	var firstName = document.getElementById('firstName');
	var lastName = document.getElementById('lastName');
	var emailId = document.getElementById('emailId');
	var pwd = document.getElementById('pwd');
	var rePwd = document.getElementById('rePwd');
	
		var error = false;
		if(firstName.value ==''){
			$scope.firstNameBlank=true;
			error = true;
		}else if(lastName.value ==''){
			$scope.lastNameBlank=true;
			error = true;
		}else if(emailId.value ==''){
			$scope.emailBlank=true;
			error = true;
		}else if($scope.checkEmail(emailId.value) ==false){
			$scope.emailinValid=true;
			error = true;
		}else if(pwd.value ==''){
			$scope.passwordBlank=true;
			error = true;
		}else if(rePwd.value ==''){
			$scope.rePasswordBlank=true;
			error = true;
		}else if(pwd.value != rePwd.value){
			$scope.rePasswordinValid=true;
			error = true;
		}
		
		if(error==false){
			
		
		
			var user = new Parse.User();
				user.set("username", emailId.value);
				user.set("firstName", firstName.value);
				user.set("lastName", lastName.value);
				user.set("password", pwd.value); 
				user.set("email", emailId.value);
				 
				user.signUp(null, {
				  success: function(user) {
				
					localStorage.setItem('sessionToken',user.getSessionToken());
					localStorage.setItem('userName',user.getUsername());
					location.href="#/app/account";
					
				  },
				  error: function(user, error) {
					// Show the error message somewhere and let the user try again.
					//alert("Error: " + error.code + " " + error.message);
					if(error.message!=''){
							$scope.emailAlready=true;
					}	
				  }
				});
			
			
			
			
		}
		
		
  };
   
   
 
  
	  
		
   
   
}])

// Account Page
.controller('LoginCtrl', ['$scope',function($scope){

	
	//For Email Vaidation
  $scope.checkEmail = function (emailAddress) {
		  var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
		  var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
		  var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
		  var sQuotedPair = '\\x5c[\\x00-\\x7f]';
		  var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
		  var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
		  var sDomain_ref = sAtom;
		  var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
		  var sWord = '(' + sAtom + '|' + sQuotedString + ')';
		  var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
		  var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
		  var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
		  var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

		  var reValidEmail = new RegExp(sValidEmail);

		  return reValidEmail.test(emailAddress);
	};	
		
	$scope.loginData = {};
	
	$scope.logIN = function() {
		
		var error = false;
		
		$scope.emailBlank=false;
		$scope.emailinValid=false;
		$scope.passwordBlank=false;
	
		if($('#username').val() == ''){
			$scope.emailBlank=true;
			error = true;
			
		}else if($scope.checkEmail($('#username').val()) ==false){
			$scope.emailinValid=true;
			error = true;
		}else if($('#password').val() == ''){
			
			$scope.passwordBlank=true;
			error = true;
		}
		
		if(error==false){
			
			 $('#log_in').attr("disabled",true);
			
			Parse.User.logIn($('#username').val(), $('#password').val(), {
			  success: function(user) {
				  
					$('#username').val('');
					$('#password').val('');
					localStorage.setItem('sessionToken',user.getSessionToken());
					localStorage.setItem('userName',user.getUsername());
					location.href="#/app/account";
			  },
			  error: function(user, error) {
				alert('Invalid Email ID/Password');	
					 $('#log_in').removeAttr("disabled");
			  }
			});
			
		
		}
			
			
	};	
	
}])
 // Account Page
.controller('AccountCtrl', ['$scope','Camera','$ionicSideMenuDelegate',function($scope,Camera,$ionicSideMenuDelegate){

	//For Open Slide Menu
	$scope.toggleLeftSideMenu = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.profileData = {};
	
	//For Logout
	 $scope.logoutApp = function (){
		 
		 $('#log_in').removeAttr("disabled");
		Parse.User.logOut();
		localStorage.clear();
		$scope.isProcessing = false;
		location.href="#/app/login";
		
	};	
	
	//for upload profile images
	
	$scope.getPhoto = function() {
		/*Camera.getPicture().then(function(imageURI) {
		  console.log(imageURI);
		  $scope.lastPhoto = imageURI;
		  //var file = new Parse.File("profilepicture.jpg", { base64: imageURI });
		  
		}, function(err) {
		 alert(err);
		}, {
		  quality: 100,
		  targetWidth: 250,
		 
		  saveToPhotoAlbum: true
		});*/
		
		
			var img = new Image();
			img.src = 'img/ionic.png';
			img.onload = function () {


				var canvas = document.createElement("canvas");
				canvas.width =this.width;
				canvas.height =this.height;

				var ctx = canvas.getContext("2d");
				ctx.drawImage(this, 0, 0);
				var currentUser = Parse.User.current();

				var dataURL = canvas.toDataURL("image/png");
					
				//dataURL =   dataURL.replace(/^data:image\/(png|jpg);base64,/, "data:");
				$scope.lastPhoto =dataURL;
				var parseFile = new Parse.File("profilepicture.jpg", { base64: dataURL });
				var obj = parseFile.save().then(function() {
				  // The file has been saved to Parse.
				  
				 
							currentUser.set('profilePic',parseFile);
							if(currentUser.save()){ 
								
								alert('ss');
							}else{
								
								alert('dd');
							}
				  
				}, function(error) {
				  // The file either could not be read, or could not be saved to Parse.
				  alert(error);
				});
				
				 

			}
			
		
		
	  };
	  
	  
	  

	
	//For Email Vaidation
  $scope.checkEmail = function (emailAddress) {
		  var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
		  var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
		  var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
		  var sQuotedPair = '\\x5c[\\x00-\\x7f]';
		  var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
		  var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
		  var sDomain_ref = sAtom;
		  var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
		  var sWord = '(' + sAtom + '|' + sQuotedString + ')';
		  var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
		  var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
		  var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
		  var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

		  var reValidEmail = new RegExp(sValidEmail);

		  return reValidEmail.test(emailAddress);
	};	
		
	$scope.loginData = {};
				
	var currentUser = Parse.User.current();
		
	// for Update profile	
	$scope.saveUserData = function(){
		
		$scope.firstNameBlank=false;
		$scope.lastNameBlank=false;
		$scope.emailBlank=false;
		$scope.emailinValid=false;
		var error = false;
		if($scope.profileData.firstName  ==undefined || $scope.profileData.firstName  ==''){
			$scope.firstNameBlank=true;
			error = true;
		}else if($scope.profileData.lastName ==undefined || $scope.profileData.lastName  ==''){
			$scope.lastNameBlank=true;
			error = true;
		}else if($scope.profileData.email ==undefined || $scope.profileData.email  ==''){
			$scope.emailBlank=true;
			error = true;
		}else if($scope.checkEmail($scope.profileData.email) ==false){
			$scope.emailinValid=true;
			error = true;
		}
		
		if(error==false){
			currentUser.set('firstName',$scope.profileData.firstName);	
			currentUser.set('lastName',$scope.profileData.lastName);
			if(currentUser.save()){
				
				alert('profile updated!');
			}else{
				
				alert('profile does not updated!');
			}
			
		}
		
	};	

		// Set Profile Data
		$scope.profileData.firstName = currentUser.get('firstName');
		$scope.profileData.lastName = currentUser.get('lastName');
		$scope.profileData.email = currentUser.get('email');
		
	
					
	
}])

//For Create Dream List
.controller('DreamCtrl', function($scope) {
	
	// For Create Dream
	$scope.createDream = function(){
		
		var currentUser = Parse.User.current();
		
		var Dream = Parse.Object.extend("Dream");
		var dreamObj = new Dream();
		 
		dreamObj.set("dreamDesc", $scope.dream.comment);
		dreamObj.set("userID", currentUser.get('username'));
		
		 
		dreamObj.save(null, {
		  success: function(dreamObj) {
			// Execute any logic that should take place after the object is saved.
			location.href="#/app/edit_dream/"+dreamObj.id;
		  },
		  error: function(dreamObj, error) {
			// Execute any logic that should take place if the save fails.
			// error is a Parse.Error with an error code and message.
			alert('please try again!');
		  }
		});
			
	};
	
	/*var GameScore = Parse.Object.extend("GameScore");
	var query = new Parse.Query(GameScore);
	query.get("xWMyZ4YEGZ", {
	  success: function(gameScore) {
		// The object was retrieved successfully.
	  },
	  error: function(object, error) {
		// The object was not retrieved successfully.
		// error is a Parse.Error with an error code and message.
	  }
	});*/
	//alert($param.dreamId);
	//	$scope.dream_content = Dreams.get($param.dreamId);
	
	
})
//For My Dream Detail 
.controller('DreamDetailCtrl', function($scope, $stateParams, Dreams) {
	
	$scope.dream = {};
	
	
	 var Dream = Parse.Object.extend("Dream");
				var query = new Parse.Query(Dream);
				query.get($stateParams.dreamId, {
				  success: function(dreamList) {
					// The object was retrieved successfully.
					var currentUser = Parse.User.current();
					$scope.dream.firstName = currentUser.get('firstName');
					$scope.dream.id = dreamList.get('objectId');
					$scope.dream.dreamDesc = dreamList.get('dreamDesc');
					
				  },
				  error: function(object, error) {
					// The object was not retrieved successfully.
					// error is a Parse.Error with an error code and message.
				  }
				});
	
	


})
//For Discover List
.controller('DiscoverlistsCtrl', function($scope, $ionicModal, $timeout) {
	 
	 $scope.dreamdata = {};
		  
		  var Dream = Parse.Object.extend("Dream");
			var query = new Parse.Query(Dream);
			query.find({
			  success: function(results) {
				
				// Do something with the returned Parse.Object values
				for (var i = 0; i < results.length; i++) { 
				  
				  $scope.dreamdata[i] = results[i];
				  
				  
				}
			  },
			  error: function(error) {
				console.log("Error: " + error.code + " " + error.message);
			  }
			});
		  
		  
})
//For Discover Detail
.controller('DiscoverlistCtrl', function($scope, $ionicModal, $timeout) { 

alert($ionicModal.discoverlistId);
})

//For My Dream List 
.controller('DreamlistsCtrl', function($scope) {
  $scope.dreamlists = [
    { title: 'Hi', id: 1 },
    { title: 'Hello Ravi', id: 2 },

  ];
})


//For Chat List 
.controller('ChatCtrl', function($scope) {
  $scope.chatlists = [
    { message: 'Hi', user_name: 'Steve' },
    { message: 'Hi Steve', user_name: 'Ravi' },

  ];
})
//For Chat Detail
.controller('ChatDetailCtrl', function($scope, $stateParams) {
	
	$scope.chatlists = [
    { message: 'I want to help you with your dreams', className: 'you' , MainclassName:' col-75 text_align_lt',hide_avatar:'yes'},
    { message: 'This is what i need', className: 'me', MainclassName:' text_align_rt',hide_avatar:'no' },

  ];
});


