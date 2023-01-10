import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  showSpinner = false;

  constructor(private loaderService: LoaderService, private changes: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loaderService.getIsLoading().subscribe((isLoading) => {
      this.showSpinner = isLoading === true;
      
      this.changes.detectChanges();
      console.log(this.showSpinner);
      
    })
  }
}
