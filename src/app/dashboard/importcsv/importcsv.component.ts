import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as Papa from 'papaparse'; 

@Component({
  selector: 'app-importcsv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './importcsv.component.html',
  styleUrls: ['./importcsv.component.css']
})
export class ImportcsvComponent {
  data: { [key: string]: any }[] = []; 

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const csvData = reader.result as string;
        Papa.parse(csvData, {
          header: true, 
          complete: (result: { data: { [key: string]: any }[] }) => { 
            this.data = result.data;
            console.log('Parsed CSV data:', this.data);
            alert('CSV file imported successfully.');
          },
          error: (error: any) => { 
            console.error('Error parsing CSV file:', error);
            alert('Error parsing CSV file. Please try again.');
          }
        });
      };
      reader.readAsText(file);
    }
  }
}
