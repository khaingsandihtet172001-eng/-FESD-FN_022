export class User {
  constructor(
    public userEmail: string,
    public userPassword: string,
    public userFirstName: string,
    public userLastName: string,
    public userTel: string,
    public dateOfBirth: string
  ) {}

  getAge(today: Date = new Date()): number {
    const dob = parseDateOnly(this.dateOfBirth);
    if (!dob || Number.isNaN(dob.getTime())) {
      throw new Error('Invalid date of birth.');
    }

    const current = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (dob > current) {
      throw new Error('Date of birth cannot be in the future.');
    }

    let age = current.getFullYear() - dob.getFullYear();
    const birthdayPassed =
      current.getMonth() > dob.getMonth() ||
      (current.getMonth() === dob.getMonth() && current.getDate() >= dob.getDate());

    if (!birthdayPassed) {
      age--;
    }
    return age;
  }
}

function parseDateOnly(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) return null;
  return date;
}
