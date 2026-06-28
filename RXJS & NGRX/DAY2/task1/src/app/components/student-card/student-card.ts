import { Component, Input } from '@angular/core';
import { Student } from '../../services/students';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-student-card',
  imports: [TitleCasePipe],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css',
})
export class StudentCard {
  @Input({ required: true }) student!: Student;
}
