import { Injectable, HttpStatus } from '@nestjs/common';
import { AppConfig } from '../../app.config';
import fetch from 'node-fetch';

@Injectable()
export class NewsDataAPIService {
	constructor() {}

	// fetchArticles(data: { customer: { name: String, emailAddress: String, phoneNumber: String }, sender: String, length: Number, channels: Array<String>, validity: Number, smsTemplate?: String }) {
    fetchArticles(data: { customer: { name: String, emailAddress: String, phoneNumber: String }, sender: String, length: Number, channels: Array<String>, validity: Number, smsTemplate?: String }) {
		return fetch("https://newsdata.io/api/1/latest", {
			method: 'POST',
			headers: {
				"X-ACCESS-KEY": "pub_4968662cb694c4bb9eea103dae0f3811499f0",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(res => {
			return res;
		}).catch((err) => {
			return {
				statusCode: HttpStatus.BAD_REQUEST,
				message: 'Invalid request. Please try again.'
			};
		});
	}

	// reSendOTP(otpId: String, data: { channels: Array<String> }) {
	// 	return fetch(AppConfig.PAYGATE_OTP_BASE_URL + "/" + otpId + "/resend", {
	// 		method: 'PUT',
	// 		headers: {
	// 			"Authorization": AppConfig.PAYGATE_OTP_TOKEN,
	// 			"Content-Type": "application/json"
	// 		},
	// 		body: JSON.stringify(data)
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// verifyOTP(otpId: String, data: { otp: String }) {
	// 	return fetch(AppConfig.PAYGATE_OTP_BASE_URL + "/" + otpId + "/verify", {
	// 		method: 'PUT',
	// 		headers: {
	// 			"Authorization": AppConfig.PAYGATE_OTP_TOKEN,
	// 			"Content-Type": "application/json"
	// 		},
	// 		body: JSON.stringify(data)
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// mifosBatchRequest(async: Boolean, requests: Array<{ requestId: Number, reference?: Number, method: String, relativeUrl: String, headers: { Authorization: String, "Fineract-Platform-TenantId": String, "Content-Type": String }, body: Object }>) {
	// 	return fetch(AppConfig.MIFOS_BATCH_BASE_URL + '?async=' + async, {
	// 		method: 'POST',
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			"Authorization": AppConfig.MIFOS_BATCH_AUTH_KEY
	// 		},
	// 		body: JSON.stringify(requests)
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'CBA batch request failed. Please try again.'
	// 		};
	// 	});
	// }

	// async publishNotification(data: { messages: Array<{ data: String, orderingKey?: String }> }) {
	// 	const client = new JWT({
	// 		email: AppConfig.PAYGATE_NOTIFICATIONS_GCP_EMAIL,
	// 		key: AppConfig.PAYGATE_NOTIFICATIONS_GCP_PRIVATE_KEY,
	// 		scopes: ['https://www.googleapis.com/auth/pubsub'],
	// 	});
	// 	const url = `https://us-east1-pubsub.googleapis.com/v1/projects/${ AppConfig.PAYGATE_NOTIFICATIONS_GCP_PROJECT_ID }/topics/${ AppConfig.PAYGATE_NOTIFICATIONS_GCP_TOPIC }:publish`;

	// 	return client.request({
	// 		url: url,
	// 		method: "POST",
	// 		body: JSON.stringify(data)
	// 	}).then((res: any) => {
	// 		if(res.data && res.data.messageIds && res.data.messageIds.length > 0) {
	// 			return {
	// 				statusCode: HttpStatus.OK,
	// 				message: 'Request Successful.'
	// 			};
	// 		}else {
	// 			return {
	// 				statusCode: HttpStatus.BAD_REQUEST,
	// 				message: 'Invalid request. Please try again.'
	// 			};
	// 		}
	// 	}).catch(err => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// async publishMifosTransaction(data: { messages: Array<{ data: String, orderingKey?: String }> }) {
	// 	const client = new JWT({
	// 		email: AppConfig.PAYGATE_NOTIFICATIONS_GCP_EMAIL,
	// 		key: AppConfig.PAYGATE_NOTIFICATIONS_GCP_PRIVATE_KEY,
	// 		scopes: ['https://www.googleapis.com/auth/pubsub'],
	// 	});
	// 	const url = `https://us-east1-pubsub.googleapis.com/v1/projects/${ AppConfig.PAYGATE_NOTIFICATIONS_GCP_PROJECT_ID }/topics/${ AppConfig.PAYGATE_MIFOS_TXN_GCP_TOPIC }:publish`;

	// 	return client.request({
	// 		url: url,
	// 		method: "POST",
	// 		body: JSON.stringify(data)
	// 	}).then((res: any) => {
	// 		if(res.data && res.data.messageIds && res.data.messageIds.length > 0) {
	// 			return {
	// 				statusCode: HttpStatus.OK,
	// 				message: 'Request Successful.'
	// 			};
	// 		}else {
	// 			return {
	// 				statusCode: HttpStatus.BAD_REQUEST,
	// 				message: 'Invalid request. Please try again.'
	// 			};
	// 		}
	// 	}).catch(err => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// async sendWebhookNotification(webhookUrl, data) {
	// 	return fetch(webhookUrl, {
	// 		method: 'POST',
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		},
	// 		body: JSON.stringify(data)
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Request failed. Please try again.'
	// 		};
	// 	});
	// }

	// getBeneficiaries(query) {
	// 	const url = new URL(`${AppConfig.PAYGATE_VAS_BASE_URL}/vas/beneficiaries`);
	// 	const params = query;
		
	// 	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

	// 	return fetch(url, {
	// 		method: 'GET',
	// 		headers: {
	// 			"Content-Type": "application/json",
    //             "X-Admin-Key": AppConfig.PAYGATE_VAS_TOKEN,
	// 		}
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// deleteBeneficiary(beneficiaryId, clientId) { 
	// 	const url = `${AppConfig.PAYGATE_VAS_BASE_URL}/vas/beneficiaries/${beneficiaryId}`;

	// 	return fetch(url, {
	// 		method: 'DELETE',
	// 		headers: {
	// 			"Content-Type": "application/json",
    //             "X-Admin-Key": AppConfig.PAYGATE_VAS_TOKEN,
	// 		},
	// 		body: JSON.stringify({"clientId" : clientId})
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// getServices(query) {
	// 	const url = new URL(`${AppConfig.PAYGATE_VAS_BASE_URL}/services`);
	// 	const params = query;
		
	// 	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

	// 	return fetch(url, {
	// 		method: 'GET',
	// 		headers: {
	// 			"Content-Type": "application/json",
    //             "X-Admin-Key": AppConfig.PAYGATE_VAS_TOKEN,
	// 		}
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// getService(serviceId) {
	// 	const url = `${AppConfig.PAYGATE_VAS_BASE_URL}/services/${serviceId}`;

	// 	return fetch(url, {
	// 		method: 'GET',
	// 		headers: {
	// 			"Content-Type": "application/json",
    //             "X-Admin-Key": AppConfig.PAYGATE_VAS_TOKEN,
	// 		}
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// getServiceCategoriesByService(serviceId,query){
	// 	const url = new URL(`${AppConfig.PAYGATE_VAS_BASE_URL}/service-category/${serviceId}/service`);
	// 	const params = query;
		
	// 	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))


	// 	return fetch(url, {
	// 		method: 'GET',
	// 		headers: {
	// 			"Content-Type": "application/json",
    //             "X-Admin-Key": AppConfig.PAYGATE_VAS_TOKEN,
	// 		}
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// getServiceCategoryProducts(serviceCategoryId){
	// 	const url = `${AppConfig.PAYGATE_VAS_BASE_URL}/service-category/${serviceCategoryId}/products`;

	// 	return fetch(url, {
	// 		method: 'GET',
	// 		headers: {
	// 			"Content-Type": "application/json",
    //             "X-Admin-Key": AppConfig.PAYGATE_VAS_TOKEN,
	// 		}
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// getClientVasTransactions(query){
	// 	const url = new URL(`${AppConfig.PAYGATE_VAS_BASE_URL}/vas`);
	// 	const params = query;
		
	// 	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

	// 	return fetch(url, {
	// 		method: 'GET',
	// 		headers: {
	// 			"Content-Type": "application/json",
    //             "X-Admin-Key": AppConfig.PAYGATE_VAS_TOKEN,
	// 		}
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// exportVasTransactions(query){
	// 	const url = new URL(`${AppConfig.PAYGATE_VAS_BASE_URL}/vas/statement/export`);
	// 	const params = query;
		
	// 	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

	// 	return fetch(url, {
	// 		method: 'GET',
	// 		headers: {
	// 			"Content-Type": "application/json",
    //             "X-Admin-Key": AppConfig.PAYGATE_VAS_TOKEN,
	// 		}
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// getTransactionByReference(reference,query){

	// 	const url = new URL(`${AppConfig.PAYGATE_VAS_BASE_URL}/vas/transaction/${reference}`);
	// 	const params = query;
		
	// 	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))


	// 	return fetch(url, {
	// 		method: 'GET',
	// 		headers: {
	// 			"Content-Type": "application/json",
    //             "X-Admin-Key": AppConfig.PAYGATE_VAS_TOKEN,
	// 		}
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// payAirtime(payload: PayAirtimeDto){
	// 	const url = `${AppConfig.PAYGATE_VAS_BASE_URL}/vas/pay/airtime`;
		
	// 	return fetch(url, {
	// 		method: 'POST',
	// 		headers: {
	// 			"Content-Type": "application/json",
    //             "X-Admin-Key": AppConfig.PAYGATE_VAS_TOKEN,
	// 		},
	// 		body: JSON.stringify(payload)
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// payDataBundle(payload: PayDataBundleDto){
	// 	const url = `${AppConfig.PAYGATE_VAS_BASE_URL}/vas/pay/data`;
		
	// 	return fetch(url, {
	// 		method: 'POST',
	// 		headers: {
	// 			"Content-Type": "application/json",
    //             "X-Admin-Key": AppConfig.PAYGATE_VAS_TOKEN,
	// 		},
	// 		body: JSON.stringify(payload)
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// payCableTv(payload: PayCableTvDto){
	// 	const url = `${AppConfig.PAYGATE_VAS_BASE_URL}/vas/pay/cable-tv`;
		
	// 	return fetch(url, {
	// 		method: 'POST',
	// 		headers: {
	// 			"Content-Type": "application/json",
    //             "X-Admin-Key": AppConfig.PAYGATE_VAS_TOKEN,
	// 		},
	// 		body: JSON.stringify(payload)
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// payUtility(payload: PayUtilityDto){
	// 	const url = `${AppConfig.PAYGATE_VAS_BASE_URL}/vas/pay/utility`;
		
	// 	return fetch(url, {
	// 		method: 'POST',
	// 		headers: {
	// 			"Content-Type": "application/json",
    //             "X-Admin-Key": AppConfig.PAYGATE_VAS_TOKEN,
	// 		},
	// 		body: JSON.stringify(payload)
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// verifyEntity(payload: VerifyDetailsDto){
	// 	const url = `${AppConfig.PAYGATE_VAS_BASE_URL}/vas/verify`;
		
	// 	return fetch(url, {
	// 		method: 'POST',
	// 		headers: {
	// 			"Content-Type": "application/json",
    //             "X-Admin-Key": AppConfig.PAYGATE_VAS_TOKEN,
	// 		},
	// 		body: JSON.stringify(payload)
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// virtualAccountCallback(url, payload) {
	// 	return fetch(url, {
	// 		method: 'POST',
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		},
	// 		body: JSON.stringify(payload)
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// fetchComplianceWithReference(reference){
	// 	const url = `${AppConfig.PAYGATE_COMPLIANCE_BASE_URL}/${reference}/entity`;
		
	// 	return fetch(url, {
	// 		method: 'GET',
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			"x-admin-key": AppConfig.PAYGATE_COMPLIANCE_KEY
	// 		}
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	// fetchComplianceAuthToken(emailAddress){
	// 	const url = `${AppConfig.PAYGATE_COMPLIANCE_BASE_URL}/auth/${emailAddress}/token`;
		
	// 	return fetch(url, {
	// 		method: 'GET',
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			"x-admin-key": AppConfig.PAYGATE_COMPLIANCE_KEY,
	// 		}
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }
}
