import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  searchQuery = '';
  selectedMealType = '';

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getRecipes(this.itemsPerPage, (this.currentPage - 1) * this.itemsPerPage)
      .subscribe((data: any) => {
        this.recipes = data.recipes;
        this.totalItems = data.total;
      });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.currentPage = 1;
    this.searchRecipes();
  }

  onMealTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedMealType = select.value;
    this.currentPage = 1;
    this.searchRecipes();
  }

  searchRecipes(): void {
    this.recipeService.searchRecipes(this.searchQuery)
      .subscribe((data: any) => {
        this.recipes = data.recipes.filter((recipe: Recipe) =>
          this.selectedMealType ? recipe.mealType.includes(this.selectedMealType) : true
        );
        this.totalItems = this.recipes.length;
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    if (this.searchQuery) {
      this.searchRecipes();
    } else {
      this.loadRecipes();
    }
  }
}