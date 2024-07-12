import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'https://dummyjson.com/recipes';

  constructor(private http: HttpClient) { }

  getRecipes(limit: number = 10, skip: number = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}&skip=${skip}`);
  }

  searchRecipes(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?q=${query}`);
  }
}