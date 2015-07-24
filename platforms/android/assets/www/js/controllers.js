angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
  
 
   $scope.redirect = function() {
			
			//alert('test');
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
		 Parse.User.logOut();
 
		 $('#log_in').removeAttr("disabled");
		Parse.User.logOut();
		$scope.isProcessing = false;
		location.href="#/app/login";
		
	};	
	
	//for upload profile images
	
	
	
	$scope.getProfilePhoto = function() {
	
	
	
	
	
	
	
	
	
	
	//alert('ccc');
		
		 //var currentUser = Parse.User.current();
		 
		 
		
		Camera.getPicture().then(function(imageURI) {
		 
		 $scope.my_image = imageURI;
	
				
			
				var parseFile = new Parse.File("profilepicture.jpg", { base64: imageURI });
				var obj = parseFile.save().then(function() {
				  // The file has been saved to Parse.
				  
				 
							currentUser.set('profilePic',parseFile);
							if(currentUser.save()){ 
								
								alert('profile pic updated!');
							}else{
								
								alert('not saved');
							}
				  
				}, function(error) {
				  // The file either could not be read, or could not be saved to Parse.
				  alert('not saved' );
				});
				
				 

				
		 
		  
		}, function(err) {
			alert(err);
		}, {
		  quality: 20,
		  targetWidth: 100,
		 targetHeight: 100,
		  saveToPhotoAlbum: true,
   			 destinationType: Camera.DestinationType.DATA_URL,
	         sourceType: Camera.PictureSourceType.PHOTOLIBRARY
		});
		
		
		
			
			
		
		
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
			if($scope.profileData.password!=undefined && $scope.profileData.password != ''){
				currentUser.set('password',$scope.profileData.password);
			}
			if(currentUser.save()){
				
				alert('profile updated!');
				$scope.profileData.password = '';
			}else{
				
				alert('profile does not updated!');
			}
			
		}
		
	};	

		// Set Profile Data
		$scope.profileData.firstName = currentUser.get('firstName');
		$scope.profileData.lastName = currentUser.get('lastName');
		$scope.profileData.email = currentUser.get('email');
		$scope.profilePhoto =  currentUser.get('profilePic') ;
		
	
					
	
}])

//For Create Dream List
.controller('DreamCtrl', function($scope,$stateParams,$timeout) {
	
	
	
	// For Create Dream
	$scope.dream = {};
	
	$scope.createDream = function(){
		
		var currentUser = Parse.User.current();
		
		
		$scope.MessageBlank=false;
		
		var error = false;
		if($scope.dream.comment  ==undefined || $scope.dream.comment  ==''){
			$scope.MessageBlank=true;
			error = true;
		}
		
		if(error==false){
			var Dream = Parse.Object.extend("Dream");
			var dreamObj = new Dream();
			 
			dreamObj.set("dreamDesc", $scope.dream.comment);
			dreamObj.set("userID", currentUser);
			
			 
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
			
		}	
			
	};
	
	
	if($stateParams.dreamId!=undefined){
		
		$scope.currentUser = Parse.User.current();
		
	 var Dream = Parse.Object.extend("Dream");
				var query = new Parse.Query(Dream);
				query.get($stateParams.dreamId, {
				  success: function(dreamList) {
					// The object was retrieved successfully.
						
						$timeout( function(){  
							$scope.dream ={
								 dreamId : dreamList.id,	
								 dreamDesc : dreamList.get('dreamDesc')
							};
				 },500);	
					//alert(dreamList.get('dreamDesc'));
				  },
				  error: function(object, error) {
					// The object was not retrieved successfully.
					// error is a Parse.Error with an error code and message.
				  }
		});
		
	}
	
	//for update Dream
	$scope.updateDream = function(){
		
		//alert($stateParams.dreamId);
		
		var currentUser = Parse.User.current();
		
		var Dream = Parse.Object.extend("Dream");
		var dreamObj = new Dream();
		 
		dreamObj.set("dreamDesc", $scope.dream.dreamDesc);
		dreamObj.set("id", $stateParams.dreamId);
		
		 
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
	
	
})
//For My Dream List 
.controller('MyDreamlistsCtrl', function($scope,$timeout) {
			
			
			$scope.dreamdata = {};
		
	
		
		var currentUser = Parse.User.current();
		   $scope.currentUser = currentUser;
		   
		  var Dream = Parse.Object.extend("Dream");
			var query = new Parse.Query(Dream);
			query.equalTo("userID", currentUser);
			query.find({
			  success: function(results) {
				  
				 $timeout( function(){  
					$scope.dreamdata = results;
				 },500);	
				// Do something with the returned Parse.Object values
				
				
				
			  },
			  error: function(error) {
				console.log("Error: " + error.code + " " + error.message);
			  }
			});
			
			
		
	
})


//For My Dream Detail 
.controller('MyDreamDetailCtrl', function($scope, $stateParams, $timeout) {
	
	$scope.dream = {};
	
	 $scope.currentUser = Parse.User.current();
	 
	
		$scope.complete_dream = '';
		$scope.completed = '';
	
	 var Dream = Parse.Object.extend("Dream");
				var query = new Parse.Query(Dream);
				query.get($stateParams.dreamId, {
				  success: function(dreamList) {
					// The object was retrieved successfully.
						
						$timeout( function(){ 
							$scope.dream = dreamList;
						
							if($scope.dream.get('dreamStatus')=='yes'){
									$scope.completed = 'blockTag';
								}else if($scope.currentUser.id == $scope.dream.get('userID').id){
									$scope.complete_dream = 'blockTag';
									
								}
						},500);
				  },
				  error: function(object, error) {
					// The object was not retrieved successfully.
					// error is a Parse.Error with an error code and message.
				  }
		});
	
		//For Edit Dream
		$scope.editDream = function(){
			
			location.href="#/app/editdream/"+$stateParams.dreamId;
		}
		
		//For get Involve
		$scope.getInvolve = function(){
			
			
		var currentUser = Parse.User.current();
			//var Dream = Parse.Object.extend("Dream");
			//	Dream.id = $stateParams.dreamId;
			
			var userClass =  {
					__type: "Pointer",
					className: "_User",
					objectId: $('#dreamMakerID').val()
			};	
			
			var dreamClass =  {
					__type: "Pointer",
					className: "Dream",
					objectId: $stateParams.dreamId
			};
			var Involve_dream = Parse.Object.extend("Involve_dream");
			var inDreamObj = new Involve_dream();
			
			inDreamObj.set("dreamID", dreamClass);
			inDreamObj.set("userID", userClass);
			inDreamObj.set("involvedUserId", currentUser);
			


			inDreamObj.save(null, {
				success: function(inDreamObj) {
				// Execute any logic that should take place after the object is saved.
					location.href="#/app/messages/"+inDreamObj.id;

				},
				error: function(inDreamObj, error) {
				// Execute any logic that should take place if the save fails.
				// error is a Parse.Error with an error code and message.
					alert('please try again!');
					}
			});
			
		}
		
		// For Complete
		$scope.completeDream = function(){
			
			
			var Dream = Parse.Object.extend("Dream");
			var dreamObj = new Dream();

			dreamObj.set("dreamStatus", 'yes');
			dreamObj.set("id", $stateParams.dreamId);


			dreamObj.save(null, {
				success: function(dreamObj) {
				// Execute any logic that should take place after the object is saved.
					$timeout( function(){ 
						$scope.complete_dream = '';
						$scope.completed = 'blockTag';
						},500);

				},
				error: function(dreamObj, error) {
				// Execute any logic that should take place if the save fails.
				// error is a Parse.Error with an error code and message.
					alert('please try again!');
					}
			});
			
		}
	


})



//For Discover Dream List
.controller('DiscoverlistsCtrl', function($scope, $ionicModal, $timeout) {
	 
	 	
	 //$scope.dreamdata = {};
	$scope.currentUser = Parse.User.current();
	 
		  
		  var Dream = Parse.Object.extend("Dream");
			var query = new Parse.Query(Dream);
			query.include("userID");
			query.find({
			  success: function(results) {
					
					$timeout( function(){ 
						$scope.dreamdata = results;
					},500);	
			
				
				
			  },
			  error: function(error) {
				console.log("Error: " + error.code + " " + error.message);
			  }
			});
			
			
	  
		  
})
//For Discover Detail
.controller('DiscoverDetailCtrl', function($scope, $stateParams, $timeout) { 


		
		$scope.get_involve = '';
		$scope.complete_dream = '';
		$scope.completed = '';
	
	
		$scope.currentUser = Parse.User.current();
		
		 var Dream = Parse.Object.extend("Dream");
				var query = new Parse.Query(Dream);
				query.include("userID");
				query.get($stateParams.dreamId, {
				  success: function(dreamList) {
					// The object was retrieved successfully.
					
							$timeout( function(){  
								$scope.dream =dreamList;
								
								if($scope.dream.get('dreamStatus')=='yes'){
									$scope.completed = 'blockTag';
								}else if($scope.currentUser.id == $scope.dream.get('userID').id){
									$scope.complete_dream = 'blockTag';
									
								}else{
									
									$scope.get_involve = 'blockTag';
								}	
							},500);	
					
				
				  },
				  error: function(object, error) {
					// The object was not retrieved successfully.
					// error is a Parse.Error with an error code and message.
				  }
				});
				
		$scope.editDream = function(){
			
			location.href="#/app/editdream/"+$stateParams.dreamId;
		}		

})


//For Chat List 
.controller('ChatCtrl', function($scope,$timeout) {
	
					$scope.currentUser = Parse.User.current();
				$scope.chatlists = {};
				var userQuery = new Parse.Query('Dream');
				userQuery.equalTo("userID", Parse.User.current());
				
				var dreamerQuery = new Parse.Query("Involve_dream");
				dreamerQuery.matchesQuery("dreamID", userQuery);

				var dreamMakerQuery = new Parse.Query("Involve_dream");
				dreamMakerQuery.equalTo("involvedUserId", Parse.User.current());

				var query = Parse.Query.or(dreamerQuery, dreamMakerQuery);
				
				
				query.include("dreamID");
				query.include("involvedUserId");
				query.include("userID");
				query.find({
				  success: function(dreamList) {
					// The object was retrieved successfully.
						
						$timeout( function(){ 
							
							
							$scope.chatlists = dreamList;
						
							
						},500);
				  },
				  error: function(object, error) {
					// The object was not retrieved successfully.
					// error is a Parse.Error with an error code and message.
				  }
		});
	
	
  /*$scope.chatlists = [
    { message: 'Hi', user_name: 'Steve' },
    { message: 'Hi Steve', user_name: 'Ravi' },

  ];*/
})
//For Chat Detail
.controller('ChatDetailCtrl', function($scope, $stateParams,$timeout) {
	
	/*$scope.chatlists = [
			{ message: 'I want to help you with your dreams', className: 'you' , MainclassName:' col-75 text_align_lt',hide_avatar:'yes'},
			{ message: 'This is what i need', className: 'me', MainclassName:'text_align_rt',hide_avatar:'no' },

		  ];
		  */
			
			$scope.chatlists = [];
			
				//get Chat History
				var Involve_dream = Parse.Object.extend("Involve_dream");
				var query = new Parse.Query(Involve_dream);
					$scope.currentUser = Parse.User.current();
				$scope.touserId = $stateParams.sentUserId;
  
				query.include("dreamID");
				query.get($stateParams.chatId,{
				  success: function(dreamList) {
					// The object was retrieved successfully.
						
						$timeout( function(){ 
							$scope.dreamName = dreamList.get('dreamID').get('dreamDesc');
						
							
						},500);
				  },
				  error: function(object, error) {
					// The object was not retrieved successfully.
					// error is a Parse.Error with an error code and message.
				  }
			});
			
		
		
		var loadChat = function(){	
			
			var currentUser = Parse.User.current(); 
				$scope.currentUser = currentUser;
			
			var Chat = Parse.Object.extend("Chat");
			var query = new Parse.Query(Chat);
				
				
				
				var chatQuery = new Parse.Query("Chat");
					chatQuery.matchesQuery("fromID", Parse.User.current());
					
					var chattoQuery = new Parse.Query("Chat");
					chattoQuery.equalTo("toID", Parse.User.current());

				var query = Parse.Query.or(chatQuery, chattoQuery);
				
			query.include("fromID");	
			query.include("toID");	
		
			query.ascending('createdAt');
				
				query.find({
					  success: function(results) {
						// The object was retrieved successfully.
							
							//$timeout( function(){ 
									$scope.chatlists = results;
							//},100);
					  },
					  error: function(object, error) {
						// The object was not retrieved successfully.
						// error is a Parse.Error with an error code and message.
					  }
				});
				
			$timeout( loadChat,1000);	
					
		};
  
  loadChat();
	
  
  // For Press enter
  $scope.pushMessage = function ($event){
	  
	  $scope.sendMessage();
  };
  

   // For send button
  $scope.sendMessage = function (){
	  
	    //message  
		var msgChat = [{ 
				message: $scope.chat.message, 
				className: 'me' , 
				MainclassName:'text_align_rt',
				hide_avatar:'no'
		}];

		//involveid 
		var involveClass =  {
					__type: "Pointer",
					className: "Involve_dream",
					objectId: $stateParams.chatId
			};
		//toId	
		var userClass =  {
					__type: "Pointer",
					className: "_User",
					objectId: $stateParams.sentUserId
			};	
		
		
		
		//formId
		$scope.currentUser = Parse.User.current();
		
		var Chat = Parse.Object.extend("Chat");
			var chatObj = new Chat();
			 
			chatObj.set("message", $scope.chat.message);
			chatObj.set("involveID", involveClass);
			chatObj.set("fromID", $scope.currentUser);
			chatObj.set("toID", userClass);
			
			//$scope.chatlists.push(msgChat);
			$scope.chat.message =''; 
			chatObj.save(null, {
			  success: function(dreamObj) {
				// Execute any logic that should take place after the object is saved.

				loadChat();	
			  },
			  error: function(dreamObj, error) {
				// Execute any logic that should take place if the save fails.
				// error is a Parse.Error with an error code and message.
				alert('please try again!');
			  }
			});
		
		
		
		


		var height = 0;
		$('div.row').each(function(i, value){
			height += parseInt($(this).height());
		});

		height += '';

		$('.scroll').animate({scrollTop: height});
		
		return false;
		
	
  };
  
  
});


