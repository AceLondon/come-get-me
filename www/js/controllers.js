angular.module('app.controllers', [])

.controller('locateCtrl', function($scope) {

})

.controller('comeGetMeCtrl', function($scope, ContactService, $ionicPopup, $cordovaSms) {
    $scope.isContacting = false;
    $scope.primary = null;
    $scope.secondary = null;

    function init(){
        $scope.primary = ContactService.getPrimaryContact();
        $scope.secondary = ContactService.getSecondaryContact();
    }

    $scope.formatTel = ContactService.formatTel;
    $scope.formatAddress = ContactService.formatAddress;

    $scope.showAlert = function(msg, title) {
        var alertPopup = $ionicPopup.alert({
            title: title || '',
            template: msg
        });

        alertPopup.then(function(res) {
             console.log('Thank you for not eating my delicious ice cream cone');
        });
    };

    $scope.stopIt = function(){
        $scope.isContacting = false;
    };
    $scope.startIt = function(){
        if($scope.primary == null){
            if($scope.secondary == null){
                var msg = "You have not setup a Contact yet.\n Please setup a Contact in the Setting Tab.";
                $scope.showAlert(msg, "Missing Contact");
                $scope.isContacting = false;
            }else{
                $scope.primary = $scope.secondary;
                $scope.secondary = null;
                $scope.isContacting = true;
                $scope.sendSMS($scope.primary.phoneNumbers[0].value);
                //$scope.dialNumber($scope.primary.phoneNumbers[0].value);
                //$scope.sendEmail($scope.primary.emails[0].value);
            }
        }else{
            $scope.isContacting = true;
            $scope.sendSMS($scope.primary.phoneNumbers[0].value);
            //$scope.dialNumber($scope.primary.phoneNumbers[0].value);
            // $scope.sendEmail($scope.primary.emails[0].value);
        }

    };
    $scope.dialNumber = function(number) {
        window.open('tel:' + number, '_system');
    }


    $scope.sendSMS = function(number) {
        // SMS stuff
        var smsOptions = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
              intent: '' // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
                //intent: 'INTENT' // send SMS inside a default SMS app
            }
        };
        var locationLink = "THIS IS A LINK PLACEHOLDER";
        var message = "I am in BIG trouble. The 'Come Get Me' app is going to try and call you.\n" +
                      "This is where I currently am: " + locationLink;

        $cordovaSms.send(number, message, smsOptions)
        .then(function() {
            alert('Success');
            // Success! SMS was sent

        }, function(error) {
            alert('Error');
            // An error occurred
        });
    };

    $scope.sendEmail= function(emailAddress) {
        if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                console.log("Response -> " + result);
            },
            "Feedback for your App", // Subject
            "",                      // Body
            [emailAddress],    // To
            null,                    // CC
            null,                    // BCC
            false,                   // isHTML
            null,                    // Attachments
            null);                   // Attachment Data
        }
    }

    $scope.$on('$ionicView.enter', function() {
        init();
    });

})

.controller('settingsCtrl', function($scope, ContactService) {
    $scope.primary = null;
    $scope.secondary = null;

    function init(){
        $scope.primary = ContactService.getPrimaryContact();
        $scope.secondary = ContactService.getSecondaryContact();
    }

    $scope.formatTel = ContactService.formatTel;
    $scope.formatAddress = ContactService.formatAddress;

    $scope.makeContact = function(contactType){
        navigator.contacts.pickContact(function(contact){
            console.log('The following contact has been selected:' + JSON.stringify(contact));
            if(contactType == 'primary'){
                ContactService.setPrimaryContact(contact);
                $scope.primary = ContactService.getPrimaryContact();
            }else{
                ContactService.setSecondaryContact(contact);
                $scope.secondary = ContactService.getSecondaryContact();
            }
            $scope.$apply();
        },function(err){
            console.log('Error: ' + err);
            // alert("An error occured trying to add a contact. Please try again");
            $scope.showAlert();
        });
    };

    $scope.deleteContact = function(contactType){
        if(contactType == 'primary'){
            ContactService.setPrimaryContact(null);
            $scope.primary = null;
        }else{
            ContactService.setSecondaryContact(null);
            $scope.secondary = null;
        }
    };

    init();


})

.controller('pageCtrl', function($scope) {

})
