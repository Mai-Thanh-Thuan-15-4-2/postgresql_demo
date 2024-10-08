export class CreateStudentDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly gender?: string;
  readonly partTimeJob?: boolean;
  readonly absenceDays?: number;
  readonly extracurricularActivities?: boolean;
  readonly weeklySelfStudyHours?: number;
  readonly careerAspiration?: string;
  readonly mathScore?: number;
  readonly historyScore?: number;
  readonly physicsScore?: number;
  readonly chemistryScore?: number;
  readonly biologyScore?: number;
  readonly englishScore?: number;
  readonly geographyScore?: number;
}

export class UpdateStudentDto {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email?: string;
  readonly gender?: string;
  readonly partTimeJob?: boolean;
  readonly absenceDays?: number;
  readonly extracurricularActivities?: boolean;
  readonly weeklySelfStudyHours?: number;
  readonly careerAspiration?: string;
  readonly mathScore?: number;
  readonly historyScore?: number;
  readonly physicsScore?: number;
  readonly chemistryScore?: number;
  readonly biologyScore?: number;
  readonly englishScore?: number;
  readonly geographyScore?: number;
}
