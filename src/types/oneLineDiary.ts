export interface OneLineDiary {
  diaryId: number,
  contents: string,
  createdAt: string,
  lastModifiedAt: string,
  petId: number,
  userId: number,
  userName: string,
  delete: boolean,
}