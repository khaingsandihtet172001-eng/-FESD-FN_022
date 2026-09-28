import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly storageKey = 'fesd-users';

  private seedUsers: User[] = [
    new User('darnaporn@gmail.com', 'yjdf1716', 'Sira', 'Weerakittana', '0891234567', '2012-05-26'),
    new User('boonpoo@gmail.com', 'mmjt9876', 'Rosanan', 'Suvannahbumwiongs', '0641825563', '2011-10-17'),
    new User('bodin_thai@gmail.com', 'mmmyb4577', 'Tankwan', 'Srisuk', '0986345661', '2007-04-29')
  ];

  getUsers(): User[] {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.seedUsers));
      return [...this.seedUsers];
    }
    try {
      const parsed = JSON.parse(raw) as User[];
      return parsed.map(u => new User(u.userEmail, u.userPassword, u.userFirstName, u.userLastName, u.userTel, u.dateOfBirth));
    } catch {
      return [...this.seedUsers];
    }
  }

  register(user: User): { status: number; message: string } {
    try {
      const users = this.getUsers();
      if (users.some(u => u.userEmail.toLowerCase() === user.userEmail.toLowerCase())) {
        return { status: 422, message: 'The email address is already registered.' };
      }
      if (!/^\d+$/.test(user.userTel)) {
        return { status: 400, message: 'Telephone number must contain numeric characters only.' };
      }
      users.push(user);
      localStorage.setItem(this.storageKey, JSON.stringify(users));
      return { status: 201, message: 'Registration successful.' };
    } catch {
      return { status: 500, message: 'Server or script error.' };
    }
  }
}
