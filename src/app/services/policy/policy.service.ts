import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Policy, PolicyResponse, SinglePolicyResponse} from "../../models/Policy";

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private http: HttpClient) { }

  fetchPolicies(): Observable<PolicyResponse> {
    return this.http.get<PolicyResponse>(`${environment.baseUrl}/policy`, {headers: {
      'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
        'Authorization': `Bearer ${JSON.parse(<string>localStorage.getItem('token'))}`,
      }});
  }

  deletePolicy(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/policy/${id}`, {headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
        'Authorization': `Bearer ${JSON.parse(<string>localStorage.getItem('token'))}`,
      }});
  }

  updatePolicy(policy: Policy): Observable<SinglePolicyResponse> {
    return this.http.put<SinglePolicyResponse>(`${environment.baseUrl}/policy/${policy.id}`, policy, {headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
        'Authorization': `Bearer ${JSON.parse(<string>localStorage.getItem('token'))}`,
      }});
  }

  createPolicy(policy: Policy): Observable<SinglePolicyResponse> {
    return this.http.post<SinglePolicyResponse>(`${environment.baseUrl}/policy`, policy, {headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
        'Authorization': `Bearer ${JSON.parse(<string>localStorage.getItem('token'))}`,
      }});
  }


  checkExpiringPolicies(): Observable<PolicyResponse> {
    return this.http.post<PolicyResponse>(`${environment.baseUrl}/policy/expire`, {}, {headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
        'Authorization': `Bearer ${JSON.parse(<string>localStorage.getItem('token'))}`,
      }});
  }

}
