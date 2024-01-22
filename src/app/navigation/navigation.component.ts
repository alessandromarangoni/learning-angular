import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TitleService } from '../services/title.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit{

  title: string = '';

  constructor(
    private readonly titleService: TitleService,
    private readonly ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.titleService.title
      .pipe(
        map(title => {
          this.title = title;
          this.ref.detectChanges();
        })
      )
      .subscribe();
  }
}
