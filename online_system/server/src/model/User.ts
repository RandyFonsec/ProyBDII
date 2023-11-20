export class User {
  constructor(
    readonly nickname: string,
    readonly password: string,
    readonly fullname: string,
    readonly phone: string,
    readonly email: string,
    readonly userType: number,
  ) {
    this.nickname = nickname
    this.password = password
    this.fullname = fullname
    this.phone = phone
    this.email = email
    this.userType = userType
  }
}
