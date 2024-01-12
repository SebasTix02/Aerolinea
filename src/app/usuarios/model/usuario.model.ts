export class User {
    dni: string;
    name: string;
    lastName: string;
    birthdayDate: Date;
    gender: string;
    civilStatus: string;
    disability: string;
    userName: string;
    email: string;
    password: string;
  
    constructor(
      dni: string,
      name: string,
      lastName: string,
      birthdayDate: Date,
      gender: string,
      civilStatus: string,
      disability: string,
      userName: string,
      email: string,
      password: string
    ) {
      this.dni = dni;
      this.name = name;
      this.lastName = lastName;
      this.birthdayDate = birthdayDate;
      this.gender = gender;
      this.civilStatus = civilStatus;
      this.disability = disability;
      this.userName = userName;
      this.email = email;
      this.password = password;
    }
  }
  