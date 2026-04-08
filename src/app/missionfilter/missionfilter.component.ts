import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mission } from '../models/mission';
import { SpaceXApiService } from '../network/spacexapi.service';

@Component({
  standalone: false,
  selector: 'app-missionfilter',
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css']
})
export class MissionfilterComponent implements OnInit {
  missions: Mission[] = [];
  loading = false;
  error = '';
  selectedYear = '';
  launchYears: string[] = [];

  constructor(private spaceXApi: SpaceXApiService, private router: Router) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let y = 2006; y <= currentYear; y++) {
      this.launchYears.push(y.toString());
    }
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.spaceXApi.getAllLaunches().subscribe({
      next: (data) => {
        this.missions = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load missions.';
        this.loading = false;
      }
    });
  }

  filterByYear(year: string): void {
    this.selectedYear = year;
    this.loading = true;
    this.spaceXApi.getLaunchesByYear(year).subscribe({
      next: (data) => {
        this.missions = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to filter missions.';
        this.loading = false;
      }
    });
  }

  clearFilter(): void {
    this.selectedYear = '';
    this.loadAll();
  }

  viewDetails(mission: Mission): void {
    this.router.navigate(['/missiondetails', mission.flight_number]);
  }
}
