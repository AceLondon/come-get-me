angular.module('app.services', [])

.factory('ContactService', function(){

    var factory = {};

    // Vars
        factory.primaryContact = {  "id":-1,
                                    "rawId":null,
                                    "displayName":null,
                                    "name":{    "givenName":"Jonah",
                                                "formatted":"Jonah Mancini",
                                                "middleName":null,
                                                "familyName":"Mancini",
                                                "honorificPrefix":null,
                                                "honorificSuffix":null
                                            },
                                    "nickname":null,
                                    "phoneNumbers":[{   "type":"other",
                                                        "value":"(505) 918-3725",
                                                        "id":0,"pref":false
                                                    }],
                                    "emails":[{  "type":"home",
                                                 "value":"jonahmancini@gmail.com",
                                                 "id":0,"pref":false
                                             }],
                                    "addresses":[{  "postalCode":"78728",
                                                    "type":"home",
                                                    "id":0,
                                                    "locality":"Austin",
                                                    "pref":"false",
                                                    "streetAddress":"2113 Klattenhoff Dr.",
                                                    "region":"TX",
                                                    "country":"United States"
                                                }],
                                    "ims":null,
                                    "organizations":null,
                                    "birthday":null,
                                    "note":null,
                                    "photos":null,
                                    "categories":null,
                                    "urls":null
                                };
        factory.secondaryContact = null;


    // Functions
    factory.setPrimaryContact = function(contact){
        factory.primaryContact = contact;
    };

    factory.setSecondaryContact = function(contact){
        factory.secondaryContact = contact;
    };

    factory.getPrimaryContact = function(){
        return factory.primaryContact;
    };

    factory.getSecondaryContact = function(){
        return factory.secondaryContact;
    };

    // Util Functions
    factory.formatTel = function(tel){
        if (!tel) {
            return '';
        }
        var value = tel.toString().trim().replace(/^\+/, '');
        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        number = number.slice(0, 3) + '-' + number.slice(3);
        return ("+" + country + " (" + city + ") " + number).trim();
    };

    factory.formatAddress = function(contactType){
        var contact;
        if(contactType == 'primary'){
            contact = factory.primaryContact;
        }else{
            contact = factory.secondaryContact;
        }

        if(!contact){
            return "";
        }else{
            var cnt = 0;
            console.log("contact.addresses: " + JSON.stringify(contact.addresses));
            var address = contact.addresses[cnt].type + ": " +
                          contact.addresses[cnt].streetAddress + "\n" +
                          contact.addresses[cnt].locality + ", " +
                          contact.addresses[cnt].region;
            return address;
        }
    };

    return factory;

})

.service('BlankService', [function(){

}]);
