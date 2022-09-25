import { ITopTenWords } from './iTopTenWords';
import { UtTestService } from './ut-test.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ut-new-angular-test';
  private subscription: Subscription = new Subscription();
  utForm: FormGroup;
  public top10Words: ITopTenWords[] = [];

  constructor(
    private utService: UtTestService,
    private formBuilder: FormBuilder
  ) {}

  buildForm() {
    this.utForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required]],
    });
  }

  getWordCount(description: string): ITopTenWords[] {
    let mostUsedWords: ITopTenWords[] = [];
    if (description !== null) {
      let wordsInDescription = description.split(/\s/);
      wordsInDescription.forEach((word) => {
        let lowerWord = word.toLowerCase();
        let index = mostUsedWords.findIndex(
          (a) => a.word.toLowerCase() === lowerWord
        );
        if (index > -1) {
          mostUsedWords[index].count = mostUsedWords[index].count + 1;
        } else {
          mostUsedWords.push({
            word: word,
            count: 1,
          });
        }
      });
    }

    return mostUsedWords;
  }

  ngOnInit(): void {
    this.buildForm();
    this.utService.getRestaurants();
    let resSubscription = this.utService.restaurants.subscribe((res) => {
      this.utForm.controls['description'].setValue(res.description);
      let wordCount = this.getWordCount(res.description);
      this.top10Words = wordCount.sort((a, b) => (a.count > b.count ? -1 : 1)).slice(0, 10) ;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
