import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mission } from '../models/mission';
import { SpaceXApiService } from '../network/spacexapi.service';

@Component({
  standalone: false,
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {
  missions: Mission[] = [];
  loading = true;
  error = '';

  constructor(private spaceXApi: SpaceXApiService, private router: Router) {}

  ngOnInit(): void {
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

  viewDetails(mission: Mission): void {
    this.router.navigate(['/missiondetails', mission.flight_number]);
  }
}
