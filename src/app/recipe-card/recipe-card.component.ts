import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html'
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
}