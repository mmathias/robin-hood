/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * The Retailer requesting data from User
 * @param {org.acme.pii.RequestAccess} authorize - the authorize to be processed
 * @transaction
 */
function requestAccess(authorize) {

  // store authorize.request in blockchain
  return getAssetRegistry('org.acme.pii.Request')
  	.then(function (assetRegistry) {
    	return assetRegistry.add(authorize.request);
	  })
  	.then(function () {
	    var event = getFactory().newEvent('org.acme.pii', 'AccessRequested');
        event.request = authorize.request;
        emit(event);
  	});
}

/**
 * A Member revokes access to their record from another Member.
 * @param {org.acme.pii.YesResponse} yesResonse - the RevokeAccess to be processed
 * @transaction
 */
function yesAccess(yesResponse) {

  // store authorize.request in blockchain
  return getAssetRegistry('org.acme.pii.Response')
  	.then(function (assetRegistry) {
    	return assetRegistry.add({
        	request: yesResponse.request,
          	response: 'yes'
        });
	  })
  	.then(function () {
	    //var event = getFactory().newEvent('org.acme.pii', 'AccessResponse');
        //event.request = yesResponse.request;
        //emit(event);
  	});
}